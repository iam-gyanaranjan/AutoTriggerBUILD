const API_BASE_URL = window.location.origin;

// DOM Elements
const healthCheckBtn = document.getElementById('healthCheck');
const healthStatusDiv = document.getElementById('healthStatus');
const itemForm = document.getElementById('itemForm');
const itemsContainer = document.getElementById('itemsContainer');
const refreshItemsBtn = document.getElementById('refreshItems');

// Check server health
healthCheckBtn.addEventListener('click', async () => {
    try {
        healthStatusDiv.textContent = 'Checking...';
        healthStatusDiv.className = 'loading';
        
        const response = await fetch(`${API_BASE_URL}/api/health`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        healthStatusDiv.textContent = `Status: ${response.status} - ${data.message}`;
        healthStatusDiv.className = 'success';
    } catch (error) {
        healthStatusDiv.textContent = `Error: ${error.message}`;
        healthStatusDiv.className = 'error';
        console.error('Health check error:', error);
    }
});

// Add new item
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    
    // Basic validation
    if (!name || isNaN(price)) {
        alert('Please provide a valid name and price');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, price }),
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
            alert(`Item "${responseData.name}" added successfully!`);
            itemForm.reset();
            loadItems();
        } else {
            alert(`Error: ${responseData.message}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Add item error:', error);
    }
});

// Load all items
async function loadItems() {
    try {
        itemsContainer.innerHTML = '<div class="loading">Loading items...</div>';
        
        const response = await fetch(`${API_BASE_URL}/api/items`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const items = await response.json();
        
        if (items.length === 0) {
            itemsContainer.innerHTML = '<div class="loading">No items found. Add some using the form above.</div>';
            return;
        }
        
        itemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-card';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description || 'No description'}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="item-actions">
                    <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });
    } catch (error) {
        itemsContainer.innerHTML = `<div class="error">Error loading items: ${error.message}</div>`;
        console.error('Load items error:', error);
    }
}

// Delete item
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
            method: 'DELETE',
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
            alert('Item deleted successfully!');
            loadItems();
        } else {
            alert(`Error: ${responseData.message}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Delete item error:', error);
    }
}

// Edit item
async function editItem(id) {
    try {
        // First get the current item details
        const response = await fetch(`${API_BASE_URL}/api/items/${id}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Item not found');
        }
        
        const item = await response.json();
        
        const newName = prompt('Enter new name:', item.name);
        if (newName === null) return;
        
        const newDescription = prompt('Enter new description:', item.description || '');
        const newPrice = parseFloat(prompt('Enter new price:', item.price));
        
        if (isNaN(newPrice)) {
            alert('Price must be a number!');
            return;
        }
        
        const updateResponse = await fetch(`${API_BASE_URL}/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: newName, 
                description: newDescription, 
                price: newPrice 
            }),
        });
        
        const updateData = await updateResponse.json();
        
        if (updateResponse.ok) {
            alert('Item updated successfully!');
            loadItems();
        } else {
            alert(`Error: ${updateData.message}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Edit item error:', error);
    }
}

// Refresh items list
refreshItemsBtn.addEventListener('click', loadItems);

// Load items when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing...');
    loadItems();
    healthCheckBtn.click(); // Auto-check server status
});
