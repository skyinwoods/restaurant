const mongoose = require('mongoose') // 載入 mongoose
const resList = require('/Users/Chi/AC_2-3/restaurant/restaurant.json')
const Rest = require('../restaurant') //載入 restaurant  model
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
  console.log(resList)

  resList.results.forEach(element => Rest.create({
    id: element.id,
    name: element.name,
    name_en: element.name_en,
    category: element.category,
    image: element.image,
    location: element.location,
    phone: element.phone,
    google_map: element.google_map,
    rating: element.rating,
    description: element.description
  }))
  

  console.log('done')
})

