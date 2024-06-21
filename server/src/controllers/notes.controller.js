import { z } from "zod";
import { ZodErrorHandler } from "../utils/errorHandler.js";
import { createClient } from "../utils/supabse.js";
import { noteValidation } from "../utils/validation.js";

export const createNote = async (req, res) => {
  try {
    const supabase = createClient({ req, res });

    const { title, content } = noteValidation.parse(req.body);

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title: title, content: content }])
      .select();
    if (error) {
      if (error.message.includes("TypeError: fetch failed")) {
        return res.status(500).json({
          status: 2,
          message:
            "Unable to retrieve data. Please check your internet connection and try again.",
        });
      } else {
        console.log("~ catch error ", error);
        return res.status(400).json({ status: 2, message: error.message });
      }
    }

    return res
      .status(201)
      .json({ status: 1, message: "Notes create success.", result: data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorResult = ZodErrorHandler(error);
      return res.status(400).json({ error: errorResult });
    }
  }
};

export const fetchNotes = async (req, res) => {
  try {
    const supabase = createClient({ req, res });

    let { data: notes, error } = await supabase
      .from("notes")
      .select(
        `
    *,
    profiles (id,first_name,last_name)
  `
      )
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) {
      if (error.message.includes("TypeError: fetch failed")) {
        return res.status(500).json({
          status: 2,
          message:
            "Unable to retrieve data. Please check your internet connection and try again.",
        });
      } else {
        console.log("~ catch error ", error);
        return res.status(400).json({ status: 2, message: error.message });
      }
    }

    return res
      .status(200)
      .json({ status: 1, message: "Notes get success", result: notes });
  } catch (error) {}
};

export const updateNotes = async (req, res) => {
  try {
    const supabase = createClient({ req, res });
    const { title, content } = noteValidation.parse(req.body);

    const { data, error } = await supabase
      .from("notes")
      .update({ title: title, content: content })
      .eq("id", req.params.id)
      .select();

    if (error) {
      if (error.message.includes("TypeError: fetch failed")) {
        return res.status(500).json({
          status: 2,
          message:
            "Unable to retrieve data. Please check your internet connection and try again.",
        });
      } else return res.status(400).json({ status: 2, message: error.message });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Note update success.", result: data });
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

export const delteNotes = async (req, res) => {
  try {
    const supabase = createClient({ req, res });

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      if (error.message.includes("TypeError: fetch failed")) {
        return res.status(500).json({
          status: 2,
          message:
            "Unable to retrieve data. Please check your internet connection and try again.",
        });
      } else return res.status(400).json({ status: 2, message: error.message });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Note Delete success.", result: {} });
  } catch (error) {
    console.log("~ Catch Error :-", error);
  }
};

export const notesPinne = async (req, res) => {
  const supabase = createClient({ req, res });

  let { data: notes, error: noteError } = await supabase
    .from("notes")
    .select("*")
    .eq("id", req?.params?.id);

  if (noteError) {
    if (noteError.message.includes("TypeError: fetch failed")) {
      return res.status(500).json({
        status: 2,
        message:
          "Unable to retrieve data. Please check your internet connection and try again.",
      });
    } else
      return res.status(400).json({ status: 2, message: noteError.message });
  }

  if (notes?.length === 0) {
    return res.status(400).json({ status: 2, message: "Notes not found." });
  }

  const { error: PinnedError } = await supabase
    .from("notes")
    .update({ pinned: req.body.pinned === true ? false : true })
    .eq("id", req?.params?.id)
    .select();

  if (PinnedError) {
    return res.status(400).json({ status: 2, message: PinnedError.message });
  }

  const newPinnedValue = req.body.pinned === true ? false : true;
  const action = newPinnedValue === true ? "pinned" : "unpinned";

  return res
    .status(200)
    .json({ status: 1, message: `Note ${action} successfully.`, result: {} });
};

