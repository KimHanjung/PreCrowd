const db = require("../models");
const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');
var fs = require('fs');
var iconv = require('iconv-lite');
var csv = require('fast-csv');

exports.tasklist = async (req, res) => {
  try{
    var id = req.query.id;
    var sql = "SELECT t.Task_name, t.Desc, t.Term FROM `TASKs` t WHERE NOT EXISTS "+ 
                  "(SELECT * FROM `APPROVALs` a WHERE (a.Task_name = t.Task_name) AND (a.H_id = ?));";
    const result = await sequelize.query(sql, {
      replacements : [id],
      type: QueryTypes.SELECT
    });
    console.log(result);
    res.json(result);
  }catch(err){
    console.log(err);
    res.status(400).send("There is an error");
  }
};

exports.taskreq = async (req, res) => {
  try{
    var post = req.body;
    var user_id = post.user_id;
    var task_name = post.task_name;
    var sql = "INSERT INTO `APPROVALs` VALUES(?, ?, 0);";
    const result = await sequelize.query(sql, {
      replacements : [user_id, task_name],
      type: QueryTypes.SELECT
    });
    console.log(result);
    res.status(200).json(result);
  } catch(err){
    console.log(err);
    res.status(400).send("There is an error!");
  }
};

exports.taskin = async (req, res) => {
  try{
  var id = req.query.id;
  var sql = "SELECT t.Task_name, t.Desc, t.Term FROM `TASKs` t WHERE EXISTS "+ 
                "(SELECT * FROM `APPROVALs` a WHERE (a.status = 1) "+ 
                "AND (a.Task_name = t.Task_name) AND (a.H_id = ?));";
  const result = await sequelize.query(sql, {
    replacements : [id],
    type: QueryTypes.SELECT
  });
  
  console.log(result);
  res.status(200).json(result);
  } catch(err){
    res.status(400).send("There is an Error!");
  }  
};

exports.submitscore = async (req, res) => {
  try{
    var user_id = req.query.user_id;

    var sql = "SELECT `Score` FROM `MEMBERs` WHERE Id = ?";
    const result = await sequelize.query(sql, {
      replacements : [user_id],
      type: QueryTypes.SELECT
    });
    console.log(result);
    res.status(200).json(result);
  } catch(err){
    res.status(400).send("There is an Error!");
  } 
};

exports.submittaskstate = async (req,res) => {
  try{
    var user_id = req.query.user_id;
    var task_name =req.query.task_name;
    var sql = "SELECT COUNT(*) as pass_num, COALESCE(SUM(p.Total_tuple_num), 0) as tuple_num "+
              "FROM  (`PARSING_DATA_FILEs` p JOIN `HADN_INs` h ON p.File_index = h.File_index) "+ 
              "JOIN `ORIGINAL_DATA_FILEs` o ON p.Type_id = o.Type_id " +
              "WHERE (o.Task_name = ?) AND (h.H_id = ? ) AND (p.pass = 1) "
              "GROUP BY Task_name";
    const result = await sequelize.query(sql,{
      replacements: [task_name, user_id],
      type: QueryTypes.SELECT
    });

    console.log(result);
    res.status(200).json(result);
  }catch(err){
    res.status(400).send("There is an Error!");
  }
};

exports.submittypestate = async (req,res) => {
  try{
    var user_id = req.query.user_id;
    var task_name = req.query.task_name;
    var sql = "SELECT  o.Type_name, p.Parsing_file_name, p.Pass, h.Round "+
              "FROM  (`PARSING_DATA_FILEs` p JOIN `HAND_INs` h ON p.File_index = h.File_index) "+ 
              "JOIN `ORIGINAL_DATA_FILEs` o ON p.Type_id = o.Type_id "+
              "WHERE (o.Task_name = ?) AND (h.H_id = ? ) "+
              "ORDER by h.Round;";
    const result = await sequelize.query(sql,{
      replacements: [task_name, user_id],
      type: QueryTypes.SELECT
    });

    console.log(result);
    res.json(result);
  } catch(err){
    res.status(400).send("There is an Error!");
  }
};

exports.typelist = async (req, res) => {
  try{
  var task_name = req.query.task_name;

  var sql = "SELECT Type_name FROM ORIGINAL_DATA_FILEs WHERE Task_name = ?";
  const result = await sequelize.query(sql, {
    replacements : [task_name],
    type: QueryTypes.SELECT
  });
  console.log(result);
  res.json(result);
  } catch(err){
    res.status(400).send("There is an Error!");
  }
};





