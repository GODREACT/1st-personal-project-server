const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require('multer');

// 이미지 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({storage: storage});

// 이미지 받고 경로 보내주기
router.post('/images', upload.single('img_url'), (req,res) => {
  console.log(req.file);
  const path = 'http://localhost:3001/images/' + req.file.originalname;
  res.status(200).send({'path' : path});
});

// router.put('/images', upload.single('img_url'), (req,res) => {
//   console.log(req.file);
//   const path = 'http://localhost:3001/images' + req.file.originalname;
//   res.status(200).send({'path' : path});
// });

router.use('/images', express.static('images'));

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
    // :id, :userid, :key
    const info = req.body;
    console.log("신호");

    console.log(req.body);
    await models.Html.update({
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