


const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const TokenSchema = new Schema(
  {
    token: {type: Types.Number},
    price: {type: Types.Number},    
  
  },
  {
    timestamps: true,
  }
);


TokenSchema.plugin(mongoosePaginate);

module.exports = {
  TokenModel: model(MODEL_NAME.TOKEN, TokenSchema),
};
