import express from "express";
import { filterData } from "../controllers/filter.js";

const router = express.Router();

router.post("/", filterData);

export default router;
