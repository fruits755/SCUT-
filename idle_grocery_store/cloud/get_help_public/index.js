// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'grocery-p8jhe'
})

// 云函数入口函数
//用在help页面，获取help_public中的信息
exports.main = async (event, context) => {
  return cloud.database().collection("help_public").get({
    success(res) {
      return res
    },
    fail(res) {
      return res
    }
  })
}