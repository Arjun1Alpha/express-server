import DataModel from "../models/saveEveryModel.js";

export async function filterData(req, res) {
  const { isAdmin, cancelled, confirmed, approved } = req.query;
  const { email } = req.body;
  try {
    const searchCopy = [];

    if (cancelled === "1") {
      searchCopy.push("cancelled");
    }
    if (confirmed === "1") {
      searchCopy.push("confirmed");
    }
    if (approved === "1") {
      searchCopy.push("approved");
    }

    if (isAdmin === "1") {
      const data = await DataModel.find({ status: { $in: searchCopy } });

      if (data.length > 0) {
        return res.status(200).json({ data });
      } else {
        return res.status(200).json({ message: "No data found" });
      }
    } else {
      const data = await DataModel.find({
        status: { $in: searchCopy },
        "data.attendee.email": email,
      });
      if (data.length > 0) {
        return res.status(200).json({ ...data });
      } else {
        return res.status(200).json({ message: "No data found" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Failed to fetch data" });
  }
}
