// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'grocery-p8jhe'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let value=event.value
  return cloud.database().collection('home_public').where({
    //使用正则查询，实现对搜索的模糊查询
    question: cloud.database().RegExp({
      regexp: value,
      //从搜索栏中获取的value作为规则进行匹配。
      options: 'i',
      //大小写不区分
    })
  }).get({
    success: res => {
      return res
    }
  })
}