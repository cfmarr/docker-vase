const express = require('express');
const router = express.Router();
const Mote = require('../models/Mote');

//Add a Mote
router.post('/', async (req, res) => {
  const mote = new Mote({
    moteId: req.body.moteId,
    roomId: req.body.roomId,
    siteId: req.body.siteId,
    statusId: req.body.statusId,
  });

  try {
    const savedMote = await mote.save();
    res.status(201).json({
      message: `moteId: ${mote.moteId} (${mote._id}) has been added`,
      mote: savedMote,
    });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
});

//Delete a specific Mote
router.delete('/:id', async (req, res) => {
  try {
    const mote = await Mote.findById(req.params.id);
    if (mote) {
      try {
        await Mote.deleteOne({ _id: req.params.id });
        res.json({
          message: `moteId: ${mote.moteId} (${req.params.id}) has been deleted`,
          mote: mote,
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(404).json({
        message: `The mote you are trying to delete does not exist`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `${req.params.id} is not a valid mote _id` });
  }
});

//Get a specific Mote
router.get('/:id', async (req, res) => {
  try {
    const mote = await Mote.findById(req.params.id);
    if (mote) {
      try {
        res.json({
          message: `moteId: ${mote.moteId} (${req.params.id}) has been found`,
          mote: mote,
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(404).json({
        message: `The mote you are trying to get does not exist`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `${req.params.id} is not a valid mote _id` });
  }
});

//Update a Mote Status
router.patch('/:id', async (req, res) => {
  try {
    const mote = await Mote.findById(req.params.id);
    if (mote) {
      try {
        await Mote.updateOne(
          { _id: req.params.id },
          { $set: { statusId: req.body.statusId } }
        );
        const updatedMote = await Mote.findById(req.params.id);
        res.json({
          message: `moteId: ${mote.moteId} (${req.params.id}) status is now ${req.body.statusId}`,
          mote: updatedMote,
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(404).json({
        message: `The mote you are trying to update does not exist`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `${req.params.id} is not a valid mote _id` });
  }
});

//Get all the Motes
router.get('/', async (req, res) => {
  try {
    const motes = await Mote.find();
    res.status(200).json({
      message: `There are ${motes.length} motes`,
      motes: motes,
    });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
});

module.exports = router;
