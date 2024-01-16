const express = require('express');
const models = require('../models');
const { Op } = require('sequelize');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    res.render('index');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.use('/images', express.static( 'images')); //이미지 접근 권한

// 로그인 , 회원가입
router.post('/login', async (req, res) => {
  try {
    const user = req.body;
    await models.User.findOne({
      where: {
        id: user.id
      }
    })
    .then(result => {
      if(user.password == result.dataValues.password){
        res.send('1');
      } else {
        res.send('2');
      }
    })
  } catch(err) {
    console.log(err);
  }
})

router.post('/signup', async(req, res) => {
  try {
    const user = req.body;
    await models.User.create({
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      phone: user.phone
    })
    .then(result => {
      res.send('success');
    })
    .catch(err => {
      console.log(err);
      res.send('fail');
    })
  } catch(err) {
    console.log(err);
  }
})

//여러개 검색
router.get('/search/:keyword', async (req, res) => {
  try {
    const params = req.params;
    const keyword = params.keyword;

    // html 모델에서 검색
    const htmlItems = await Menu.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%` // 검색한 단어가 들어가 있는 name 필드를 검색
        }
      }
    });


    res.json({ 'htmlItems': htmlItems,  }); 
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;