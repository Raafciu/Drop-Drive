package pl.com.dropDrive.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.com.dropDrive.model.Note;

import java.util.List;

@Repository
public interface NoteRepository extends CrudRepository<Note, Long> {

    @Query(value = "FROM Note WHERE reportId=:reportId")
    List<Note> getNotesByReportId(String reportId);
}
