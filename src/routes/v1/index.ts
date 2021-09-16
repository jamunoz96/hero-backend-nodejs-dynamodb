import express from 'express';
import hero from "./hero"

const router = express.Router();

router.use('/hero', hero);

export default router;
