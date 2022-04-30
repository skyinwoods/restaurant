// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const Rest = require('./models/restaurant') //載入 restaurant  model
const exphbs = require('express-handlebars') // require express-handlebars here

const methodOverride = require('method-override')// 載入 method-override
const routes = require('./routes')// 引用路由器
// 如果在 Heroku 環境
const PORT = process.env.PORT || 3000

require('./config/mongoose')

//body-parser
app.use(express.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
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


app.listen(PORT, () => {
  console.log(`Express is listening on localhost: ${PORT}`)
})

