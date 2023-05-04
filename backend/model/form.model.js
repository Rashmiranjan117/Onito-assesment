const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    email: { type: String, required: false },
    age: { type: Number, required: true },
    phoneNumber: { type: Number, required: false },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    idType: { type: String, required: false },
    govtId: { type: String, required: false },
    guardianName: { type: String, required: false },
    guardianEmail: { type: String, required: false },
    emergencyNumber: { type: String, required: false },
    address: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    pincode: { type: Number, required: false },
    occupation: { type: String, required: false },
    religion: { type: String, required: false },
    martialStatus: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    nationality: { type: String, required: false },
  },
  { versionKey: false }
);

const FormModel = mongoose.model("form", formSchema);

module.exports = { FormModel };
