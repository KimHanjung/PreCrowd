const db = require("../models");
const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');
const fs = require('fs');
var iconv = require('iconv-lite');

exports.tasklist = async (req, res) => {
  var id = req.query.id;
  var sql = "SELECT t.Task_name, t.Desc, t.Term FROM `tasks` t WHERE NOT EXISTS "+ 
                "(SELECT * FROM `approvals` a WHERE (a.Task_name = t.Task_name) AND (a.H_id = ?));";
  const result = await sequelize.query(sql, {
    replacements : [id],
    type: QueryTypes.SELECT
  });
  console.log(result);
  res.json(result);
};

exports.taskreq = async (req, res) => {
  var post = req.body;
  var user_id = post.user_id;
  var task_name = post.task_name;
  var sql = "INSERT INTO `approvals` VALUES(?, ?, 0);";
  const result = await sequelize.query(sql, {
    replacements : [user_id, task_name],
    type: QueryTypes.SELECT
  });
  console.log(result);
  res.json(result);
};

exports.taskin = async (req, res) => {
  var id = req.query.id;
  var sql = "SELECT t.Task_name, t.Desc, t.Term FROM `tasks` t WHERE EXISTS "+ 
                "(SELECT * FROM `approvals` a WHERE (a.status = 1)  AND (a.Task_name = t.Task_name) AND (a.H_id = ?));";
  const result = await sequelize.query(sql, {
    replacements : [id],
    type: QueryTypes.SELECT
  });
  
  console.log(result);
  res.json(result);
};

exports.submitscore = async (req, res) => {
  var user_id = req.query.user_id;

  var sql = "SELECT `Score` FROM `members` WHERE Id = ?";
  const result = await sequelize.query(sql, {
    replacements : [user_id],
    type: QueryTypes.SELECT
  });
  console.log(result);
  res.json(result);
};

exports.submittaskstate = async (req,res) => {
  var user_id = req.query.user_id;
  var task_name =req.query.task_name;
  var sql = "SELECT COUNT(*) as pass_num, COALESCE(SUM(p.Total_tuple_num), 0) as tuple_num "+
            "FROM  (`Parsing_data_files` p JOIN `Hand_ins` h ON p.File_index = h.File_index) "+ 
            "JOIN `Original_data_files` o ON p.Type_id = o.Type_id " +
            "WHERE (o.Task_name = ?) AND (h.H_id = ? ) AND (p.pass = 1) "
            "GROUP BY Task_name";
  const result = await sequelize.query(sql,{
    replacements: [task_name, user_id],
    type: QueryTypes.SELECT
  });

  console.log(result);
  res.json(result);
};

exports.submittypestate = async (req,res) => {
  var user_id = req.query.user_id;
  var task_name = req.query.task_name;
  var type_name =req.query.type_name;
  var sql = "SELECT  p.Parsing_file_name, p.Pass, h.Round "+
            "FROM  (`Parsing_data_files` p JOIN `Hand_ins` h ON p.File_index = h.File_index) "+ 
            "JOIN `Original_data_files` o ON p.Type_id = o.Type_id "+
            "WHERE (o.Task_name = ?) AND (h.H_id = ? ) AND (o.Type_name = ?) "+
            "ORDER by h.Round;";
  const result = await sequelize.query(sql,{
    replacements: [task_name, user_id, type_name],
    type: QueryTypes.SELECT
  });

  console.log(result);
  res.json(result);
};

exports.typelist = async (req, res) => {
  var task_name = req.query.task_name;

  var sql = "SELECT Type_name FROM original_data_files WHERE Task_name = ?";
  const result = await sequelize.query(sql, {
    replacements : [task_name],
    type: QueryTypes.SELECT
  });
  console.log(result);
  res.json(result);
};

exports.submit = async (req, res) => {
  //Get Post request
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  var post = req.body;
  console.log(post);
  var user_id = post.user_id;
  var type_name = post.type_name;
  var task_name = post.task_name;
  var round = post.round;
  var period = post.period;
  
  // CSV file encoding 
  let filename = req.file.filename;
  console.log(filename);
  let path = "./src/uploads/" + filename;
  var csv_str = '';
  var csv_raw = fs.readFileSync(path);
  //var csv_info = jschardet.detect(csv_raw);
  var csv = iconv.decode(csv_raw, 'euc-kr');
  //var iconv = new Iconv("EUC-KR", "utf-8");
  //var csv = iconv.convert(csv_raw);
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
  var sql = "SELECT `Schema` AS ori_sch, Task_data_table_schema AS res_sch, Type_id "+ 
            "FROM original_data_files o JOIN tasks t ON o.Task_name = t.Task_name "+
            "WHERE (o.Type_name = ?) AND (t.Task_name = ?); ";
  var result1 = await sequelize.query(sql, {
    replacements : [type_name, task_name],
    type: QueryTypes.SELECT
  });
  var sql = "SELECT Id FROM `members` WHERE Role= \'Evaluationer\' ORDER BY RAND() LIMIT 1 ;";
  var result2 = await sequelize.query(sql, {
    type: QueryTypes.SELECT
  });

  // 해당 data type과 task가 없을 때 error handleing 필요
  console.log(result1[0]);
  var ori_sch = result1[0].ori_sch.split(',');
  var res_sch = result1[0].res_sch.split(',');
  var type_id = result1[0].Type_id;
  
  //평가자 한명도 없을 때 error 핸들링 필요
  var e_id = result2[0].Id;

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

  var average_null_percent = 0;
  //convert count to percent
  for(var i=0;i<submit_schema.length;i++){
    average_null_percent += null_percent[i]/total_tuple_num;
    parsing_data[i] = parsing_data[i].join(',');
  }

  average_null_percent = (average_null_percent/submit_schema.length);

  //count overlap tuples
  for(var i=0;i<total_tuple_num;i++){
    for(var j=i+1;j<total_tuple_num;j++){
      if(parsing_data[i]==parsing_data[j]) {
        overlap_tuple = overlap_tuple + 1;
      } 
    }
  }

  // System score
  var system_score = (100 - average_null_percent)/2 + (100 - overlap_tuple/total_tuple_num)/2;
  console.log(system_score);   
  
  data[0] = submit_schema.join(',');
  csv_parsing = parsing_data.join('\r\n');
  fs.writeFileSync(path,csv_parsing);

  
  sql = 'INSERT INTO parsing_data_files'+
        '( Parsing_file_name, E_id, System_score, Total_tuple_num, Type_id, Data_file) '+
        'VALUES(?,?,?,?,?,?);';
  await sequelize.query(sql, {
    replacements : [filename, e_id, system_score, total_tuple_num ,type_id, csv_parsing],
    type: QueryTypes.INSERT
  });
  
  sql = 'SELECT MAX(File_index) AS File_index FROM parsing_data_files;';
  var result3 = await sequelize.query(sql, {
    type: QueryTypes.SELECT
  });
  console.log("file_index:" + result3[0].File_index);
  file_index = result3[0].File_index;

  sql = 'INSERT INTO hand_ins VALUES(?,?,?,?);';
  await sequelize.query(sql, {
    replacements : [user_id,file_index, round, period],
    type: QueryTypes.INSERT
  });

  res.status(200).send({
    message: "Successfully upload",
  });
};