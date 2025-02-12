// Sample inventory data - replace with actual data from your backend
let inventoryData = [
    { sku: 'PF001', name: 'Premium Dog Food', category: 'food', quantity: 50, price: 29.99, reorderPoint: 20 },
    { sku: 'TY001', name: 'Squeaky Bone', category: 'toys', quantity: 15, price: 9.99, reorderPoint: 10 }
];

// Sort functionality
function sortTable(column) {
    inventoryData.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
    });
    renderInventoryTable();
}

// Quick edit functionality
function enableQuickEdit(cell, sku, field) {
    const originalValue = cell.textContent;
    const input = document.createElement('input');
    input.type = field === 'price' ? 'number' : 'text';
    input.value = originalValue;
    
    input.onblur = () => {
        const newValue = input.value;
        cell.textContent = newValue;
        updateInventoryItem(sku, field, newValue);
    };

    cell.textContent = '';
    cell.appendChild(input);
    input.focus();
}

// Update inventory item
function updateInventoryItem(sku, field, value) {
    const item = inventoryData.find(item => item.sku === sku);
    if (item) {
        item[field] = value;
        checkLowStock(item);
    }
}

// Low stock alert
function checkLowStock(item) {
    if (item.quantity <= item.reorderPoint) {
        showAlert(`Low stock alert: ${item.name} (${item.quantity} remaining)`);
    }
}

// Show alert
function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Search functionality
document.getElementById('inventory-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = inventoryData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.sku.toLowerCase().includes(searchTerm)
    );
    renderInventoryTable(filteredData);
});

// Category filter
document.getElementById('category-filter').addEventListener('change', (e) => {
    const category = e.target.value;
    const filteredData = category 
        ? inventoryData.filter(item => item.category === category)
        : inventoryData;
    renderInventoryTable(filteredData);
});

// Render table
function renderInventoryTable(data = inventoryData) {
    const tbody = document.querySelector('.inventory-table tbody');
    tbody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sku}</td>
            <td ondblclick="enableQuickEdit(this, '${item.sku}', 'name')">${item.name}</td>
            <td>${item.category}</td>
            <td ondblclick="enableQuickEdit(this, '${item.sku}', 'quantity')">${item.quantity}</td>
            <td ondblclick="enableQuickEdit(this, '${item.sku}', 'price')">$${item.price}</td>
            <td>
                <button onclick="editItem('${item.sku}')">Edit</button>
                <button onclick="deleteItem('${item.sku}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize table
document.addEventListener('DOMContentLoaded', () => {
    renderInventoryTable();
});
