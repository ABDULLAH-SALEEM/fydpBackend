const mongoose = require("mongoose");
mongoose.Promise = Promise;
const mongoosePaginate = require("mongoose-paginate-v2");
const db = mongoose.Connection;

let isConnected;

const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: false
};

const mongoosePaginateOptions = {
  customLabels: {
    docs: "rows",
    limit: "pageSize",
    page: "pageIndex"
  }
};

mongoosePaginate.paginate.options = mongoosePaginateOptions;


mongoose.connection.on("connected", function () {
  console.log("Mongoose successfully connected");
  isConnected = true;
  
});

mongoose.connection.on("error", function (err) {
  console.log(err);
});

mongoose.connection.on("disconnected", function () {
  console.log("disconnected");
});


process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});

try {
  mongoose.connect(process.env.MONGODB_URI, dbOption);
} catch (err) {
  console.log("err-->>>>", err);
}

