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


//body-parser
app.use(express.urlencoded({ extended: true }))

// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器
app.use(routes)



// Template Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// 靜態檔案(Bootstrap@4.6.1)
app.use(express.static('public'))


// 新增一筆資料＿接住資料表單送往資料庫
app.post('/rests', (req, res) => {
  //從 req.body 拿出表單的資料
  const {id,name, name_en, category, image, location,phone, google_map, rating, description  } = req.body // 解構賦值：優化程式碼
  return Rest.create({id ,name, name_en, category,image, location, phone, google_map ,rating,description })// 存入資料庫
    .then(() => res.redirect('/'))// 新增完成後導回首頁
    .catch(error => console.log(error))
})








app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})

