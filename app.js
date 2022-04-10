// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const resList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', {restaurant: resList.results} )
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = resList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  
  res.render('show', {restaurant:restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = resList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {restaurant: restaurants, keyword : keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})

