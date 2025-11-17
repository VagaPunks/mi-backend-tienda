import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productsController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);   // <-- NECESARIO PARA EDITAR
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
