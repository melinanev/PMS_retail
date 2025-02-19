import React, { useState, useEffect } from "react";
import '../styles/Inventory.css';


type InventoryItem = {
    sku: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    reorderPoint: number;
};

const initialInventory: InventoryItem[] = [
    { sku: "PF001", name: "Premium Dog Food", category: "food", quantity: 50, price: 29.99, reorderPoint: 20 },
    { sku: "TY001", name: "Squeaky Bone", category: "toys", quantity: 15, price: 9.99, reorderPoint: 10 }
];

const Inventory: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

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

    const updateInventoryItem = (sku: string, field: keyof InventoryItem, value: string | number) => {
        const updatedInventory = inventory.map((item) =>
            item.sku === sku ? { ...item, [field]: value } : item
        );
        setInventory(updatedInventory);
    };

    const checkLowStock = (item: InventoryItem) => {
        if (item.quantity <= item.reorderPoint) {
            setAlertMessage(`Low stock alert: ${item.name} (${item.quantity} remaining)`);
        }
    };

    const filteredInventory = inventory.filter(
        (item) =>
            (categoryFilter ? item.category === categoryFilter : true) &&
            (searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );

    return (
        <div>
            <nav>
                <button>Add New Item</button>
                <button>Bulk Import</button>
                <button>Export Data</button>
            </nav>
            <section>
                <input type="text" placeholder="Search inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                            <tr key={item.sku}>
                                <td>{item.sku}</td>
                                <td contentEditable onBlur={(e) => updateInventoryItem(item.sku, "name", e.target.innerText)}>{item.name}</td>
                                <td>{item.category}</td>
                                <td contentEditable onBlur={(e) => updateInventoryItem(item.sku, "quantity", Number(e.target.innerText))}>{item.quantity}</td>
                                <td contentEditable onBlur={(e) => updateInventoryItem(item.sku, "price", Number(e.target.innerText))}>${item.price}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
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
