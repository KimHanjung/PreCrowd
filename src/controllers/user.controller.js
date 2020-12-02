const db = require("../models");
const Member = db.member;
const Origin = db.origin;
const Task = db.task;
const Parsing = db.parsing;

const Op = db.Sequelize.Op;

const { QueryTypes } = require('sequelize');

exports.task_stat = (req, res) => {

    db.sequelize.query('select TASKs.Task_name, TASKs.Desc,\
    IFNULL(SUM(PARSING_DATA_FILEs.Pass), 0) as Pass, COUNT(PARSING_DATA_FILEs.File_index) as Total\
    from TASKs left join ORIGINAL_DATA_FILEs on TASKs.Task_name=ORIGINAL_DATA_FILEs.Task_name\
    left join PARSING_DATA_FILEs on ORIGINAL_DATA_FILEs.Type_id=PARSING_DATA_FILEs.Type_id\
    group by TASKs.Task_name;', {
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
        where Task_name=? group by Type_name;', {
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
          where M.Id=A.H_id and A.Task_name=?;', {
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
    where M.Id=A.H_id and M.Id=?;', {
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