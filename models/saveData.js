import mongoose from "mongoose";
const sendData = new mongoose.Schema({
    data:Object
  });

  const sendAll = mongoose.model("sendData", sendData);

export default sendAll;