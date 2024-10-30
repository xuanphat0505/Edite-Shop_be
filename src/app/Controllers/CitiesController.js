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

export const getAllCountry = async (req, res) => {
  try {
    const countries = await CitiesModel.find();
    const countryList = countries.map((country) => country.country);

    return res.status(200).json({ success: true, data: countryList });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