exports.submit = async (req, res) => {
  //Get Post request
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  try{
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
  let ppath = "./src/parsed/" + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) +Date.now() + '.csv';
  console.log(ppath);
  //DB connection
  var sql = "SELECT `Schema` AS ori_sch, Task_data_table_schema AS res_sch, Type_id "+ 
            "FROM ORIGINAL_DATA_FILEs o JOIN TASKs t ON o.Task_name = t.Task_name "+
            "WHERE (o.Type_name = ?) AND (t.Task_name = ?); ";
  var result1 = await sequelize.query(sql, {
    replacements : [type_name, task_name],
    type: QueryTypes.SELECT
  });
  
  var sql = "SELECT Id FROM `MEMBERs` WHERE Role= \'Evaluationer\' ORDER BY RAND() LIMIT 1 ;";
  var result2 = await sequelize.query(sql, {
    type: QueryTypes.SELECT
  });
  
  // 해당 data type과 task가 없을 때 error handleing 필요
  var ori_sch = result1[0].ori_sch.replace(/ /g,"").split(',');
  var res_sch = result1[0].res_sch.replace(/ /g,"").split(',');
  var type_id = result1[0].Type_id;
  var col_num = ori_sch.length;
  //평가자 한명도 없을 때 error 핸들링 필요
  if(result2.length == 0){
    res.status(400).send({message: "There is no evaluator!",})
  }
  var e_id = result2[0].Id;
  
  var stream = fs.createReadStream(path).pipe(iconv.decodeStream('euc-kr'));
  var wstream = fs.createWriteStream(ppath);

  var csv_temp_array = new Array();
  var csv_temp_str;
  var submit_schema = new Array();
  var mapping_info = new Array();
  var total_tuple_num = 0;
  var overlap_tuple = 0; 
  var dic = {};
  var null_percent = new Array();
  
  for(var l =0;l<col_num;l++){
    null_percent[l] = 0;
  }

  csv.parseStream(stream, {headers : false})
    .on("data", function(data){
      if(total_tuple_num == 0){
        //submit schema read
        var i = 0;
        for(var key in data){
          submit_schema[i] = data[key];
          i++;
        } 
        //schema mapping
        for(var i=0;i<data.length; i++){
          for(var j=0;j<col_num;j++){
            if(submit_schema[i] == ori_sch[j]){
              
              mapping_info[i] = j;
              break;
            }
          }
        }
      }else{
        for(var key in data){
          for(var i=0;i<submit_schema.length;i++){
              if(data[key] == '') null_percent[mapping_info[key]]++;
              csv_temp_array[mapping_info[key]] = data[key];
              break;
          }
        }
        csv_temp_str = csv_temp_array.join();
        
        if(!(csv_temp_str in dic)){
          dic[csv_temp_str]= 0;
        }
        else{
          dic[csv_temp_str] = dic[csv_temp_str] + 1;
        }
        //csv_temp_str = utf8.encode(csv_temp_str);
        wstream.write(csv_temp_str);
        wstream.write('\r\n');
      }
      total_tuple_num ++;
    })
    .on("end", async function(){
      wstream.end();
      var average_null_percent = 0;
      //convert count to percent
      for(var i=0;i<submit_schema.length;i++){
        average_null_percent += null_percent[i]/total_tuple_num;
      }
      average_null_percent = (average_null_percent/submit_schema.length);
      
      for(var i in dic){
        overlap_tuple += dic[i]; 
      }
      console.log(overlap_tuple);
      // System score
      var system_score = (100 - average_null_percent)/2 + (100 - overlap_tuple/total_tuple_num)/2;
      console.log(system_score);   
      console.log(ppath);
      
      sql = 'INSERT INTO PARSING_DATA_FILEs'+
            '( Parsing_file_name, E_id, System_score, Total_tuple_num, Type_id, Data_file) '+
            'VALUES(?,?,?,?,?,?);';
              
      await sequelize.query(sql, {
          replacements : [filename, e_id, system_score, total_tuple_num ,type_id, ppath],
          type: QueryTypes.INSERT,
          logging: false,
      });
      sql = 'SELECT MAX(File_index) AS File_index FROM PARSING_DATA_FILEs;';
      var result3 = await sequelize.query(sql, {type: QueryTypes.SELECT});
      console.log("file_index:" + result3[0].File_index);
      var file_index = result3[0].File_index;
      sql = 'INSERT INTO HAND_INs VALUES(?,?,?,?);';
      await sequelize.query(sql, {
              replacements : [user_id, file_index, round, period],
              type: QueryTypes.INSERT
            });
      });
      res.status(200).send({message: "Successfully upload",});
  } catch (err){
    console.log(err);
    res.status(400).send({
      message: "There is an error!",
    });
  }
};