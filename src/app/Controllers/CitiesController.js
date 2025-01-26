import CitiesModel from "../Models/CitiesModel.js";

export const searchCities = async (req, res) => {
  const country = req.query.country;
  try {
    const countryExist = await CitiesModel.findOne({
      country: { $regex: new RegExp(country, "i") },
    });
    if (!countryExist) {
      return res
        .status(400)
        .json({ success: false, message: "The country not found" });
    }
    return res.status(200).json({ success: true, data: countryExist.cities });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await CitiesModel.find();

    return res.status(200).json({ success: true, data: countries });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const checkShippingFee = async (req, res) => {
  const { country, postalCode } = req.body;
  try {
    if (!postalCode || !country) {
      return res
        .status(400)
        .json({ message: "Postal code and country are required." });
    }
    const countryData = await CitiesModel.findOne({ country });
    if (!countryData) {
      return res
        .status(400)
        .json({ success: false, message: "The country not found" });
    }
    const cityData = countryData.cities.find(
      (city) => city.zipCode === postalCode
    );
    if (!cityData) {
      return res.status(404).json({ message: "Postal code does not match any city." });
    }

    return res.status(200).json({
      success: true,
      data: countryData.shippingFees,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
