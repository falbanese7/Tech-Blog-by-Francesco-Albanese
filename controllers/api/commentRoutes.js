const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commData = await Comment.findAll({});
    if (commData.length === 0) {
      res.status(404).json({ message: 'No comments to show.' });
      return;
    }
    res.status(200).json(commData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commData = await Comment.findOne({
      where: { id: req.params.id },
    });
    if (commData.length === 0) {
      res.status(404).json({ message: 'Comment does not exist' });
      return;
    }
    res.status(200).json(commData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    try {
      const newComm = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      });
      res.status(200).json(newComm);
    } catch (e) {
      res.status(400).json(e);
    }
  }
});

// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const updatedComm = await Comment.update(
//       {
//         comment_text: req.body.comment_text,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       },
//     );
//     if (!updatedComm) {
//       res.status(404).json({ message: 'Comment not found!' });
//       return;
//     }

//     res.status(200).json(updatedComm);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commData) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    res.status(200).json(commData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;