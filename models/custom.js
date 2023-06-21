const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { MODEL_NAME } = require("#constants/ModelNameEnum");

const { Types } = Schema;

const customSchema = new Schema(
    {
        firstName: { type: Types.String },
        lastName: { type: Types.String },
        jobTitle: { type: Types.String },
        companyName: { type: Types.String },
        companyWebsite: { type: Types.String },
        businessEmail: { type: Types.String },
        numberOfEmployees: { type: Types.String },
        numberOfUsers: { type: Types.String },
        packageType: { type: Types.String },
        description: { type: Types.String },
        status: { type: Types.Boolean,default:false }

    },
    {
        timestamps: true,
      }
);

customSchema.plugin(mongoosePaginate);

module.exports = {
    CustomModel: model(MODEL_NAME.CUSTOM, customSchema)
};
