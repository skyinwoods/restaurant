const express = require('express')
const router = express.Router()
const Rest = require('../../models/restaurant')

// 新增一筆資料＿路由導到 new
router.get('/new', (req, res) =>{
  return res.render('new')
})


// 單個餐廳_show
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Rest.findById(id)
    .lean()
    .then((rest) => res.render('show', {rest}))
    .catch(error => console.log(error))
})

// 編輯單個餐廳_edit
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Rest.findById(id)
    .lean()
    .then((rest) => res.render('edit', {rest}))
    .catch(error => console.log(error))
})

// 編輯單個餐廳_update
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  console.log(req.body)
  const {name,phone,location, isDone } = req.body
  return Rest.findById(id)
    .then(rest => {
      rest.name = name
      rest.phone = phone
      rest.location = location
      rest.isDone = isDone === 'on'
      return rest.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Rest.findById(id)
    .then(rest => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 搜尋
//app.get('/search', (req, res) => 
//  const keyword = req.query.keyword
//  console.log(keyword)

//  const restaurants = Rest.find(rests => {
//    return rests.name.toLowerCase().includes(keyword.toLowerCase())
//  })
//  res.render('index', {restaurant: restaurants, keyword : keyword})
//})

// 匯出路由器
module.exports = router