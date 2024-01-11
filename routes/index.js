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

// router.use('/imges', express.static( 'imges'));


// router.get('/mainimage', (req, res) => {
//   models.Image.findAll({
//     where: {
//       where_page: 'main'
//     }
//   })
//   .then(result => {
//     res.send(result);
//   })
//   .catch(err => {
//     console.log(err);
//   })
// });

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


module.exports = router;