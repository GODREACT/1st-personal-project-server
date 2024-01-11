const express = require('express');
const cors =require('cors')
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const {sequelize} = require('./models');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const indexRouter = require('./routes/index');

const htmlRouter = require('./routes/html.js');

require("dotenv").config({ path: "./.env" })


const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
// 넌적스 초기화
nunjucks.configure('views', {
  express: app,
  watch: true,
});


// force 에 true가 들어가면 테이블을 재생성함
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../fourth-project/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUnitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}),
);


// app.use(passport.session());

app.use('/', indexRouter);

app.use('/html', htmlRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});