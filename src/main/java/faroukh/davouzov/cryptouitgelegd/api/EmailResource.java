package faroukh.davouzov.cryptouitgelegd.api;

// Importing required classes
import faroukh.davouzov.cryptouitgelegd.dto.EmailDetails;
import faroukh.davouzov.cryptouitgelegd.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmailResource {

    private final EmailSenderService emailService;

    // Sending a simple Email
    @PostMapping("/mail/sendMail")
    public ResponseEntity<?>
    sendMail(@RequestBody EmailDetails details)
    {
        try{
            emailService.sendSimpleMail(details);
            return ResponseEntity.ok().build();
        }catch (Exception ex){
            return ResponseEntity.internalServerError().build();

        }
    }
}
