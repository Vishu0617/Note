import { createServerClient } from "@supabase/ssr";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

if (!supabaseUrl) {
  throw new Error("supabaseUrl is required");
}

if (!supabaseKey) {
  throw new Error("supabaseUrl is required");
}

export const createClient = (context) => {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get: (key) => {
        const cookies = context.req.cookies || {};
        const cookie = cookies[key] ?? "";
        return decodeURIComponent(cookie);
      },
      set: (key, value, options = {}) => {
        if (!context.res) return;
        context.res.cookie(key, encodeURIComponent(value), {
          ...options,
          sameSite: "Lax",
          httpOnly: true,
        });
      },
      remove: (key, options = {}) => {
        if (!context.res) return;
        context.res.cookie(key, "", { ...options, httpOnly: true });
      },
    },
  });
};
