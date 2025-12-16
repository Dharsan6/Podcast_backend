import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Simple in-memory user storage for testing
const users = [];

// Register route
app.post("/api/auth/register", (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create user
    const user = { id: Date.now(), name, email, password };
    users.push(user);

    // Generate token
    const token = jwt.sign({ id: user.id }, "supersecretkey123", { expiresIn: "7d" });

    res.json({
      message: "User registered successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "supersecretkey123", { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Simple backend working!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Simple server running on port ${PORT}`));