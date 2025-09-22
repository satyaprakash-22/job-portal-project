import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  await db.read();
  console.log("[auth] login body:", req.body);
  console.log("[auth] db users:", db.data.users);

  const { email, password } = req.body;
  const user = db.data.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    console.log("[auth] login failed");
    return res.status(401).json({ message: "Login failed" });
  }

  console.log("[auth] login success", user);
  res.json({
    message: "Login successful",
    role: user.role,
    email: user.email,
    id: user.id,
  });
});

export default router;
