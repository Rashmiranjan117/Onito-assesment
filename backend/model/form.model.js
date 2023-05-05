const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    email: { type: String, required: false , default:"" },
    age: { type: Number, required: true },
    phoneNumber: { type: Number, required: false },
    name: { type: String, required: true, default:"" },
    gender: { type: String, required: true, default:"" },
    idType: { type: String, required: false , default:""},
    govtId: { type: String, required: false , default:""},
    guardianName: { type: String, required: false , default:""},
    guardianEmail: { type: String, required: false , default:""},
    emergencyNumber: { type: String, required: false },
    address: { type: String, required: false, default:"" },
    state: { type: String, required: false , default:""},
    city: { type: String, required: false, default:"" },
    country: { type: String, required: false, default:"" },
    pincode: { type: Number, required: false },
    occupation: { type: String, required: false , default:""},
    religion: { type: String, required: false, default:"" },
    martialStatus: { type: String, required: false , default:""},
    bloodGroup: { type: String, required: false, default:"" },
    nationality: { type: String, required: false, default:"" },
    createdAt: {
      type: String,
      default: () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
  },
  { versionKey: false }
);

const FormModel = mongoose.model("form", formSchema);

module.exports = { FormModel };
