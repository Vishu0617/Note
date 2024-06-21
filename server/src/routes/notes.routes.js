import { Router } from "express";
import {
  createNote,
  delteNotes,
  fetchNotes,
  notesPinne,
  updateNotes
} from "../controllers/notes.controller.js";

const NotesRoutes = Router();

NotesRoutes.post("/", createNote);
NotesRoutes.get("/", fetchNotes);
NotesRoutes.patch("/:id", updateNotes);
NotesRoutes.delete("/:id", delteNotes);
NotesRoutes.post("/pinned/:id", notesPinne);

export default NotesRoutes;
