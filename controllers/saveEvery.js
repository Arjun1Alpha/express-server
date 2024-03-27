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
    const sendAllInfo = new sendAll({ data: req.body });
    await sendAllInfo.save();
    let newUpdateData = {};

    if (existingData) {
      if (data.action === "Meeting.rescheduled" || data.action === "Meeting.cancelled" || data.action === "Meeting.declined" || data.action === "Meeting.approved") {
        newUpdateData = {
          created_at: data?.created_at,
          message: data?.message,
          previous_start: data.metadata?.previous_start,
          previous_end: data.metadata?.previous_end,
          latest_start: data?.entity.start,
          latest_end: data?.entity.end,
        };
        let { host, attendees, ...newMeetingData } = data.entity;

        existingData.data.meeting = newMeetingData;
        existingData.data.updates.push(newUpdateData);
        if (existingData.status !== status) {
          existingData.status = status;
        }
        await existingData.save();

        res.json({ key });
      } 
    } else {
      if (data.action === "Meeting.scheduled") {
        let attendee = data.entity.attendees.filter(
          (item) => data.entity.host.id != item.id
        );
        let { host, attendees, ...newMeetingData } = data.entity;
        let realData = {
          updates: [],
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
