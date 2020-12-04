const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
var iconv = require('iconv-lite');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

exports.todolist = async (req, res) => {
    var id = req.query.id;
    var sql = "SELECT Parsing_file_name, File_index  FROM `parsing_data_files` f "+
              "WHERE (e_id = ?) AND (User_score is NULL);";
    const result = await sequelize.query(sql, {
      replacements : [id],
      type: QueryTypes.SELECT
    });
    console.log(result);
    res.json(result);
};

exports.download = async (req, res) => {
    var file_index = req.query.file_index;
    var sql = "SELECT Parsing_file_name, Data_file FROM `parsing_data_files` f WHERE f.File_index = ?;";
    const result = await sequelize.query(sql, {
      replacements : [file_index],
      type: QueryTypes.SELECT
    });
    console.log(result);
    var file_name = result[0].Parsing_file_name;
    var Data_file = result[0].Data_file;
    let file = "./src/downloads/" + file_name;
    //let file = "./src/downloads" + 'hello.csv';
    fs.writeFileSync(file, Data_file);

    try {
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
          var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
        
          var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
          console.log(mimetype);
          res.setHeader('Content-disposition', 'attachment; filename=' + encodeURI(filename)); // 다운받아질 파일명 설정
          res.setHeader('Content-type', mimetype); // 파일 형식 지정
            
          var filestream = fs.createReadStream(file);
          filestream.pipe(res);
        } else {
          res.send('해당 파일이 없습니다.');  
          return;
        }
    } catch (e) { // 에러 발생시
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
};

exports.pass = async (req, res) => {
    
    var post = req.body;
    var file_index = post.file_index;
    var pass = post.pass;
    var user_score = post.user_score;
    if (!((pass == 1) || (pass ==0))) {
        return res.status(400).send("You need pass information!");
    }
    console.log("pass:"+pass );
    var sql;
    if(pass == 1){
        console.log("PASS!!!\n");
        sql = "SELECT t.Task_data_table_name, t.Task_data_table_schema, p.Data_file "+
              "FROM (`parsing_data_files` p JOIN `original_data_files` o ON p.Type_id = o.Type_id) "+
              "JOIN `tasks` t ON t.task_name = o.task_name " +
              "WHERE p.File_index = ?;";
        var result1 = await sequelize.query(sql, {
            replacements : [file_index],
            type: QueryTypes.SELECT
        });
        console.log(result1);
        var task_data_table_name = result1[0].Task_data_table_name;
        var task_data_table_schema = result1[0].Task_data_table_schema;
        var data_file = result1[0].Data_file.toString().split(/\r?\n/);
        var data_array = new Array();
        for(var i=0; i<data_file.length;i++){
            data_array[i] = data_file[i].split(',');
        }
        sql = "INSERT INTO " + task_data_table_name +
                  "("+ task_data_table_schema+ ") " +
                  "VALUES ?;";
        console.log(sql);
        await sequelize.query(sql, {
            replacements : [data_array],
            type: QueryTypes.INSERT
        });

        //file 평가 자료 업데이트
        sql = "UPDATE parsing_data_files p " +
                  "SET p.Pass = 1, p.User_score = ? "+
                  "WHERE p.File_index = ?;";
        console.log(sql);
        await sequelize.query(sql, {
            replacements : [user_score, file_index],
            type: QueryTypes.UPDATE
        });

    } else{
        //non-pass
        console.log("non-PASS!!");
        sql = "UPDATE parsing_data_files p " +
              "SET p.Pass = 0, p.User_score = ? "+
              "WHERE p.File_index = ?;";
        console.log(sql);
        await sequelize.query(sql, {
            replacements : [user_score, file_index],
            type: QueryTypes.UPDATE
        });

    }
    //Pass 상관없이 제출자 점수 업데이트
    
    sql = "SELECT m.Id, m.Score, COUNT(*) AS count "+
          "FROM hand_ins h JOIN members m ON h.H_id = m.Id JOIN parsing_data_files p ON h.File_index = p.File_index " +
          "WHERE (m.Id = (SELECT h.H_id FROM hand_ins WHERE h.File_index = ? LIMIT 1)) "+ 
          "AND (p.Pass IS NOT NULL);";
    console.log(sql);
    var result2 = await sequelize.query(sql, {
        replacements : [file_index],
        type: QueryTypes.SELECT
    });
    console.log(result2);
    var submit_id =result2[0].Id;
    var prev_score =result2[0].Score;
    var submit_count = result2[0].count;

    var next_score;
    //제출자 점수 업데이트
    if(submit_count == 1){
        next_score = user_score;
    } else{
        next_score = ((prev_score * (submit_count - 1)) + user_score ) / submit_count;
    }
    console.log(next_score);

    sql = "UPDATE members m " +
          "SET m.Score = ? "+
          "WHERE m.Id = ?;";
    console.log(sql);
    await sequelize.query(sql, {
        replacements : [next_score, submit_id],
        type: QueryTypes.UPDATE
    });
    return res.status(200).send("성공적인 업데이트");
};   

exports.ratestate = async (req, res) => {
    var id = req.query.id;
    var sql = "SELECT Parsing_file_name, Pass, User_score FROM `parsing_data_files` "+  
              "WHERE (E_id = ?) AND (Pass is not NULL);";
    const result = await sequelize.query(sql, {
      replacements : [id],
      type: QueryTypes.SELECT
    });
    console.log(result);
    res.json(result);
};