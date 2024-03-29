const express = require('express');
const models = require('../models');
const router = express.Router();

// 예시
router.get('/', async(req, res) => {
  try {
    await models.Htmlreview.findAll()
    .then(result => {
      res.send(result);
      console.log('결과',result);
    })
    .catch(err => {
      console.log(err);
    })
  } catch(err) {
    // console.log(err);
  }
});

router.post('/', (req, res) => {
  try {
    const reqBody = req.body;
    const result = models.Htmlreview.create(reqBody);
    console.log(result);
    res.status(201).end();
  } catch(err) {
    console.log(err);
    res.status(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await models.Htmlreview.destroy({where : {id : id}});
    res.send('삭제 성공');
  } catch(err) {
    console.log(err);
  }
})

router.patch('/update/:id', async(req, res) => {
  try {
    // :id, :userid, :key
    const info = req.body;
    console.log("신호");

    console.log(req.body);
    await models.Htmlreview.update({
      title: info.title,
      content: info.content,
      img_url: info.img_url
    },{
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      res.send('업데이트됨');
    })
    .catch(err => {
      console.log(err);
    })
  } catch(err) {
    console.log(err);
  }
})


module.exports = router;