const db = require("../models");
const Task = db.task;
const Original = db.origin;
const Member = db.member;
const Approval = db.approval;

const { QueryTypes, queryInterface } = require('sequelize');
const Op = db.Sequelize.Op;

exports.create_task = (req, res) => {
  if ((req.body.tableschema.match(/,/g) || []).length != (req.body.originalschema.match(/,/g) || []).length) {
    res.status(507).send({ message: 'Original data type schema must match the task data type schema.' });
    console.log('failed: Original data type schema must match the task data type schema.');
  }
  else{
  Task.create({
    Task_name: req.body.taskname,
    Desc: req.body.desc,
    Term: req.body.term,
    Task_data_table_name: req.body.tablename,
    Task_data_table_schema: req.body.tableschema,
    Pass: req.body.pass,
  })
    .then(user => {
      const columns = req.body.tableschema;
      const attr = columns.split(',');
      const type = " VARCHAR(255),";
      var row = "";
      for(var elem in attr){
        row += attr[elem] + type;
      }
      var query = 'create table ' + req.body.tablename + ' (' + row.slice(0,row.length-1) + ')';
      const { QueryTypes } = require('sequelize');
      db.sequelize.query(query, {
        raw: true,
        replacements:[]
      }).then(() => {
        res.send({ message: "New task is successfully created!" });
        console.log('create_task success');
      })
      .catch((err) => console.log(err))
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('create_task failed', err);
    });
  }
  };

exports.create_original = (req, res) => {
  Original.create({
    Schema: req.body.originalschema,
    Type_name: req.body.originalname,
    Task_name: req.body.taskname
  })
    .then(user => {
      queryInterface.addConstraint('ORIGINAL_DATA_FILEs', {
        fields: ['Type_name', 'Task_name'],
        type: 'unique',
        name: 'unique in task'
      })
      .then(() => console.log("add unique success"))
      .catch((err) => console.log("add unique failed: ", err));
      ;
      res.send({ message: "New original data type is successfully created!" });
      console.log('create_original success');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('create_original failed');
    });
  };

  exports.get_task = (req, res) =>{
    Task.findAll({
      raw:true
    })
      .then(task =>{
        res.send({users: task});
        console.log('get_task success');
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
        console.log('get_task failed');
      });
  };

  exports.delete_task = (req, res) =>{
    Task.destroy({
      where:
      {
        Task_name: req.body.Task_name
      }
    })
      .then(user =>{
        res.send({ message: "delete_task is completed!"});
        console.log('delete_task is completed!');
      })
      .catch(err => {
        res.status(500).send({ message: "failed: delete_task" });
        console.log('failed: delete_task');
      });
  };

  exports.get_approval = (req, res) => {
    db.sequelize.query('select MEMBERs.Id as Id, MEMBERs.Name as Name, MEMBERs.Score as Score, APPROVALs.Status as Status\
    from TASKs, APPROVALs, MEMBERs\
    where TASKs.Task_name=? and TASKs.Task_name=APPROVALs.Task_name and APPROVALs.H_id=MEMBERs.Id', {
      raw:true,
      type: QueryTypes.SELECT,
      replacements: [req.body.Task_name],
    })
    .then((result) => {
      res.send({result: result});
      console.log('get_approval is completed!');
    })
    .catch(err => {
      res.status(500).send({ message: "failed: get_approval" });
      console.log("failed: get_approval", err);
    });
  };

  exports.modify_approval = (req, res) => {
    let id = req.body.id;
    let taskname = req.body.taskname;
    let input_status = 1-req.body.status;
    db.sequelize.query('update APPROVALs\
    set Status=?\
    where Task_name=? and H_id=?', {
      raw:true,
      type: QueryTypes.UPDATE,
      replacements: [input_status, taskname, id],
    })
      .then((message) => {
            res.send(message)
            console.log('success: modify_approval');
          })
      .catch(err => {
        res.status(500).send({ message: err.message });
        console.log(err);
      });
  };

  exports.set_pass = (req, res) => {
    db.sequelize.query('update TASKs\
    set Pass=?\
    where Task_name=?', {
      raw:true,
      type: QueryTypes.UPDATE,
      replacements: [req.body.pass, req.body.taskname],
    })
      .then((message) => {
            res.send(message)
            console.log('success: set_pass');
          })
      .catch(err => {
        res.status(500).send({ message: err.message });
        console.log(err);
      });
  }
