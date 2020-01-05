package pl.com.dropDrive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.com.dropDrive.model.Note;
import pl.com.dropDrive.repository.NoteRepository;

import java.util.List;

import static pl.com.dropDrive.DropDriveRestNames.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NoteController {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @GetMapping(NOTES)
    public List<Note> getNotes() {
        return (List<Note>) noteRepository.findAll();
    }

    @PostMapping(SAVE_NOTE)
    public void addNote(@RequestBody Note note) {
        noteRepository.save(note);
    }

    @PostMapping(DELETE_NOTE)
    public void deleteNote(@RequestBody Note note) {
        noteRepository.delete(note);
    }

    @GetMapping(NOTES_BY_REPORT_ID)
    public List<Note> getNotesByReportId(@RequestParam String reportId) {
        return noteRepository.getNotesByReportId(reportId);
    }
}
