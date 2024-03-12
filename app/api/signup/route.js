import User from "@/models/User";
import mongoose from "mongoose";
var CryptoJS = require("crypto-js");
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URI);
  const { name, email, password } = await req.json();

  var ciphertext = CryptoJS.AES.encrypt(
    password,
    `${process.env.AES_SECRET}`
  ).toString();

  let user = new User({ name, email, password: ciphertext });
  await user.save();
  mongoose.disconnect();
  try {
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
