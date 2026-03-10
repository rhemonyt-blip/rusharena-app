import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export const catchError = (error, customMsg = "") => {
  if (error.code === 1100) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Duplicate fields: ${keys}.`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMsg || "Internal server error.",
    };
  }
  return response(false, error.code, errorObj.message, { ...errorObj });
};

export const setLoginCookies = async (loggedInuser) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const token = await new SignJWT(loggedInuser)
    .setIssuedAt()
    .setExpirationTime("24h")
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set({
    name: "access_token",
    value: token,
    httpOnly: process.env.NODE_ENV === "production",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
