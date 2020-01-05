package pl.com.dropDrive.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.com.dropDrive.model.CompanyUser;

@Repository
public interface CompanyUserRepository extends CrudRepository<CompanyUser, Long> {
}
