package pl.com.dropDrive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.com.dropDrive.model.CompanyUser;
import pl.com.dropDrive.repository.CompanyUserRepository;

import java.util.List;

import static pl.com.dropDrive.DropDriveRestNames.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyUserController {

    private final CompanyUserRepository companyUserRepository;

    @Autowired
    public CompanyUserController(CompanyUserRepository companyUserRepository) {
        this.companyUserRepository = companyUserRepository;
    }

    @GetMapping(COMPANY_USERS)
    public List<CompanyUser> getUsers() {
        return (List<CompanyUser>) companyUserRepository.findAll();
    }

    @PostMapping(SAVE_COMPANY_USER)
    public void addUser(@RequestBody CompanyUser companyUser) {
        companyUserRepository.save(companyUser);
    }

    @PostMapping(DELETE_COMPANY_USER)
    public void deleteUser(@RequestBody CompanyUser companyUser) {
        companyUserRepository.delete(companyUser);
    }

}
