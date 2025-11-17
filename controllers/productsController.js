import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

const collection = () => getDB().collection("products");

// GET - productos con paginación
export async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const products = await collection()
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection().countDocuments();

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
}

// GET /products/:id
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await collection().findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
}

// POST — agregar producto
export async function addProduct(req, res) {
  try {
    const data = req.body;
    const result = await collection().insertOne(data);
    res.json({ insertedId: result.insertedId });

  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
}

// PUT — actualizar producto
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    res.json({ modifiedCount: result.modifiedCount });

  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
}

// DELETE — eliminar producto
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const result = await collection().deleteOne({ _id: new ObjectId(id) });

    res.json({ deletedCount: result.deletedCount });

  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
}
