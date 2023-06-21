const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const MessageSchema = new Schema(
  {
    userId: { type: Types.String, required: true },
    title:{type:Types.String},
    chatHistory: [
      {
        _id: {
          type: String,
          select: false 
        },
        role: { type: Types.String, enum: ["user", "assistant"] },
        content: { type: Types.String },
      }
    ],
    tokens: { type: Types.Number, default: 0 }

  },
  {
    timestamps: true,
  }
);

MessageSchema.plugin(mongoosePaginate);

module.exports = {
  MessageModel: model(MODEL_NAME.MESSAGES, MessageSchema),
};
