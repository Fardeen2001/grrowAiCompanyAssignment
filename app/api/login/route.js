import User from "@/models/User";
import mongoose from "mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URI);

  const { email, password } = await req.json();

  const user =
    (await User.findOne({ email: email })) ||
    (await User.find().filter((item) => {
      item.email !== email;
    }));
  var bytes = CryptoJS.AES.decrypt(user.password, `${process.env.AES_SECRET}`);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (user) {
    if (email === user.email && password === originalText) {
      var token = jwt.sign(
        { success: true, email: user.email, name: user.name },
        `${process.env.AES_SECRET}`,
        { expiresIn: "1d" },
        { iat: "1d" }
      );

      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: "invalid Credentials" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, error: "invalid user" },
      { status: 400 }
    );
  }
}
