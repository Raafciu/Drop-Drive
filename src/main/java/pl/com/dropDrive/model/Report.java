package pl.com.dropDrive.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.com.dropDrive.enums.ReportStatusEnum;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String shortDescription;

    private String description;

    @Enumerated(EnumType.STRING)
    private ReportStatusEnum status;

    private int prority;

    private String expirationDateTime;

    private String clientReported;


    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", shortDescription='" + shortDescription + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", prority=" + prority +
                ", expirationDateTime=" + expirationDateTime +
                ", clientReported='" + clientReported + '\'' +
                '}';
    }
}
