const express = require('express');
const router = express.Router();
const Mote = require('../models/Mote');

//Get all the Motes
router.get('/', async (req, res) => {
  try {
    const motes = await Mote.find();
    res.json(motes);
  } catch (err) {
    res.json({ message: err });
  }
});

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
    res.json(savedMote);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a specific Mote
router.get('/:postId', async (req, res) => {
  try {
    const mote = await Mote.findById(req.params.postId);
    res.json(mote);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a specific Mote
router.delete('/:postId', async (req, res) => {
  try {
    const removedMote = await Mote.remove({ _id: req.params.postId });
    res.json({ message: `Mote ${req.params.postId} has been removed` });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Mote
router.patch('/:postId', async (req, res) => {
  try {
    const updatedMote = await Mote.updateOne(
      { _id: req.params.postId },
      { $set: { roomId: req.body.roomId } }
    );
    res.json(updatedMote);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
