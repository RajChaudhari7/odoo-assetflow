import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Check if Asset Manager already exists
    const existingManager = await User.findOne({
      email: "manager@assetflow.com",
    });

    if (existingManager) {
      console.log("Asset Manager already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      fullName: process.env.DEFAULT_MANAGER_NAME,
      email:process.env.DEFAULT_MANAGER_EMAIL,
      password: hashedPassword,
      role: "Asset Manager",
      employeeId: "AM001",
      phone: "1234567890",
    });

    console.log(" Asset Manager created successfully!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();