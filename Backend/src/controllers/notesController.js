import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in fecthing");
    res.status(500).json({ Message: "Internal Server Error" });
  }
}

export async function getNoteByID(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ Message: "Note Not Found" });
    res.json(note);
  } catch (error) {
    console.error("Error in getting ID");
    res.status(500).json({ Message: "Internal Server Error" });
  }
}
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const noteCreated = await newNote.save();
    res.status(201).send(noteCreated);
  } catch (error) {
    console.error("Error in creating");
    res.status(500).json({ Message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!updatedNote)
      return res.status(404).json({ Message: "Note Not Found" });

    res.status(200).send("Notes Updated Successfully!");
  } catch (error) {
    console.error("Error in Updating");
    res.status(500).json({ Message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ Message: "Note Not Found" });
    }

    res.status(200).send("Note deleted Successfully!");
  } catch (error) {
    console.error("Error in Deleting", error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
}
