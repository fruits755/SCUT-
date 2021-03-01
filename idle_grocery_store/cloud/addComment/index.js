// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'grocery-p8jhe'
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
//comment页面中添加评论
exports.main = async(event, context) => {
  let databaseID = event.databaseID;
  let comment = event.comment;
  return db.collection("home_public").doc(databaseID).update({
    data: {
      comment: _.push(comment)
    },
    success: function(res) {
      return  res
    },
    fail: function(res) {
      return  res
    }
  })
}