const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
var iconv = require('iconv-lite');
var csv = require('fast-csv');

exports.todolist = async (req, res) => {
    try{
        var id = req.query.id;
        var sql = "SELECT Parsing_file_name, File_index  FROM `PARSING_DATA_FILEs` f "+
                "WHERE (e_id = ?) AND (User_score is NULL);";
        const result = await sequelize.query(sql, {
        replacements : [id],
        type: QueryTypes.SELECT
        });
        console.log(result);
        res.json(result);
    }catch(err){
        res.status(400).send("에러가 있습니다.");
    }
};

exports.download = async (req, res) => {
    try{
        var file_index = req.query.file_index;
        var sql = "SELECT `Parsing_file_name`, `Data_file` FROM `PARSING_DATA_FILEs` WHERE File_index = ?;";
        const result = await sequelize.query(sql, {
            replacements : [file_index],
            type: QueryTypes.SELECT
        });
        var file_name = result[0].Parsing_file_name;
        var data_file = result[0].Data_file;
        let file = data_file;
        //let file = "./src/downloads" + 'hello.csv';

        try {
            if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            
            var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
            console.log(mimetype);
            res.setHeader('Content-disposition', 'attachment; filename=' + encodeURI(file_name)); // 다운받아질 파일명 설정
            res.setHeader('Content-type', mimetype); // 파일 형식 지정
                
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
            } else {
            res.send('해당 파일이 없습니다.');  
            
            }
        } catch (e) { // 에러 발생시
            console.log(e);
            res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
            
        }
    }catch(err){
        console.log(err);
        res.status(400).send("에러가 발생했습니다.");
    }
};

exports.pass = async (req, res) => {
    try{
        var post = req.body;
        var file_index = post.file_index;
        var pass = post.pass;
        var user_score = post.user_score;
        if (!((pass == 1) || (pass ==0))) {
            return res.status(400).send("You need pass information!");
        }
        console.log("pass:" + pass );
        var sql;
        if(pass == 1){
            console.log("PASS!!!\n");
            sql0 = "SELECT Name FROM MEMBERs, HAND_INs WHERE Id=H_id AND File_index=?;"
            var result0 = await sequelize.query(sql0, {
                replacements : [file_index],
                type: QueryTypes.SELECT,
                logging: false,
            });
            var submit_name = result0[0].Name;

            sql1 = "SELECT t.Task_data_table_schema, t.Task_data_table_name, p.Parsing_file_name, p.Data_file "+
                "FROM (`PARSING_DATA_FILEs` p JOIN `ORIGINAL_DATA_FILEs` o ON p.Type_id = o.Type_id) "+
                "JOIN `TASKs` t ON t.task_name = o.task_name " +
                "WHERE p.File_index = ?;";
            var result1 = await sequelize.query(sql1, {
                replacements : [file_index],
                type: QueryTypes.SELECT,
                logging: false,
            });
            console.log("result1 complete");
            var task_data_table_name = result1[0].Task_data_table_name;
            var data_file = result1[0].Data_file;
            var Task_data_table_schema = result1[0].Task_data_table_schema;
            var file_name = result1[0].Parsing_file_name;
            console.log(data_file);
            
            var stream = fs.createReadStream(data_file);
            sql2 = "INSERT INTO " +task_data_table_name + " VALUES(?, ?);"  ;
            csv.parseStream(stream, {headers : false})
            .on("data", async function(data){
                await sequelize.query(sql2, {
                    replacements : [submit_name, data],
                    type: QueryTypes.INSERT,
                    logging: false,
                });
            }).on("end", function(){
                console.log("insert compelte");
            });
            //file 평가 자료 업데이트
            sql3 = "UPDATE PARSING_DATA_FILEs p " +
                    "SET p.Pass = 1, p.User_score = ? "+
                    "WHERE p.File_index = ?;";
            //console.log(sql);
            await sequelize.query(sql3, {
                replacements : [user_score, file_index],
                type: QueryTypes.UPDATE,
                logging: false,
            });
            console.log("result3 complete");

        } else{
            //non-pass
            console.log("non-PASS!!");
            sql4 = "UPDATE PARSING_DATA_FILEs p " +
                "SET p.Pass = 0, p.User_score = ? "+
                "WHERE p.File_index = ?;";
            //console.log(sql);
            await sequelize.query(sql4, {
                replacements : [user_score, file_index],
                type: QueryTypes.UPDATE,
                logging: false
            });
        }

        //Pass 상관없이 제출자 점수 업데이트
        
        sql5 = "SELECT m.Id, m.Score "+
            "FROM (HAND_INs h JOIN MEMBERs m ON h.H_id = m.Id) " +
            "WHERE (m.Id = (SELECT h.H_id FROM HAND_INs WHERE h.File_index = ? LIMIT 1)) "+ 
            "AND (h.Round IS NOT NULL);" ;
        
        var result2 = await sequelize.query(sql5, {
            replacements : [file_index],
            type: QueryTypes.SELECT,
            
        });
        console.log(result2);
        var submit_id =result2[0].Id;
        var prev_score =result2[0].Score;
        
        
        sql6 = "SELECT COUNT(*) AS count "+
            "FROM HAND_INs h JOIN PARSING_DATA_FILEs  p ON h.File_index = p.File_index WHERE (h.H_id=?) AND (p.Pass IS NOT NULL) ;" ;
        
        var result3 = await sequelize.query(sql6, {
            replacements : [submit_id],
            type: QueryTypes.SELECT,
            
        });
        var  submit_count = parseInt(result3[0].count);

        sql7 = "SELECT System_score FROM PARSING_DATA_FILEs WHERE File_index =? ;";
        
        var result4 = await sequelize.query(sql7, {
            replacements : [file_index],
            type: QueryTypes.SELECT,
            
        });
        var system_score = parseInt(result4[0].System_score);
        console.log("SYstemscore:"+system_score);
        console.log("submit_count: " + submit_count);
        console.log("Preve_socre: "+prev_score);
        console.log("Userscore:" + user_score);
        var next_score;
        var score_from_user = parseInt(user_score);
        //제출자 점수 업데이트
        if(submit_count == 1){
            next_score = score_from_user + system_score;
        } else{
            next_score = (((prev_score * (submit_count - 1)) + (score_from_user+system_score) ) / submit_count);
        }
        console.log("next_score is :" +next_score);

        sql6 = "UPDATE MEMBERs m " +
            "SET m.Score = ? "+
            "WHERE m.Id = ?;";
        
        await sequelize.query(sql6, {
            replacements : [next_score, submit_id],
            type: QueryTypes.UPDATE
        });
        return res.status(200).send("성공적인 업데이트");
    }catch(err){
        console.log(err);
        res.status(400).send("오류가 있습니다.");
    }
};   

exports.ratestate = async (req, res) => {
    try{
        var id = req.query.id;
        var sql = "SELECT Parsing_file_name, Pass, User_score FROM `PARSING_DATA_FILEs` "+  
                "WHERE (E_id = ?) AND (Pass is not NULL);";
        const result = await sequelize.query(sql, {
        replacements : [id],
        type: QueryTypes.SELECT
        });
        console.log(result);
        res.json(result);
    }catch(err){
        console.log(err);
        res.status(400).send("오류가 있습니다.");
    }
};