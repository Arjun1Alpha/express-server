// import mongoose from "mongoose";
import DataModel from "../models/saveEveryModel.js";


const getAllData = async (req, res) => {
    try {
        const key = Date.now().toString();
        const data = req.body;
        const newData = new DataModel({ key, data });
        await newData.save();
        res.json({ key });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const sendAllData = async (req, res) => {
    try {
        const allData = await DataModel.find();
        res.json(allData);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getAllData,
    sendAllData
} ;