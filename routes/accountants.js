import express from "express";
import { db } from "../index.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// 🔹 Get all accountants
router.get("/", async (req, res) => {
  const snapshot = await db.collection("accountants").get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(data);
});

// 🔹 Add new accountant (protected)
router.post("/", verifyToken, async (req, res) => {
  const { name, specialization, experience } = req.body;
  await db.collection("accountants").add({ name, specialization, experience });
  res.send({ message: "Accountant added successfully" });
});

export default router;
