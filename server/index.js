import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// === Serve frontend build in production ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In production, serve the built client files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// === MongoDB Connection ===
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// === User Schema ===
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// === API Routes ===
app.post("/api/register", async (req, res) => {
  try {
    const { username, password, university } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    const user = new User({ username, password, university });
    await user.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      university: user.university,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        university: user.university,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === Catch-all route to serve index.html for SPA ===
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
