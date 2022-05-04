// 引用 Express 和 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組
const home = require('./modules/home')
router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home 模組

// 引入 rests 模組程式碼
const rests = require('./modules/rests')
// 將網址結構符合 /restaurant 字串開頭的 request 導向 restaurant 模組
router.use('/restaurants', rests)

// 匯出路由器
module.exports = router
