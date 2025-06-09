import Joi from "joi";

const createSparePartEntry = {
    body: Joi.object().keys({
        partName: Joi.string().required(),
        partNumber: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        supplier: Joi.string().required(),
        purchaseDate: Joi.date().iso().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().allow('', null),
    }),
};

const updateSparePartEntry = {
    body: Joi.object().keys({
        partName: Joi.string(),
        partNumber: Joi.string(),
        quantity: Joi.number().integer().min(1),
        supplier: Joi.string(),
        purchaseDate: Joi.date().iso(),
        price: Joi.number().min(0),
        description: Joi.string().allow('', null),
    }),
};

module.exports = {
    createSparePartEntry,
    updateSparePartEntry,
};