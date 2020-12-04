const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
const Member = db.member;
const Task = db.task;;
const Approval = db.approval;
const Handin = db.handin;
const Original = db.origin;
const Parsing = db.parsing;

require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/submit.routes')(app);
require('./src/routes/rating.routes')(app);

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Precrowd." });
});

app.set('view engine', 'ejs');  
app.set('views', './views');

app.get('/view',function(req,res){
  res.render('view',{data:'kim'});
});

// set port, listen for requests

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial(){
//   Member.create({
//     Name: 'admin',
//     Id: 'admin',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Administrator'
//   })
//   .then((res) => console.log('Administrator is created!'))
//   .catch((err) => console.log('Administrator creates error!'));
// }

function initial(){
  Member.bulkCreate([{
    Name: '관리자',
    Id: 'admin',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Administrator'
  },
  {
    Name: '김한중',
    Id: 'Kim',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Submittor'
  },
  {
    Name: '신지헌',
    Id: 'Shin',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Evaluationer'
  },
  {
    Name: '추교빈',
    Id: 'Chu',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Evaluationer'
  },
  {
    Name: '권동현',
    Id: 'Kwon',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Submittor'
  },
  {
    Name: '이창열',
    Id: 'Lee',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Submittor'
  }])
  .then((res) => {console.log('Administrator is created!');
  initial2();
  initial3();
}
  )
  .catch((err) => console.log('Administrator creates error: ', err));

  Member.create({
    Name: 'Submittor1',
    Id: 'Submittor1',
    Pw: bcrypt.hashSync('11111', 8),
    Role: 'Submittor',
    Bdate: '34-11-11',
    Gender: 1,
    Phone:'010-1111-1111',
    Address: 'busan',
    Score: 70
  })
  .then((res) => console.log('Submittor1 is created!')
  )
  .catch((err) => console.log('Submittor1 creates error: ', err));

  Member.create({
    Name: 'Evaluationer1',
    Id: 'Evaluationer1',
    Pw: bcrypt.hashSync('11111', 8),
    Role: 'Evaluationer',
    Bdate: '65-12-12',
    Gender: 0,
    Phone:'010-2222-2222',
    Address: 'seoul',
  })
  .then((res) => console.log('Evaluationer1 is created!')
  )
  .catch((err) => console.log('Evaluationer1 creates error: ', err));

  Task.create({
    Task_name: 'Task1',
    Desc: 'blablablablablablabla',
    Term: 30,
    Task_data_table_name: 'task1_table',
    Task_data_table_schema: 'id1,pw1,name1',
  })
  .then((res) => console.log('Task1 is created!')
  )
  .catch((err) => console.log('Task1 creates error: ', err));
  //Task_data_table_schema: '기준년월,상품코드,대출년도,대출학기,대출과목세분류코드,계좌상태,대출금액,대출잔액,대출금리,상품구분코드'
  Task.create({
    Task_name: 'Task2',
    Desc: 'blablablablablablabla',
    Term: 30,
    Task_data_table_name: 'task2_table',
    Task_data_table_schema: 'name1,id1,pw1'
  })
  .then((res) => console.log('Task2 is created!')
  )
  .catch((err) => console.log('Task2 creates error: ', err));

  Original.create({
    Schema : "pw1_1,id1_1,name1_1",
    //Schema: '기준년월,상품코드,대출년도,대출학기,대출과목세분류코드,계좌상태,대출금액,대출잔액,대출금리,상품구분코드',
    Type_name: 'ori1',
    Task_name: 'Task1'
  })
  .then((res) => console.log('Original data1 is created!')
  )
  .catch((err) => console.log('Original data1 creates error: ', err));

  Parsing.create({
    Parsing_file_name: 'parsing file 1',
    Pass: false,
    User_score: 70,
    E_id: 'Submittor1',
    System_score: 60,
    Type_id: 1,
    Data_file: 'data1,data2,data3'
  })
  .then((res) => console.log('parsing file 1 is created!')
  )
  .catch((err) => console.log('parsing file 1 creates error: ', err));
  
  Approval.create({
    H_id: 'Submittor1',
    Task_name: 'Task1',
    Status: false
  })
  .then((res) => console.log('Approval 1 is created!')
  )
  .catch((err) => console.log('Approval 1 creates error: ', err));
  
  // Approval.create({
  //   H_id: 'Submittor2',
  //   Task_name: 'Task2',
  //   Status: false
  // })
  // .then((res) => console.log('Approval 2 is created!')
  // )
  // .catch((err) => console.log('Approval 2 creates error: ', err));
}


function initial2(){
  Task.create({
    Task_name: '보험 로그 수집',
    Desc: '보험들의 로그를 수집함',
    Term: 5,
    Task_data_table_name: 'Card_log',
    Task_data_table_schema: '',
  });
  Task.create({
    Task_name: '카드 로그 수집',
    Desc: '카드들의 로그를 수집함',
    Term: 5,
    Task_data_table_name: 'Card_log',
    Task_data_table_schema: '회원, 카드번호, 유효기간',
  })
  .then((res) => console.log('Task is created!')
  )
  .catch((err) => console.log('Task creates error: ', err));

  Approval.create({
    H_id: 'Kim',
    Task_name: '카드 로그 수집',
    Status: 0,
  })
  Approval.create({
    H_id: 'Kim',
    Task_name: '보험 로그 수집',
    Status: 1,
  })
  Approval.create({
    H_id: 'Lee',
    Task_name: '카드 로그 수집',
    Status: 1,
  })
  Approval.create({
    H_id: 'Kwon',
    Task_name: '카드 로그 수집',
    Status: 1,
  })
  Approval.create({
    H_id: 'Chu',
    Task_name: '보험 로그 수집',
    Status: 0,
  })
  .then((res) => console.log('Approval is created!')
  )
  .catch((err) => console.log('Approval creates error: ', err));
}

function initial3(){
  Origin.create({
    Schema: "이름, 카드사, 번호",
    Task_name: '카드 로그 수집',
    Type_name: '신한카드',
  })
  Origin.create({
    Schema: "이름, 카드사, 번호",
    Task_name: '카드 로그 수집',
    Type_name: '국민카드',
  })
  Origin.create({
    Schema: "이름, 카드사, 번호",
    Task_name: '보험 로그 수집',
    Type_name: '우리카드',
  })
  .then((res) => console.log('Origin is created!')
  )
  .catch((err) => console.log('Origin creates error: ', err));

  Parsing.create({
    Parsing_file_name: "신한",
    Pass: 0,
    E_id: 'Kim',
    Type_id: 1,
  });

  Parsing.create({
    Parsing_file_name: "우리",
    Pass: 1,
    E_id: 'Lee',
    Type_id: 1,
  })

  Parsing.create({
    Parsing_file_name: "국민",
    Pass: 1,
    E_id: 'Kim',
    Type_id: 2,
  })
  .then((res) => {console.log('Parsing is created!');initial4();}
  )
  .catch((err) => console.log('Parsing creates error: ', err));
}

function initial4(){
  Handin.create({
    H_id: "Kim",
    File_index: 1,
  })
  .then((res) => {console.log('Handin is created!');
})}
