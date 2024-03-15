import mongoose from "mongoose";

const fieldSubmissionSchema = new mongoose.Schema({
  name: String,
  field_type: String,
  help_text: String,
  required: Boolean,
  choices: [String],
  visible: Boolean,
  value: String,
});

const attendeeSchema = new mongoose.Schema({
  id: Number,
  type: String,
  created_at: Date,
  email: String,
  first_name: String,
  last_name: String,
  timezone: String,
  status: String,
  external_id: String,
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  utm_content: String,
  utm_term: String,
  cancel_url: String,
  reschedule_url: String,
  conference_url: String,
  field_submissions: [fieldSubmissionSchema],
});

const hostSchema = new mongoose.Schema({
  id: Number,
  type: String,
  created_at: Date,
  email: String,
  first_name: String,
  last_name: String,
  timezone: String,
  status: String,
  external_id: String,
  cancel_url: String,
  reschedule_url: String,
  conference_url: String,
});

const mettingSchema = new mongoose.Schema({
  created_at: Date,
  name: String,
  location: String,
  location_type: String,
  start: Date,
  end: Date,
  approved: Boolean,
  confirmed: Boolean,
  cancelled: Boolean,
  conference_password: String,
  conference_url: String,
 
});

const mainSchema = new mongoose.Schema(
  {
    message: Array,
    metadata: Array,
    meeting: mettingSchema,
    attendee: attendeeSchema,
    host: hostSchema,
  }
);

const dataSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  status: String,
  data: mainSchema,
});

const DataModel = mongoose.model("Data", dataSchema);

export default DataModel;
