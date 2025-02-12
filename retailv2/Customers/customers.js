// Sample customer data - replace with actual data from your backend
let customerData = [
    { 
        id: 'C001', 
        name: 'John Doe', 
        email: 'john@example.com', 
        phone: '555-0123', 
        pets: [
            { name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3 },
            { name: 'Luna', type: 'Cat', breed: 'Siamese', age: 2 }
        ],
        lastVisit: '2023-12-15',
        status: 'active'
    }
];

// Sort functionality
function sortTable(column) {
    customerData.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
    });
    renderCustomerTable();
}

// Quick edit functionality
function enableQuickEdit(cell, id, field) {
    const originalValue = cell.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalValue;
    
    input.onblur = () => {
        const newValue = input.value;
        cell.textContent = newValue;
        updateCustomer(id, field, newValue);
    };

    cell.textContent = '';
    cell.appendChild(input);
    input.focus();
}

// Update customer
function updateCustomer(id, field, value) {
    const customer = customerData.find(customer => customer.id === id);
    if (customer) {
        customer[field] = value;
    }
}

// Pet details popup
function showPetDetails(customerId) {
    const customer = customerData.find(c => c.id === customerId);
    if (!customer) return;

    const popup = document.createElement('div');
    popup.className = 'popup';
    
    let petsList = customer.pets.map(pet => `
        <div class="pet-card">
            <h3>${pet.name}</h3>
            <p>Type: ${pet.type}</p>
            <p>Breed: ${pet.breed}</p>
            <p>Age: ${pet.age} years</p>
        </div>
    `).join('');

    popup.innerHTML = `
        <div class="popup-content">
            <h2>${customer.name}'s Pets</h2>
            <div class="pets-container">
                ${petsList}
            </div>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;

    document.body.appendChild(popup);
}

// Search functionality
document.getElementById('customer-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = customerData.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
    );
    renderCustomerTable(filteredData);
});

// Status filter
document.getElementById('status-filter').addEventListener('change', (e) => {
    const status = e.target.value;
    const filteredData = status 
        ? customerData.filter(customer => customer.status === status)
        : customerData;
    renderCustomerTable(filteredData);
});

// Render table
function renderCustomerTable(data = customerData) {
    const tbody = document.querySelector('.customer-table tbody');
    tbody.innerHTML = '';
    
    data.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td ondblclick="enableQuickEdit(this, '${customer.id}', 'name')">${customer.name}</td>
            <td ondblclick="enableQuickEdit(this, '${customer.id}', 'email')">${customer.email}</td>
            <td ondblclick="enableQuickEdit(this, '${customer.id}', 'phone')">${customer.phone}</td>
            <td>
                <button onclick="showPetDetails('${customer.id}')">
                    View Pets (${customer.pets.length})
                </button>
            </td>
            <td>${customer.lastVisit}</td>
            <td>
                <button onclick="editCustomer('${customer.id}')">Edit</button>
                <button onclick="deleteCustomer('${customer.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize table
document.addEventListener('DOMContentLoaded', () => {
    renderCustomerTable();
});
function setdatetime() {
    var now = new Date();
    var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate(); 
    var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    var dateTime = date + ' ' + time;
    document.getElementById("current-datetime").textContent = dateTime;
}