// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'grocery-p8jhe'
})

// 云函数入口函数
exports.main = async(event, context) => {
  let databaseID = event.databaseID
  return cloud.database().collection("home_public").doc(databaseID).get({
    success(res) {
      return res
    },
    fail(res){
      return res
    }
  })
}