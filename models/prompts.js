
const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const PromptSchema = new Schema(
  {
    category: {en:{ type: Types.String },fr:{ type: Types.String }},
    title: {en:{ type: [Types.String] },fr:{ type: [Types.String] }},
    prompt: {en:{ type: [Types.String] },fr:{ type: [Types.String] }},
    priorityPrompt:{type: [Types.Number]},
    priority:{type:Types.Number}

  },
  {
    timestamps: true,
  }
);

PromptSchema.plugin(mongoosePaginate);

module.exports = {
  PromptModel: model(MODEL_NAME.PROMPT, PromptSchema),
};
