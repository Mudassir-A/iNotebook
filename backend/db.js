const mongoose = require("mongoose");

const mongoURI =
	"mongodb://0.0.0.0:27017/inotebook?readPreference=primary&directConnection=true";

const connectToMongo = () => {
	mongoose.connect(mongoURI);
    console.log("Connected to Mongo");
};

module.exports = connectToMongo;

