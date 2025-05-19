const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: 'https://react-project-bice-nu.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// // app.use(cors(
// //   {
// //     origin:["https://deploy-mern-1whq.vecel.app"],
// //     methods:["POST","GET"],
// //     credentials:true
// //   }
// // ))
// app.use(express.json)
// Connect to MongoDB Atlas using Mongoose
mongoose.connect("mongodb+srv://guravvedika17:MUZmOo7VRtQ6WMh2@myfirstdb.x7a8wp3.mongodb.net/SupplierPOManagement?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected using Mongoose"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Import your model
const POModel = require("./models/POModel");

// ROUTES

// Get all POs
app.get("/", (req, res) => {
  POModel.find()
    .then(pos => res.json(pos))
    .catch(err => res.status(500).json({ error: "Failed to fetch POs", details: err }));
});

// Get single PO by ID
app.get("/getPO/:id", (req, res) => {
  const id = req.params.id;
  POModel.findById(id)
    .then(po => {
      if (!po) {
        return res.status(404).json({ error: "PO not found" });
      }
      res.json(po);
    })
    .catch(err => res.status(500).json({ error: "Error fetching PO", details: err }));
});

// Update PO by ID
app.put("/updatePO/:id", (req, res) => {
  const id = req.params.id;
  POModel.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedPO => res.json(updatedPO))
    .catch(err => res.status(500).json({ error: "Failed to update PO", details: err }));
});

// Delete PO by ID
app.delete('/deletePO/:id', (req, res) => {
  const id = req.params.id;
  POModel.findByIdAndDelete(id)
    .then(deletedPO => res.json(deletedPO))
    .catch(err => res.status(500).json({ error: "Failed to delete PO", details: err }));
});

// Create new PO
app.post("/createPO", (req, res) => {
  POModel.create(req.body)
    .then(po => res.json(po))
    .catch(err => res.status(500).json({ error: "Failed to create PO", details: err }));
});

// Start the server
app.listen(3001, () => {
  console.log("🚀 Server is running on port 3001");
});
