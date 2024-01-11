const express = require('express');
const models = require('../models');
const router = express.Router();

// 예시
router.get('/', async(req, res) => {
  try {
    await models.Html.findAll()
    .then(result => {
      res.send(result);
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
    console.log(reqBody);

    const result = models.Html.create(reqBody);
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
    await models.Html.destroy({where : {id : id}});
    res.send('삭제 성공');
  } catch(err) {
    console.log(err);
  }
})

router.patch('/update/:id', async(req, res) => {
  try {
    const info = req.body;
    console.log(req.body);
    await models.Html.update(
      {
        title: info.title,
        content: info.content,
      },
      {
      where: {
        id: req.params.id
      }
      },
    )
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