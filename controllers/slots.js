require("dotenv").config();
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");


// API for booking slot

const bookSlot = async (req, res) => {
  const { id, warden_id,date, day, time, duration } = req.body;

  const user = await User.findOne({ id: id });
  const warden = await User.findOne({ id: warden_id });
  if (user && warden) {
    await user.slots.bookedByMe.push({
      warden_id: warden_id,
      date,
      day,
      time,
      duration
    });
    await user.save();
    await warden.slots.bookedByOther.push({
      warden_id: id,
      date,
      day,
      time,
      duration
    });
    await warden.save();
    res.status(200).json({ msg: "Slot booked Successfully!", data: user });
  } else {
    res.status(200).json({ msg: "Not User" });
  }
};



// API for getting all slots data

const allSlot = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ id: id });
    if (user) {
      return res.status(200).json({ data: user.slots.bookedByOther });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};


// API for getting pending slots

const pendingSlot = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ id: id });
    if (user) {
      const now = Date.now();
      // const dates = new Date();
      console.log("now",now)
      const pendingSlots = user.slots.bookedByOther.filter(
        (date) => {return new Date(date.date).getTime() > now;}
      );
      return res.status(200).json({ data: pendingSlots });
    } else { 
      return res.status(404).json({ msg: "User not found" });
    }
  } catch(err) {
    console.log(err)
    return res.status(500).json({ msg: "Something went wrong" });
  }
};


module.exports = { bookSlot, allSlot, pendingSlot};
