import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User"; // Veritabanı modeli

// GET - Kayıtlı kullanıcıları getir
export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}

// POST - Yeni kullanıcı ekle
export async function POST(request) {
  const { name, email } = await request.json();
  await dbConnect();
  const newUser = new User({ name, email });
  await newUser.save();
  return NextResponse.json(newUser);
}
