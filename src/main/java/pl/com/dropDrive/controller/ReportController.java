package pl.com.dropDrive.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.com.dropDrive.model.Report;
import pl.com.dropDrive.repository.ReportRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ReportController {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @GetMapping("/reports")
    public List<Report> getReports() {
        return (List<Report>) reportRepository.findAll();
    }

    @PostMapping("/saveReport")
    public void addReport(@RequestBody Report report) {
        log.info(report.toString());
        reportRepository.save(report);
    }

    @PostMapping("/deleteReport")
    public void deleteUser(@RequestBody Report report) {
        reportRepository.delete(report);
    }

    @PostMapping("/reportsByClientReported")
    public List<Report> reportsByClientReported(@RequestParam String clientReported) {
        return reportRepository.reportsByClientReported(clientReported);
    }

}
