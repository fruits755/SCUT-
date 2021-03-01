// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'grocery-p8jhe'
})
const DB=cloud.database().collection("goods_list")
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.id1,event.visitors)
   return await DB.doc(event.id1).update({
    data:{
      list:{
        visitorNum:event.visitors
      }
    },
    success(res){
      console.log('增加成功',res)
    },
    fail(res){
      console.log('增加失败',res)
    }
  })
}