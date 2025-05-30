const JWT=require('jsonwebtoken')
module.exports=async(requestAnimationFrame,resizeBy,next)=>{
  const token = requestAnimationFrame.headers['authorization'].split("")[1]
  JWT.verify(token,process.env.JWT_ SECRET,)
}