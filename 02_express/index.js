// Importing the express module
import express from "express";

// Creating an Express application
const app = express();

// Setting the port number the server will listen on
const port = 3000;

// Middleware to parse incoming JSON data in request bodies
app.use(express.json());

// In-memory array to store data (like a temporary database)
let data = [];

// To assign a unique ID to each new entry
let nextId = 1;

// ROUTE: POST /values
// Purpose: To add a new value (object with name and price) to the data array
app.post("/values", (req, res) => {
  const { name, price } = req.body; // Extracting name and price from request body
  const newData = { id: nextId++, name, price }; // Creating a new object with unique ID
  data.push(newData); // Adding the new object to the array
  res.status(201).send(newData); // Sending back the newly created object with 201 status (Created)
});

// ROUTE:  GET /values
// Purpose: To get all the values stored in the array
app.get("/values", (req, res) => {
  res.status(200).send(data); // Sending all stored values with 200 status (OK)
});

// ROUTE: GET /values/:id
// Purpose: To get a specific value by its ID
app.get("/values/:id", (req, res) => {
  const val = data.find(t => t.id === parseInt(req.params.id)); // Finding the object with matching ID
  if (!val) {
    return res.status(404).send("ERROR NOT FOUND"); // If not found, send 404 status
  }
  res.status(200).send(val); // If found, send the object with 200 status
});

// ROUTE: PUT /values/:id
// Purpose: To update the name and price of a specific value by its ID
app.put("/values/:id", (req, res) => {
  const val = data.find(t => t.id === parseInt(req.params.id)); // Find the object to update
  if (!val) {
    return res.status(404).send("ERROR NOT FOUND"); // If not found, return error
  }
  const { name, price } = req.body; // Extract updated values from request
  val.name = name; // Update name
  val.price = price; // Update price
  res.status(200).send(val); // Return the updated object
});

// ROUTE: DELETE /values/:id
// Purpose: To delete a specific value by its ID
app.delete("/values/:id", (req, res) => {
  const index = data.findIndex(t => t.id === parseInt(req.params.id)); // Find the index of object to delete
  if (index === -1) {
    return res.status(404).send("Error Value Not Found"); // If not found, return error
  }
  data.splice(index, 1); // Remove the object from the array
  return res.status(204).send("Deleted Successfully"); // 204 means successful deletion with no content
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is listening at port : ${port}....`);
});
