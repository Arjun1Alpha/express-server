import express from "express";
import {getAllData,sendAllData} from "../controllers/saveEvery.js";

const router = express.Router();

router.post("/:key", getAllData);
router.get("/all-data", sendAllData);


export default router;
