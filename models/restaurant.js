// 定義 schema

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restSchema = new Schema({
  id:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  name:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  name_en:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  category:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  image:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  location:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  phone:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  google_map:{
    type: String, // 型別是字串
    required: true // 必填欄位
  },
  rating:{
    type: Number, // 型別是數字
    required: true // 必填欄位
  },
  description:{
    type: String, // 型別是字串
    required: true // 必填欄位
  }
})
module.exports = mongoose.model('Rest', restSchema)