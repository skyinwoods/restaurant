// 引用 Express 和 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Rest model
const Rest = require('../../models/restaurant')
// 定義首頁路由
// 首頁_index
router.get('/', (req, res) => {
  Rest.find() // 取出 Rest model 裡所有的資料
    .lean()
    .sort({ })
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
})

router.get('/:way', (req, res) => {
  const way = req.params.way
  if (way === 'asc' | way === 'desc') {
    console.log(req.params)
    Rest.find() // 取出 Rest model 裡所有的資料
      .lean()
      .sort({ name: way })
      .then(rests => res.render('index', { rests }))
      .catch(error => console.error(error))
  } else if (way === 'category') {
    Rest.find()
      .lean()
      .sort({ category: 'asc' })
      .then(rests => res.render('index', { rests }))
      .catch(error => console.error(error))
  } else {
    Rest.find()
      .lean()
      .sort({ location: 'asc' })
      .then(rests => res.render('index', { rests }))
      .catch(error => console.error(error))
  }
})

// 匯出路由模組
module.exports = router
