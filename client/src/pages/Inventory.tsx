import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct, updateProduct, createProduct } from "../api/InventoryAPI";
import "../styles/Inventory.css";

type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  reorderPoint: number;
  category: string;
  image?: string | null;
};

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);
  const [addingProduct, setAddingProduct] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Partial<InventoryItem>>({
    name: "",
    price: 0,
    quantity: 0,
    category: "",
    description: "",
    sku: "",
    image: null,
    reorderPoint: 0,
  });

  
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getProducts();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  
  const filteredInventory = inventory.filter(
    (item) =>
      (categoryFilter ? item.category === categoryFilter : true) &&
      (searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id));
      setAlertMessage("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      setAlertMessage("Error deleting product");
    }
  };


  const handleEdit = (item: InventoryItem) => {
    setEditingProduct({ ...item });
  };

  
  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.price || !editingProduct.quantity) {
      setAlertMessage("Please fill out all required fields.");
      return;
    }

    try {
      const updatedProduct = await updateProduct(editingProduct.id, {
        sku: editingProduct.sku,
        name: editingProduct.name,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        category: editingProduct.category,
        description: editingProduct.description,
        image: editingProduct.image || null,
      });

      if (updatedProduct) {
        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.id === editingProduct.id ? editingProduct : item
          )
        );
        setEditingProduct(null);
        setAlertMessage("Product updated successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setAlertMessage("Error updating product");
    }
  };

  // Handle field changes in the edit form
  const handleFieldChange = (field: keyof InventoryItem, value: string | number) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value,
      });
    }
  };

  
  const handleAddProduct = async () => {
    
    console.log("New Product Data:", newProduct);

    
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.quantity ||
      !newProduct.category ||
      !newProduct.description ||
      !newProduct.sku
    ) {
      setAlertMessage("Please fill out all required fields.");
      return;
    }

    try {
      
      const addedProduct = await createProduct({
        sku: newProduct.sku,
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
        category: newProduct.category,
        description: newProduct.description,
      });

      
      setInventory((prevInventory) => [...prevInventory, addedProduct]);

      
      setNewProduct({
        name: "",
        price: 0,
        quantity: 0,
        category: "",
        description: "",
        sku: "",
        image: null,
        reorderPoint: 0,
      });
      setAddingProduct(false); 
      setAlertMessage("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      setAlertMessage("Error adding product");
    }
  };

  return (
    <div className="layout-container">
      <main className="main-content">
        <div className="inventory">
          <h1>Inventory Management</h1>
          <div className="inventory-controls">
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
            <button onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}>
              {viewMode === "table" ? "Grid View" : "Table View"}
            </button>
            <button
              onClick={() => {
                console.log("Add Product button clicked"); 
                setAddingProduct(true);
              }}
              style={{
                backgroundColor: "#3498db",
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Product
            </button>
          </div>

          {alertMessage && <div className="alert">{alertMessage}</div>}

          {viewMode === "table" ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id}> 
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>${(Number(item.price) || 0).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid-container">
              {filteredInventory.map((item) => (
                <div key={item.id} className="grid-item"> 
                  <h3>{item.name}</h3>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ${(Number(item.price) || 0).toFixed(2)}</p>
                  <div>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {editingProduct && (
            <div className="edit-form">
              <h3>Edit Product</h3>
              <div>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => handleFieldChange("price", parseFloat(e.target.value))}
                  placeholder="Price"
                />
              </div>
              <div>
                <select
                  value={editingProduct.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                >
                  <option value="food">Food</option>
                  <option value="toys">Toys</option>
                  <option value="supplies">Supplies</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  value={editingProduct.quantity}
                  onChange={(e) => handleFieldChange("quantity", parseInt(e.target.value))}
                  placeholder="Quantity"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={editingProduct.reorderPoint}
                  onChange={(e) => handleFieldChange("reorderPoint", parseInt(e.target.value))}
                  placeholder="Reorder Point"
                />
              </div>
              <div>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={editingProduct.sku}
                  onChange={(e) => handleFieldChange("sku", e.target.value)}
                  placeholder="SKU"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={editingProduct.image || ""}
                  onChange={(e) => handleFieldChange("image", e.target.value)}
                  placeholder="Image URL (optional)"
                />
              </div>
              <div>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Add Product Form */}
          {addingProduct && (
            <div className="edit-form">
              <h3>Add New Product</h3>
              <div>
                <input
                  type="text"
                  value={newProduct.name || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={newProduct.price || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  placeholder="Price"
                />
              </div>
              <div>
                <select
                  value={newProduct.category || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="toys">Toys</option>
                  <option value="supplies">Supplies</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  value={newProduct.quantity || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="Quantity"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={newProduct.reorderPoint || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, reorderPoint: parseInt(e.target.value) || 0 })}
                  placeholder="Reorder Point"
                />
              </div>
              <div>
                <textarea
                  value={newProduct.description || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Description"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newProduct.sku || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  placeholder="SKU"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newProduct.image || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="Image URL (optional)"
                />
              </div>
              <div>
                <button onClick={handleAddProduct}>Save</button>
                <button onClick={() => setAddingProduct(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Inventory;