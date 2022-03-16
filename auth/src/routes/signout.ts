import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.cookie('jwt', undefined, { httpOnly: true });

  res.send({});
});

export { router as signoutRouter };
