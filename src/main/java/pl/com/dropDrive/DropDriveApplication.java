package pl.com.dropDrive;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.*;
import org.springframework.jmx.support.RegistrationPolicy;
import pl.com.dropDrive.model.CompanyUser;
import pl.com.dropDrive.repository.CompanyUserRepository;

@SpringBootApplication
@PropertySources({
        @PropertySource(DropDriveApplication.APPLICATION_YML),
        @PropertySource(DropDriveApplication.DB_PROPERTIES)
})
@ComponentScan(DropDriveApplication.DEFAULT_PACKAGE)
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
public class DropDriveApplication {

    static final String APPLICATION_YML = "classpath:application.yml";
    static final String DB_PROPERTIES = "classpath:db.properties";
    static final String DEFAULT_PACKAGE = "pl.com.dropDrive";

    public static void main(String[] args) {
        SpringApplication.run(DropDriveApplication.class, args);
    }

    @Bean
    CommandLineRunner init(CompanyUserRepository companyUserRepository) {
        return args -> {
            CompanyUser companyUser = new CompanyUser();
            companyUser.setUsername("rg1");
            //haslo asdasd
            companyUser.setPassword("aeae379a6e857728e44164267fdb7a0e27b205d757cc19899586c89dbb221930f1813d02ff93a661859bc17065eac4d6edf3c38a034e6283a84754d52917e5b0");
            companyUserRepository.save(companyUser);

            CompanyUser companyUser2 = new CompanyUser();
            companyUser2.setFirstName("Adam");
            companyUser2.setLastName("Małysz");
            companyUser2.setUsername("adm1");
            //haslo dupa123
            companyUser2.setPassword("863ff78d00331bd4a8b598366013038bc8d715ee069ee5606e5cbd79cd36dca3e878152098b9f78daadf89c39bd81828622b538da7ec543069b2fe010984910a");
            companyUser2.setEmail("adam.malysz@gmail.com");
            companyUser2.setPhone("123123123");
            companyUser2.setCompanyName("SoftNet");
            companyUser2.setUserType("PRACOWNIK");
            companyUserRepository.save(companyUser2);
        };
    }
}
