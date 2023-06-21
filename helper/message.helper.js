const { UserModel } = require("../models/user")

async function decrementTokens(id,tokens){
    const findUser = await UserModel.findOne({ _id: id })
    let decTokens = findUser.tokens - tokens
    let burnTokens=findUser.burnTokens+tokens
    if(decTokens<0){
        decTokens=0
    }
    await UserModel.findOneAndUpdate({ _id: id }, { tokens: decTokens ,burnTokens},{new:true})
}

module.exports=decrementTokens