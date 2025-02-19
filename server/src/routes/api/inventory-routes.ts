import express from 'express';
import { Product } from '../../models/product.js';
import { authenticateToken, authorizeManager } from '../../middleware/auth.js';
import axios from 'axios';

const router = express.Router();

// This goes and finds all products (accessible by everyone)
router.get('/', async (_req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error loading products' });
  }
});

// This gets a single product by id (accessible by everyone)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error loading product' });
  }
});

// This creates a new product (only by managers)
router.post('/', authenticateToken, async (req, res) => {
  // Ensure req.user is defined and properly typed
  if (!req.user || req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Permission denied: Only managers can add products' });
  }

  const { name, description, quantity, price } = req.body;

  try {
    const newProduct = await Product.create({ name, description, quantity, price });
   return res.status(201).json(newProduct);
  } catch (error) {
   return res.status(400).json({ message: 'Error creating product' });
  }
});

// This logic handles updating a product's quantity (only accessible by managers)
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Ensure req.user is defined and properly typed
  if (!req.user || req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Permission denied: Only managers can update product' });
  }

  try {
    const product = await Product.findByPk(id);
    if (product) {
      product.quantity = quantity;
      await product.save();
     return res.json(product);
    } else {
     return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
   return res.status(400).json({ message: 'Error updating product' });
  }
})
  router.post('/order', authenticateToken, authorizeManager, async (req, res) => {
    const { productID, quantity } = req.body;

    if (!productID || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    try {
      const response = await axios.post('https://fakestoreapi.com/carts', {
        userID: req.user?.id,
        date: new Date().toISOString(),
        products: [{ productID, quantity }],
      });
     return res.status(201).json({ message: 'Order placed successfully', order: response.data });
    } catch (error) {
     return res.status(500).json({ message: 'Failed to place order' });
    }
  })




export { router as inventoryRouter };
