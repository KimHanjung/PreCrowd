var pool = require("../db/db_connect");

const db = require("../models");
const Member = db.member;

exports.tasklist = (req, res) => {
  
  
  pool.getConnection(function(err, con){
    if(!err){
      console.log("tasklist with " + req.qurey.id);
      var sql = "SELECT  * FROM tasks t WHERE NOT EXISTS "+ 
                "(SELECT * FROM approvals a WHERE (t.Task_name = 'task1') AND (a.H_id = 'hongsun1'));";
      var id = req.query.id;
      console.log(id); 
      con.query(sql,[id],function(error, result){
        if(error) throw error;
        res.json(result);
      });
      
    }
    con.release();
  });

  db.task.findAll({
  }).then(task =>{
    console.log(task);
  })
};

exports.taskin = (req, res) => {
  pool.getConnection(function(err, con){
    if(!err){
      var sql = "SELECT t.task_name, desc FROM tasks t LEFT JOIN approvals a ON t.task_name = a.task_name WHERE (H_id = ?) AND (a.status = 1)";
      var id = req.query.id;
      console.log(id); 
      con.query(sql,[id],function(error, result){
        if(error) throw error;
        res.json(result);
      });

    }
    con.release();
  });
};

exports.typelist = (req, res) => {
  pool.getConnection(function(err, con){
    if(!err){
      var sql = "SELECT type_name FROM original_data_types WHERE task_name = ?";
      var task_name = req.query.task_name;
      console.log(task_name); 
      con.query(sql,[task_name],function(error, result){
        if(error) throw error;
        res.json(result);
      });

    }
    con.release();
  });
};

const fs = require('fs');
const { approval } = require("../models");

var Iconv = require('iconv').Iconv;

exports.submit = (req, res) => {
  //Get Post request
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  var post = req.body;
  var user_id = post.user_id;
  var type_name = post.type_name;
  var task_name = post.task_name;
  var round = post.round;
  var period = post.period;
  
  // CSV file encoding 
  let filename = req.file.filename;
  let path = "./src/uploads/" + filename;
  var csv_str = '';
  var csv_raw = fs.readFileSync(path);
  //var csv_info = jschardet.detect(csv_raw);
  var iconv = new Iconv("EUC-KR", "utf-8");
  var csv = iconv.convert(csv_raw);
  var csv_str = csv.toString('utf-8');

  // original data 
  var data = csv_str.split(/\r?\n/)
  for(var m=0;m<data.length;m++){
    data[m] = data[m].split(',');
  }
  var submit_schema = data[0];

  // parsing data 
  var parsing_data = new Array();
  var total_tuple_num = data.length - 2;
  var overlap_tuple = 0;
  var null_percent = new Array();
  for(var l =0;l<total_tuple_num;l++){
    parsing_data[l] = new Array();
  }
  for(var l =0;l<submit_schema.length;l++){
    null_percent[l] = 0;
  }

  //DB connection
  pool.getConnection(function(err, con){
    if(!err){
      var sql = "SELECT `schema` AS ori_sch, task_data_table_schema AS res_sch, type_id "+ 
                "FROM original_data_types o JOIN tasks t ON o.task_name = t.task_name "+
                "WHERE (o.type_name = ?) AND (t.task_name = ?); "+
                "SELECT id FROM members WHERE role= 2 ORDER BY RAND() LIMIT 1 ;";

      con.query(sql,[type_name, task_name],function(error1, result1){
        if(error1) throw error1;
        // 해당 data type과 task가 없을 때 error handleing 필요
        console.log(result1[0][0]);
        var ori_sch = result1[0][0].ori_sch.split(',');
        var res_sch = result1[0][0].res_sch.split(',');
        var type_id = result1[0][0].type_id;
        
        //평가자 한명도 없을 때 error 핸들링 필요
        var e_id = result1[1][0].id;

        console.log(ori_sch);
        console.log(res_sch);
        console.log(type_id);
        console.log(e_id);

        //csv data parsing
        for(var i=0;i<submit_schema.length; i++){
          for(var j=0;j<ori_sch.length;j++){
            if(submit_schema[i] == ori_sch[j]){
              console.log("column match!");
              submit_schema[i] = res_sch[j];
              for(var k=0;k<total_tuple_num;k++){
                if(data[k+1][i] == '') null_percent[j] = null_percent[j] + 1;
                parsing_data[k][j]= data[k+1][i];
              }
              break;
            }
            //coumn이 매치하는 게 없음! -> 에러 핸들링
          }
        }

        //convert count to percent
        for(var i=0;i<submit_schema.length;i++){
          null_percent[i] = null_percent[i]/total_tuple_num;
        }
        var str_null_percent = null_percent.join(',');

        //count overlap tuples
        for(var i=0;i<total_tuple_num;i++){
          for(var j=i+1;j<total_tuple_num;j++){
            if(parsing_data[i]==parsing_data[j]) overlap_tuple ++;
          }
        }
        
        data[0] = submit_schema.join(',');
        csv_parsing = parsing_data.join('\r\n');
        fs.writeFileSync(path,csv_parsing);
        
        var file_insert_sql = 'INSERT INTO parsing_data_files'+
                              '(parsing_file_name, e_id, tuple_num, overlap_tuple, null_percent, type_id, data_file) '+
                              'VALUES(?,?,?,?,?,?,?);'+
                              'SELECT file_index FROM parsing_data_files WHERE parsing_file_name = ?;';
                             
        con.query(file_insert_sql,
          [filename, e_id, total_tuple_num, overlap_tuple, str_null_percent ,type_id, csv_parsing, filename],
            function(error2, result2){
              if(error2) throw error2;
              var hand_in_insert_sql = 'INSERT INTO hand_ins VALUES(?,?,?,?)  ';
              console.log(result2[1][0].file_index);
              con.query(hand_in_insert_sql, [user_id, result2[1][0].file_index, round, period]);
              
        });
      });
      res.status(200).send({
        message: "Successfully upload",
      });
      
    } else{
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
    con.release();
  });
};