import express from 'express'
import addressController from '../controllers/addressControllers.js'
import auth from '../middlewares/authmiddleware.js'

const router = express.Router()

router.post("/add-address", auth, addressController.addAddress)
router.get("/all-addresses", auth, addressController.getAllAddresses)
router.get("/:id", auth, addressController.getAddress)
router.patch("/:id", auth, addressController.updateAddress)
router.delete("/:id", auth, addressController.deleteAddress)

export default router