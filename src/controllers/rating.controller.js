const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
var iconv = require('iconv-lite');

exports.todolist = async (req, res) => {
    var id = req.query.id;
    var sql = "SELECT Parsing_file_name, File_index  FROM `parsing_data_files` f " 
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
    var sql = "SELECT Parsing_file_name, Data_file FROM `parsing_data_files` " 
              "WHERE File_index = ?;";
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
    
    /*
    var post = req.body;
    var file_index = post.file_index;
    var pass = post.pass;
    var User_score = post.user_score;
    if (!((pass == 1) || (pass ==0))) {
        return res.status(400).send("You need pass information!");
    }
    */
    var file_index = req.query.file_index;
    var pass = req.query.pass;
    var User_score = req.query.user_score;
   
    var sql;
    if(pass = 1){
        var sql = "SELECT t.`Task_data_table_name`,t.`Task_data_table_schema`, p.`Parsing_file_name`, p.`Data_file` "+
              "FROM ((`parsing_data_files` p "+
              "JOIN `original_data_files` o ON p.Type_id = o.Type_id) "+
              "JOIN `tasks` t ON t.task_name = o.task_name) " +
              "WHERE p.File_index = ?;";
        var result1 = await sequelize.query(sql, {
            replacements : [file_index],
            type: QueryTypes.SELECT
        });
        console.log(result1);
        var task_data_table_name = result1[0].Task_data_table_name;
        var task_data_table_schema = result1[0].Task_data_table_schema;
        var file_name = result1[0].Parsing_file_name;
        var data_file = '(' + result1[0].Data_file.toString().split(/\r?\n/).join('),(') + ')';
        console.log(data_file);
        res.josn(data_file);
    } else{
        res.json();
    }
};
