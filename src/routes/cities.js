import express from "express";
import {
  searchCities,
  getAllCountry,
} from "../app/Controllers/CitiesController.js";

const router = express.Router();

router.get("/", getAllCountry);
router.post("/", searchCities);

export default router;
