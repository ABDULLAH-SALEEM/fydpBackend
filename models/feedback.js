


const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const FeedbackSchema = new Schema(
  {
    name: {type: Types.String},
    email: {type: Types.String},    
    issue: {type: Types.String},    
    description: {type: Types.String},
    status: {type: Types.Boolean},    
    

  },
  {
    timestamps: true,
  }
);


FeedbackSchema.plugin(mongoosePaginate);

module.exports = {
  FeedbackModel: model(MODEL_NAME.FEEDBACK, FeedbackSchema),
};