exports.getfile = async (req, res) =>{
  try{
    var task_name = req.query.task_name;
    var file = "./src/parse_down/"+task_name+'.csv';
    console.log(file);
    var sql = 'SELECT Task_data_table_name FROM TASKs WHERE Task_name=?;';
    var result = await db.sequelize.query(sql,{
      type: QueryTypes.SELECT,
      replacements: [task_name]
    })
    var name = result[0].Task_data_table_name;
    console.log(name);

    var sql1 = 'SELECT * FROM '+name+' INTO OUTFILE ?;';
    console.log(sql1);
    await db.sequelize.query(sql1,{
      type: QueryTypes.SELECT,
      repalcements: [name]
    });
  try {
    if (fs.existsSync(file)) { // 파일이 존재하는지 체크
    var file_name = name;
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
    res.status(400).send("잘못된 요청입니다.");
  }
    
};

exports.task_stat = (req, res) => {

    db.sequelize.query('select TASKs.Task_name, TASKs.Desc,\
    IFNULL(SUM(PARSING_DATA_FILEs.Pass), 0) as Pass, COUNT(PARSING_DATA_FILEs.File_index) as Total\
    from TASKs left join ORIGINAL_DATA_FILEs on TASKs.Task_name=ORIGINAL_DATA_FILEs.Task_name\
    left join PARSING_DATA_FILEs on ORIGINAL_DATA_FILEs.Type_id=PARSING_DATA_FILEs.Type_id\
    group by TASKs.Task_name order by TASKs.Task_name;', {
      raw:true,
      type: QueryTypes.SELECT,
    })
    .then((rows) => {
      var result = []
      rows.map((row, i, arr) =>{
        var temp = {};
        temp['Task_name'] = row.Task_name;
        temp['Desc'] = row.Desc;
        temp['Pass'] = row.Pass;
        temp['Total'] = row.Total;
        temp['Sub'] = [];
        temp['Member'] = [];
        db.sequelize.query('select Type_name, IFNULL(sum(Pass), 0) as Pass, count(File_index) as Total\
        from ORIGINAL_DATA_FILEs left join PARSING_DATA_FILEs on ORIGINAL_DATA_FILEs.Type_id=PARSING_DATA_FILEs.Type_id \
        where Task_name=? group by Type_name order by Type_name;', {
          replacements: [temp['Task_name']],
          raw:true,
          type: QueryTypes.SELECT,
        })
        .then((rows) => {
            rows.map(row => {
            var temp_2 = {};
            temp_2['Type_name'] = row.Type_name;
            temp_2['Pass'] = row.Pass;
            temp_2['Total'] = row.Total;
            temp['Sub'].push(temp_2);
          })
          result.push(temp);
          db.sequelize.query('select M.Name as Name, M.Id as Id from MEMBERs as M, APPROVALs as A\
          where A.Status=1 and M.Id=A.H_id and A.Task_name=? order by Name;', {
            replacements: [temp['Task_name']],
            raw:true,
            type: QueryTypes.SELECT,
          })
          .then((rows) => {
              rows.map(row => {
              var temp_3 = {};
              temp_3['Name'] = row.Name;
              temp_3['Id'] = row.Id;
              temp['Member'].push(temp_3);
            })
            if(i+1 === arr.length) res.send(result);
          })
        })
        .catch(err => res.status(400).send(err));
      })
      //res.send(result);
      
    })
    .catch(err=> res.status(400).send(err));
  };

  exports.task_member = (req, res) => {

    db.sequelize.query('select A.Task_name as Task_name from MEMBERs as M, APPROVALs as A\
    where A.Status=1 and M.Id=A.H_id and M.Id=?;', {
      replacements: [req.body.id],
      raw:true,
      type: QueryTypes.SELECT,
    })
    .then(rows => {
      var result = [];
      rows.map(row => result.push(row.Task_name))
      //console.log(result);
      res.send(result);
    })
    .catch(err => res.status(400).send(err))
  };