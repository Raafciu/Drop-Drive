package pl.com.dropDrive.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.com.dropDrive.enums.ReportStatusEnum;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String shortDescription;

    private String description;

    @Enumerated(EnumType.STRING)
    private ReportStatusEnum status;

    private int prority;

    private Date expirationDateTime;

    private String clientReported;

//    notes: Set<Note>;


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
