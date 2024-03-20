// import mongoose from "mongoose";
import DataModel from "../models/saveEveryModel.js";
import sendAll from "../models/saveData.js";

const getAllData = async (req, res) => {
  try {
    const data = req.body;
    const key = req.body?.entity.id;
    const { approved, confirmed, cancelled } = req.body?.entity;
    let status;
    if (cancelled) {
      status = "cancelled";
    } else if (confirmed && approved) {
      status = "confirmed";
    } else {
      status = "pending";
    }
    let existingData = await DataModel.findOne({ key });

    if (existingData) {
      if (typeof existingData.data.message === "string") {
        existingData.data.message = [existingData.data.message];
        existingData.data.metadata = [existingData.data.metadata];
      }
      existingData.data.message.push(data.message);
      existingData.data.metadata.push(data.metadata);
      if (existingData.status !== status) {
        existingData.status = status;
      }
      await existingData.save();

      res.json({ key });
    } else {
      const sendAllInfo = new sendAll({data:req.body})
      await sendAllInfo.save(); 
      if (data.action === "Meeting.scheduled") {
        let attendee = data.entity.attendees.filter(
          (item) => data.entity.host.id != item.id
        );
        let { host, attendees, ...newMeetingData } = data.entity;
        let realData = {
          ...data,
          host: data.entity.host,
          attendee: attendee[0],
          meeting: newMeetingData,
        };
        const newData = new DataModel({ key, status, data: realData });
        await newData.save();
        res.json({ message: "Meeting generated" });
      } else {
        res.json({ message: "Wrong call while creating a meeting" });
      }
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendAllData = async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.json(allData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllData, sendAllData };

// if (data.action == 'Meeting.scheduled' || data.action == 'Meeting.cancelled' || data.action == 'Meeting.rescheduled') {
//     const newData = new DataModel({ key, data });
//     await newData.save();
//     res.json({ key });
// }
