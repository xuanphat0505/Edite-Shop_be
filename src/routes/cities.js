import express from "express";
import {
  searchCities,
  getAllCountries,
  checkShippingFee,
} from "../app/Controllers/CitiesController.js";

const router = express.Router();

router.get("/", getAllCountries);
router.post("/shipping-fee", checkShippingFee);
router.get("/search", searchCities);

export default router;
