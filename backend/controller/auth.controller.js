const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AuthModel } = require("../model/auth.model");

exports.register = async (req, res) => {
  let { email, password } = req.body;
  let check = await AuthModel.find({ email });
  if (check.length > 0) {
    res.status(401).send({
      msg: "User Already Exists! Try logging with a different Credentials",
    });
  } else {
    try {
      bcrypt.hash(password, 6, async (err, securedPassword) => {
        if (err) {
          console.log(err);
          res.send({ msg: "Something went Wrong", err });
        } else {
          let user = new AuthModel({
            email,
            password: securedPassword,
          });
          await user.save();
          res.send({ msg: "Account Created Successfully!" });
        }
      });
    } catch (err) {
      res.send({ msg: "Something Went wrong while creating account.", err });
    }
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!req.body.email) {
    return res
      .status(400)
      .send({ error: "Credentials are missing from the request body" });
  }

  let user = await AuthModel.find({ email });

  if (user.length > 0) {
    try {
      const match = await bcrypt.compare(password, user[0].password);
      if (match) {
        const token = jwt.sign(
          { email, password, userId: user[0]._id },
          "secret"
        );
        res.send({ msg: "Login Successfull", token });
      } else {
        res.send({ msg: "Invalid Password" });
      }
    } catch (err) {
      res.status(500).send({ msg: "Something went wrong", err });
    }
  } else {
    res.status(401).send({ msg: "User not Found" });
  }
};
