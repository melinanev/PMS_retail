import React, { useState, useEffect } from "react";
import { fetchProducts, updateProduct, deleteProduct } from "../api/InventoryAPI.js"; 

type InventoryItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  sku: string;
  category: string;
  quantity: number;
  reorderPoint: number;
};

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Fetch inventory from the backend when the component mounts
  useEffect(() => {
    const loadInventory = async () => {
      try {
        const products = await fetchProducts();
        setInventory(products);
      } catch (error) {
        console.error("Error loading inventory:", error);
      }
    };
    loadInventory();
  }, []);

  // Show alert message for a limited time
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const sortTable = (key: keyof InventoryItem) => {
    const sortedInventory = [...inventory].sort((a, b) => (a[key] < b[key] ? -1 : 1));
    setInventory(sortedInventory);
  };

  const updateInventoryItem = async (id: number, field: keyof InventoryItem, value: string | number) => {
    try {
      // Find the current product to retain unchanged fields
      const currentProduct = inventory.find(item => item.id === id);
      if (!currentProduct) return;

      // Create an updated object with the current value for unchanged fields
      const updatedProduct = {
        id,
        name: field === "name" ? (value as string) : currentProduct.name,
        price: field === "price" ? (value as number) : currentProduct.price,
        image: field === "image" ? (value as string) : currentProduct.image,
        sku: currentProduct.sku,
        category: currentProduct.category,
        quantity: currentProduct.quantity,
        reorderPoint: currentProduct.reorderPoint,
      };

      // Call updateProduct with the updated fields
      await updateProduct(id.toString(), updatedProduct);
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === updatedProduct.id ? updatedProduct : item
        )
      );
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id.toString());
      setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  const filteredInventory = inventory.filter(
    (item) =>
      (categoryFilter ? item.category === categoryFilter : true) &&
      (searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  return (
    <div>
      <nav>
        <button>Add New Item</button>
        <button>Bulk Import</button>
        <button>Export Data</button>
      </nav>
      <section>
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="food">Pet Food</option>
          <option value="toys">Toys</option>
          <option value="supplies">Supplies</option>
          <option value="accessories">Accessories</option>
        </select>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th onClick={() => sortTable("sku")}>SKU</th>
              <th onClick={() => sortTable("name")}>Item Name</th>
              <th>Category</th>
              <th onClick={() => sortTable("quantity")}>Quantity</th>
              <th onClick={() => sortTable("price")}>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>{item.sku}</td>
                <td contentEditable onBlur={(e) => updateInventoryItem(item.id, "name", e.target.innerText)}>
                  {item.name}
                </td>
                <td>{item.category}</td>
                <td contentEditable onBlur={(e) => updateInventoryItem(item.id, "quantity", Number(e.target.innerText))}>
                  {item.quantity}
                </td>
                <td contentEditable onBlur={(e) => updateInventoryItem(item.id, "price", Number(e.target.innerText))}>
                  ${item.price}
                </td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Inventory;
