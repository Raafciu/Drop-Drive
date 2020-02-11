package pl.com.dropDrive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.com.dropDrive.model.Report;
import pl.com.dropDrive.repository.ReportRepository;

import java.util.List;

import static pl.com.dropDrive.DropDriveRestNames.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @GetMapping(REPORTS)
    public List<Report> getReports() {
        return (List<Report>) reportRepository.findAll();
    }

    @PostMapping(SAVE_REPORT)
    public void addReport(@RequestBody Report report) {
        reportRepository.save(report);
    }

    @PostMapping(DELETE_REPORT)
    public void deleteReport(@RequestBody Report report) {
        reportRepository.delete(report);
    }

    @GetMapping(REPORTS_BY_CLIENT_REPORTED)
    public List<Report> reportsByClientReported(@RequestParam String clientReported) {
        return reportRepository.reportsByClientReported(clientReported);
    }

}
