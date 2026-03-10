import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .regex(/^[A-Za-z0-9]+$/, "Name can only contain letters and numbers"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number"), // BD phone validation
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // shows error under confirmPassword field
  });
export const passwordSchema = z
  .object({
    oldpassword: z.string().min(1, "Insert old password"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // shows error under confirmPassword field
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Password is required"), // just required, no min length
});

export const withdrawSchema = z.object({
  receiverPhone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(105, "Minimum withdrawal amount is 105!"),
});
