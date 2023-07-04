package faroukh.davouzov.cryptouitgelegd.dto;

// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

// Class
public class EmailDetails {

    // Class data members
    private String toEmail;
    private String fromEmail;
    private String msgBody;
    private String subject;
}
