package pl.com.dropDrive;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.*;
import org.springframework.jmx.support.RegistrationPolicy;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import pl.com.dropDrive.enums.ReportStatusEnum;
import pl.com.dropDrive.model.CompanyUser;
import pl.com.dropDrive.model.Note;
import pl.com.dropDrive.model.Report;
import pl.com.dropDrive.repository.CompanyUserRepository;
import pl.com.dropDrive.repository.NoteRepository;
import pl.com.dropDrive.repository.ReportRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Stream;


@Configuration
@EnableAutoConfiguration
@SpringBootApplication
@PropertySources({
        @PropertySource(DropDriveApplication.APPLICATION_YML),
        @PropertySource(DropDriveApplication.DB_PROPERTIES)
})
@ComponentScan(DropDriveApplication.DEFAULT_PACKAGE)
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
@EnableTransactionManagement
public class DropDriveApplication {

    static final String APPLICATION_YML = "classpath:application.yml";
    static final String DB_PROPERTIES = "classpath:db.properties";
    static final String DEFAULT_PACKAGE = "pl.com.dropDrive";

    public static void main(String[] args) {
        SpringApplication.run(DropDriveApplication.class, args);
    }

    @Bean
    CommandLineRunner init(CompanyUserRepository companyUserRepository, ReportRepository reportRepository,
                           NoteRepository noteRepository) {
        return args -> {
            CompanyUser companyUser = new CompanyUser();
            companyUser.setUsername("rg1");
            //haslo asdasd
            companyUser.setPassword("aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0");
            companyUser.setUserType("PRACOWNIK");
            companyUserRepository.save(companyUser);

            CompanyUser companyUser2 = new CompanyUser();
            companyUser2.setFirstName("Adam");
            companyUser2.setLastName("Małysz");
            companyUser2.setUsername("am1");
            //haslo dupa123
            companyUser2.setPassword("863ff78d00331bd4a8b598366013038bc8d715ee069ee5606e5cbd79cd36dca3e878152098b9f78daadf89c39bd81828622b538da7ec543069b2fe010984910a");
            companyUser2.setEmail("adam.malysz@gmail.com");
            companyUser2.setPhone("123123123");
            companyUser2.setCompanyName("SoftNet");
            companyUser2.setUserType("KLIENT");
            companyUserRepository.save(companyUser2);

            Note note = new Note();
            note.setDate(new SimpleDateFormat().format(new Date()));
            note.setDescription("Ile to jeszcze potrwa ?");
            note.setOwner("Andrzej");

            note.setReportId("6");
            noteRepository.save(note);

            Stream.of("Zgłoszenie nr1", "Zgłoszenie nr2", "Zgłoszenie nr3", "Zgłoszenie nr4", "Zgłoszenie nr5").forEach(name -> {
                Report report = new Report();
                report.setName(name);
                report.setShortDescription("Brak ikonki na głównej stronie");
                report.setDescription("Brakuje ikonki, prosiłbym o dodanie. Na ten moment strona wygląda nieestetycznie");
                report.setExpirationDateTime(new SimpleDateFormat().format(new Date()));
                report.setPrority(8);
                report.setStatus(ReportStatusEnum.OTWARTE);
                report.setClientReported("rg1");
                reportRepository.save(report);
            });

            Report report = new Report();
            report.setName("Tekst strona główna");
            report.setShortDescription("Brak tekstu na głównej stronie");
            report.setDescription("Brakuje tekstu, prosiłbym o dodanie. Nie wyświetlają się ważne informacje na stronie");
            report.setExpirationDateTime(new SimpleDateFormat().format(new Date()));
            report.setPrority(8);
            report.setStatus(ReportStatusEnum.OTWARTE);
            report.setClientReported("Andrzej");
            reportRepository.save(report);
        };
    }
}
