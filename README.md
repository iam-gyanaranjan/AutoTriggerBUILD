PrimeBasket
A simple and fully functional Node.js REST API application with a web interface for performing CRUD (Create, Read, Update, Delete) operations on items. This project is perfect for learning Node.js, Express, and frontend-backend integration.

🌟 Features
RESTful API with complete CRUD operations

Web-based UI for easy interaction with the API

In-memory database (no setup required)

CORS enabled for cross-origin requests

Error handling with meaningful error messages

Responsive design that works on desktop and mobile

Health check endpoint for monitoring server status

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

npm (comes with Node.js)

Installation
Clone or download the project

bash
# If you have the code in a repository
git clone <your-repository-url>
cd demo-nodejs-project
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:3000

📁 Project Structure
text
demo-nodejs-project/
├── public/
│   ├── index.html          # Main HTML page
│   ├── styles.css          # CSS styles
│   └── app.js              # Frontend JavaScript
├── server.js               # Main server file
├── package.json            # Project dependencies and scripts
├── .gitignore             # Git ignore rules
└── README.md              # This file
🛠️ API Endpoints
Method	Endpoint	Description
GET	/api/health	Check server status
GET	/api/items	Get all items
GET	/api/items/:id	Get a specific item
POST	/api/items	Create a new item
PUT	/api/items/:id	Update an existing item
DELETE	/api/items/:id	Delete an item
🎯 Usage
Using the Web Interface
Check Server Status: Click the "Check Server Status" button to verify the server is running

Add Items: Use the form to add new items with name, description, and price

View Items: All items are displayed in the list section

Edit Items: Click the "Edit" button next to any item to modify it

Delete Items: Click the "Delete" button to remove an item

Refresh: Use the "Refresh Items" button to reload the item list

Using the API Directly
You can also interact with the API directly using tools like curl, Postman, or Thunder Client:

bash
# Get all items
curl http://localhost:3000/api/items

# Create a new item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Apple", "description":"Fresh fruit", "price":1.99}'

# Update an item
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Organic Apple", "price":2.49}'

# Delete an item
curl -X DELETE http://localhost:3000/api/items/1
🚦 Scripts
npm start - Start the production server

npm run dev - Start the development server with auto-reload

npm test - Run tests (placeholder)

🔧 Configuration
The application uses the following default configuration:

Port: 3000

CORS: Enabled for all origins

Data storage: In-memory (resets on server restart)

🐛 Troubleshooting
Common Issues
Port already in use: Change the port in server.js or stop other applications using port 3000

CORS errors: Ensure you're accessing the app from the same origin or configure CORS settings

API endpoints not found: Check that the server is running and you're using the correct URL

Debugging
Check the browser console (F12) for JavaScript errors

Look at the server console for backend errors

Verify API endpoints are working by visiting them directly in your browser

📝 Example Data
The application starts with sample data:

json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "This is a sample item",
    "price": 9.99,
    "createdAt": "2023-10-05T12:00:00.000Z",
    "updatedAt": "2023-10-05T12:00:00.000Z"
  }
]
🎨 Customization
You can easily customize this application by:

Modifying the UI: Edit files in the public/ directory

Adding new fields: Update the item structure in server.js and the UI

Changing the port: Modify the PORT variable in server.js

Adding authentication: Implement JWT or session-based auth

Connecting to a real database: Replace the in-memory storage with MongoDB, PostgreSQL, etc.

🤝 Contributing
Feel free to contribute to this project by:

Reporting bugs

Suggesting new features

Submitting pull requests

Improving documentation

📄 License
This project is open source and available under the MIT License.

🙏 Acknowledgments
Built with Express.js

UI designed with vanilla HTML, CSS, and JavaScript

Perfect for learning full-stack JavaScript development

Happy Coding! 🚀

If you have any questions or issues, please check the troubleshooting section or create an issue in the project repository.
