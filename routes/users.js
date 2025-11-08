import express from "express";
import { db } from "../index.js"; // import Firestore instance from main file

const router = express.Router();

// 🔹 Register User — called from frontend signup/login
router.post("/register", async (req, res) => {
  console.log("📩 Incoming /register request:", req.body); // ✅ Add this

  try {
    const { uid, name, email } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const userRef = db.collection("users").doc(uid);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      await userRef.set({
        uid,
        name: name || "Unnamed User",
        email,
        createdAt: new Date().toISOString(),
      });
      console.log("✅ New user added:", email);
    } else {
      console.log("ℹ️ User already exists:", email);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error in /register:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
