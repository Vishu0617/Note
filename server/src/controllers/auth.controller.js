import { z } from "zod";
import { ZodErrorHandler } from "../utils/errorHandler.js";
import { createClient } from "../utils/supabse.js";
import { signInValidation, signUpValidation } from "../utils/validation.js";

export const registration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = signUpValidation.parse(
      req.body
    );

    const supabase = createClient({ req, res });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      if (error.status === 0) {
        return res.status(500).json({
          status: 2,
          message:
            "Unable to retrieve data. Please check your internet connection and try again.",
        });
      }
      return res
        .status(error.status)
        .json({ status: 2, message: error.message });
    }

    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      return res
        .status(400)
        .json({ status: 2, message: "User already exists" });
    }

    return res.status(201).json({
      status: 1,
      message:
        "Your account has been successfully created. We have also sent a confirmation email to your registered email.",
      result: data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorResult = ZodErrorHandler(error);
      return res.status(400).json({ error: errorResult });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = signInValidation.parse(req.body);

    const supabase = createClient({ req, res });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 0) {
        return res.status(500).json({
          status: 2,
          message:
            "Unable to retrieve data. Please check your internet connection and try again.",
        });
      }
      return res
        .status(error.status)
        .json({ status: 2, message: error.message });
    }

    return res
      .status(200)
      .json({ status: 1, message: "User login success.", result: data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorResult = ZodErrorHandler(error);
      return res.status(400).json({ error: errorResult });
    } else {
      console.log("~ catch error ", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};


export const logout = async (req, res) => {
  try {
    const supabase = createClient({ req, res });
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("~ Error While logout:-", error);
      return res
        .status(error.status)
        .json({ status: 2, message: error.message });
    }
    res.clearCookie();
    return res
      .status(200)
      .json({ status: 1, message: "User logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
