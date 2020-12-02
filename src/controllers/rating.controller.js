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
    fs.writeFileSync(file, Data_file);

    try {
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
          var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
          var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
          console.log(mimetype);
          res.setHeader('Content-disposition', 'attachment; filename=' + filename); // 다운받아질 파일명 설정
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