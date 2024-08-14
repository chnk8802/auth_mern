import Address from "../models/addressModel.js";

const addAddress = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.addressLine1) {
      throw next(new Error("Missing mandatory fields"));
    }
    const newAddress = new Address(payload);
    await newAddress.save();
    res.status(201).json({
      status: "Success",
      data: newAddress,
      message: "Address created successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
const getAllAddresses = async (req, res, next) => {
  try {
    let { page, pageSize } = req.query;

    const totalRecords = await Address.countDocuments({});
    const addresses = await Address.find({})
      .select("-__v")
      .limit(pageSize)
      .skip(page * pageSize);
    res.status(201).json({
      status: "Success",
      totalRecords: totalRecords,
      dataCount: addresses.length,
      data: addresses,
      message: "Addresses fetched successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
const getAddress = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);
    if (!address) {
      throw next(new Error("No address found"));
    }
    res.status(200).json({
      status: "Success",
      data: address,
      message: "Addresses fetched successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
const updateAddress = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const addressData = req.body;

    const address = await Address.findById(addressId);
    if (!address) {
      throw next(new Error("No address found"));
    }
    await Address.updateOne({ _id: addressId }, addressData, {
      runValidators: true,
    });

    res.status(200).json({
      status: "Success",
      data: [],
      message: "Address updated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
const deleteAddress = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);
    if (!address) {
      throw new next(Error("No address found"));
    }
    await Address.deleteOne({ _id: addressId });
    res.status(200).json({
      status: "Success",
      data: [],
      message: "Address deleted successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addAddress,
  getAllAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
