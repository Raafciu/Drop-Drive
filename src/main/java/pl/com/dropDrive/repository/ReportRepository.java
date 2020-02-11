package pl.com.dropDrive.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.com.dropDrive.model.Report;

import java.util.List;

@Repository
public interface ReportRepository extends CrudRepository<Report, Long> {

    @Query(value = "FROM Report where clientReported = :clientReported")
    List<Report> reportsByClientReported(String clientReported);
}
