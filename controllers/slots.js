require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
// const auth = require("./middleware/auth");

const bookSlot = async (req, res) => {
  const { id, warden_id, day, time, duration, status } = req.body;

  const user = await User.findOne({ _id: id });
  const warden = await User.findOne({ _id: warden_id });
  if (user && warden) {
    await user.slots.bookedByMe.push({
      warden_id: warden_id,
      day,
      time,
      duration,
      status,
    });
    await user.save();
    await warden.slots.bookedByOther.push({
      warden_id: id,
      day,
      time,
      duration,
      status,
    });
    await warden.save();
    res.status(200).json({ msg: "Slot booked Successfully!", data: user });
  } else {
    res.status(200).json({ msg: "Not User" });
  }
};

const allSlot = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).json({ data: user.slots.bookedByOther });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const pendingSlot = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      const pendingSlots= user.slots.bookedByOther.filter((slot)=>slot.status=="Pending")
      return res.status(200).json({ data: pendingSlots });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const completedSlot = async (req, res) => {
  const { id, slot_id } = req.body;
  try {
    const user = await User.findOne({ _id: id });

    if (user) {
      // const slot = user.slots.bookedByOther.findOne({ _id: slot_id });
      const slot = user.slots.bookedByOther;
      const current_slot = slot.filter((slot)=>slot._id==slot_id)
      console.log(current_slot[0].status)
      current_slot[0].status="Completed";
      await user.save();
      // await slot.updateOne({ $set: { status: "Completed" } });
      return res.status(200).json({ msg: "This session is completed" });
    } else {
      return res.status(404).json({ msg: "Slot not found" });
    }
  } catch(err) {
    console.log(err)
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = { bookSlot, allSlot, pendingSlot, completedSlot };
