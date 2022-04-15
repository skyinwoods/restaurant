// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


const app = express()
const port = 3000
const Rest = require('./models/restaurant') //載入 restaurant  model

// require express-handlebars here
const exphbs = require('express-handlebars')
//const restaurant = require('./models/restaurant')

//body-parser
app.use(express.urlencoded({ extended: true }))

// Template Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// 靜態檔案(Bootstrap@4.6.1)
app.use(express.static('public'))

// 首頁_index
app.get('/', (req, res) => {
  Rest.find() // 取出 Rest model 裡所有的資料
    .lean()
    .sort({name: 'asc'})
    .then(rests => res.render('index', {rests}))
    .catch(error => console.error(error))
})

// 新增一筆資料＿路由導到 new
app.get('/restaurants/new', (req, res) =>{
  return res.render('new')
})

// 新增一筆資料＿接住資料表單送往資料庫
app.post('/rests', (req, res) => {
  // 從 req.body 拿出表單的資料
  const {id,name, name_en, category, image, location,phone, google_map, rating, description  } = req.body // 解構賦值：優化程式碼
  return Rest.create({id ,name, name_en, category,image, location, phone, google_map ,rating,description })// 存入資料庫
    .then(() => res.redirect('/'))// 新增完成後導回首頁
    .catch(error => console.log(error))
})



// 單個餐廳_show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Rest.findById(id)
    .lean()
    .then((rest) => res.render('show', {rest}))
    .catch(error => console.log(error))
})

// 編輯單個餐廳_edit
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Rest.findById(id)
    .lean()
    .then((rest) => res.render('edit', {rest}))
    .catch(error => console.log(error))
})

// 編輯單個餐廳_update
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
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

// 搜尋
//app.get('/search', (req, res) => 
//  const keyword = req.query.keyword
//  console.log(keyword)

//  const restaurants = Rest.find(rests => {
//    return rests.name.toLowerCase().includes(keyword.toLowerCase())
//  })
//  res.render('index', {restaurant: restaurants, keyword : keyword})
//})

// 刪除
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Rest.findById(id)
    .then(rest => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})

