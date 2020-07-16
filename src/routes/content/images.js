const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../middleware/upload');
const saveImage = require('../../utils/saveImage');

// Uploading an image
router.post(
  '/',
  [passport.authenticate('jwt', { session: false }), upload.single('image')],
  async (req, res) => {
    try {
      const fileName = await saveImage(req.file);
      res.status(200).send(fileName);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to upload image');
    }
  },
);

// Getting an image
router.get('/:id', (req, res) => {
  res.sendFile(`content/images/${req.params.id}`, { root: appRoot });
});

module.exports = router;
