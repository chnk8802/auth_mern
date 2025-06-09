import Supplier from "../models/supplierModel.js";
import response from "../utils/response.js";

const createSupplier = async (req, res, next) => {
  try {
    const { fullName, phone, address } = req.body;
    const supplier = new Supplier({
      fullName,
      phone,
      address,
    });
    let savedSupplier = await supplier.save();
    if (!savedSupplier) {
      res.status(400);
      throw new Error("Failed to create supplier");
    }
    savedSupplier = {
      _id: savedSupplier._id,
      supplierCode: savedSupplier.supplierCode,
      fullName: savedSupplier.fullName,
      phone: savedSupplier.phone,
      address: savedSupplier.address,
      createdAt: savedSupplier.createdAt,
      updatedAt: savedSupplier.updatedAt,
    };

    response(res, savedSupplier, "Supplier created successfully");
  } catch (error) {
    next(error);
  }
};

const getSuppliers = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 }, // Sort by creation date, newest first
    };

    const suppliers = await Supplier.find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.sort);
    if (!suppliers || suppliers.length === 0) {
      res.status(404);
      throw new Error("No suppliers found");
    }

    const totalSuppliers = await Supplier.countDocuments();
    response(res, suppliers, "Suppliers retrieved successfully", {
      pagination: {
        page: paginationOptions.page,
        pageSize: paginationOptions.limit,
        totalCount: totalSuppliers,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      res.status(404);
      throw new Error("Supplier not found");
    }
    response(res, supplier, "Supplier retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, phone, address } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { fullName, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      res.status(404);
      throw new Error("Supplier not found");
    }

    response(
      res,
      updatedSupplier,
      "Supplier updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      res.status(404);
      throw new Error("Supplier not found");
    }
    deletedSupplier = {
      _id: deletedSupplier._id,
      supplierCode: deletedSupplier.supplierCode,
    };
    response(
      res,
      deletedSupplier,
      "Supplier deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
