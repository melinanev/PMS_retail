import { Request, Response } from "express";
import { Product } from "../models/product.js";

interface ProductInterface {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string | null;  
  createdAt: Date;
  updatedAt: Date;
}

interface ProductParams {
  id: string;
}

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.findAll();  
    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

  

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const { sku, name, price, quantity, category, description, image }: 
    { sku: string; name: string; price: number; quantity: number; category: string; description: string; image?: string | null } = req.body;

  if (!sku || !name || !price || !quantity || !category || !description) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const imageUrl: string | null = image ?? null; 

    const newProduct = await Product.create({
      sku,
      name,
      price,
      quantity,
      category,
      description,
      image: imageUrl, 
    });

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in createProduct function:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req: Request<ProductParams>, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const mappedProduct: ProductInterface = {
      id: product.id,
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      image: product.image ?? null, 
      createdAt: product.createdAt ?? new Date(),  
      updatedAt: product.updatedAt ?? new Date(),  
    };

    return res.status(200).json({ success: true, data: mappedProduct });
  } catch (error) {
    console.error("Error in getProduct function", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req: Request<ProductParams>, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { sku, name, price, quantity, category, description, image }: 
    { sku: string; name: string; price: number; quantity: number; category: string; description: string; image?: string | null } = req.body;

  try {
    const [updated] = await Product.update(
      { sku, name, price, quantity, category, description, image: image ?? null }, 
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await Product.findOne({ where: { id } });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const mappedUpdatedProduct: ProductInterface = {
      id: updatedProduct.id,
      sku: updatedProduct.sku,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      category: updatedProduct.category,
      image: updatedProduct.image ?? null, 
      createdAt: updatedProduct.createdAt ?? new Date(),  
      updatedAt: updatedProduct.updatedAt ?? new Date(),  
    };

    return res.status(200).json({ success: true, data: mappedUpdatedProduct });
  } catch (error) {
    console.error("Error in updating product", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request<ProductParams>, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const deleted = await Product.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct function", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
