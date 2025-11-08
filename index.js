import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import accountantsRouter from "./routes/accountants.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Initialize Firebase Admin with ADC (no key file needed)
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

// ✅ Routes
app.use("/api/accountants", accountantsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
