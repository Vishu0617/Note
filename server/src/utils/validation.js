import { z } from "zod";

export const signUpValidation = z.object({
  firstName: z
    .string({ required_error: "Please enter user first name." })
    .min(3, { message: "User first name minimum 3 character long." })
    .max(50, { message: "User first name maximum 50 character long." }),
  lastName: z
    .string({ required_error: "Please enter user last name." })
    .min(3, { message: "User last name minimum 3 character long." })
    .max(50, { message: "User last name maximum 50 character long." }),
  email: z
    .string({ required_error: "Please enter email." })
    .email({ message: "Please enter valid email." }),
  password: z
    .string({ required_error: "Please enter password." })
    .min(6, { message: "Password length minimum 6 character long." }),
});

export const signInValidation = z.object({
  email: z
    .string({ required_error: "Please enter email." })
    .email({ message: "Please enter valid email." }),
  password: z
    .string({ required_error: "Please enter password." })
    .min(6, { message: "Password length minimum 6 character long." }),
});

export const noteValidation = z.object({
  title: z
    .string({ required_error: "Please enter note title." })
    .min(3, { message: "Title length minimum 3 character long." })
    .max(30, { message: "Title length maximum 30 character long." }),
  content: z
    .string({ required_error: "Please enter note content." })
    .min(3, { message: "Content length minimum 3 character long." })
    .max(400, { message: "Content length maximum 400 character long." })
    .optional(),
});


export const updateValidation = z.object({
  title: z
    .string({ required_error: "Please enter note title." })
    .min(3, { message: "Title length minimum 3 character long." })
    .max(30, { message: "Title length maximum 30 character long." }),
  content: z
    .string({ required_error: "Please enter note content." })
    .min(3, { message: "Content length minimum 3 character long." })
    .max(400, { message: "Content length maximum 400 character long." })
    .optional(),
});
