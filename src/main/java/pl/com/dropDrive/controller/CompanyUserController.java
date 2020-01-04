package pl.com.dropDrive.controller;

import org.springframework.web.bind.annotation.*;
import pl.com.dropDrive.model.CompanyUser;
import pl.com.dropDrive.repository.CompanyUserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyUserController {

    private final CompanyUserRepository companyUserRepository;

    public CompanyUserController(CompanyUserRepository companyUserRepository) {
        this.companyUserRepository = companyUserRepository;
    }

    @GetMapping("/companyUsers")
    public List<CompanyUser> getUsers() {
        return (List<CompanyUser>) companyUserRepository.findAll();
    }

    @PostMapping("/saveCompanyUser")
    public void addUser(@RequestBody CompanyUser companyUser) {
        companyUserRepository.save(companyUser);
    }

    @PostMapping("/deleteCompanyUser")
    public void deleteUser(@RequestBody CompanyUser companyUser) {
        companyUserRepository.delete(companyUser);
    }

}
