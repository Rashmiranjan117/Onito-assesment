const { FormModel } = require("../model/form.model");

exports.getAll = async (req, res) => {
  try {
    let data = await FormModel.find();
    res.send(data);
  } catch (err) {
    res.send({
      msg: "Something went wrong while fetching data from server",
      err,
    });
  }
};

exports.getOne = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await FormModel.findOne({ _id: id });
    res.send({ data });
  } catch (err) {
    res.send({
      msg: "Something went wrong while fetching data from server",
      err,
    });
  }
};

exports.post = async (req, res) => {
  let data = req.body;
  try {
    let post = new FormModel(data);
    await post.save();
    res.send({ msg: "Post Added Successfully" });
  } catch (err) {
    res.send({
      msg: "Something went wrong while Posting data to server",
      err,
    });
  }
};
