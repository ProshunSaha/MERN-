import Note from "../models/Note.js";


export async function getAllNotes (req, res) {
    try{
        const notes = await Note.find().sort({createdAt:-1}); //show newest first
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes" });
    }    
};

export async function createNote (req, res) {
    try {
        const{title, content} = req.body;
        console.log(title, content);
        const newNote = new Note({title:title, content:content});

        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error in notesController:", error);
        res.status(500).json({ message: "Error creating note" });
    }
};

export async function updateNote (req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
             {title:title, content:content},
              {
                new:true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ updatedNote });
    } catch (error) {
        console.error("Error in notesController:", error);
        res.status(500).json({ message: "Error updating note" });
    }
};

export async function deleteNote(req, res) {
    try {
        // Await the query directly without a callback
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        // If no note was found with that ID
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Success response
        res.status(200).json({ message: "Note deleted successfully" });
        
    } catch (error) {
        // The catch block handles any database or server errors
        console.error("Error in notesController:", error);
        res.status(500).json({ message: "Error deleting note" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in notesController:", error);
        res.status(500).json({ message: "Error fetching note" });
    }
}
