// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'grocery-p8jhe'
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  if(event.type=='all'){
    try{
      return  cloud.database().collection("goods_list").where({
        page:event.page
      }).get()
    }catch(e){
      console.error(e)
    }
  }
  try{
    return  cloud.database().collection("goods_list").where({
      type:event.type,
      page:event.page
    }).get()
  }catch(e){
    console.error(e)
  }
  
}