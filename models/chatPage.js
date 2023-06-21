const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const ChatPageSchema = new Schema(
  {
    title: { en:{type: Types.String},fr:{type: Types.String} },
    description: { en:{type: Types.String},fr:{type: Types.String} },
    categoryTitle: { en:{type: Types.String},fr:{type: Types.String} },
    promptTitle: { en:{type: Types.String},fr:{type: Types.String} },


  },
  {
    timestamps: true,
  }
);


ChatPageSchema.plugin(mongoosePaginate);

module.exports = {
  ChatPageModel: model(MODEL_NAME.CHATPAGE, ChatPageSchema),
};
