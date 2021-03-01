// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'grocery-p8jhe'
})
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('openid是',event.openid)
  return cloud.database().collection("goods_list").where({
      _openid:event.openid
    }).get()
}