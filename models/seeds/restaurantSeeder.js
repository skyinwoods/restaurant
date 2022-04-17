
const resList = require('../../restaurant.json')
const Rest = require('../restaurant') //載入 restaurant  model
const db = require('../../config/mongoose')


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

