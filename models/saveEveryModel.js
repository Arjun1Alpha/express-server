import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    data: Object
});

const DataModel = mongoose.model('Data', dataSchema);
export default DataModel;
