package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.dto.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServiceImpl implements EmailSenderService{
    @Autowired private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;


    @Override
    public void sendSimpleMail(EmailDetails details) {
        // Creating a simple mail message
        SimpleMailMessage mailMessage
                = new SimpleMailMessage();

        // Setting up necessary details
        mailMessage.setFrom(sender);
        mailMessage.setTo(details.getToEmail());
        mailMessage.setText(details.getMsgBody() + "\nSent from " + details.getFromEmail());
        mailMessage.setSubject(details.getSubject());

        // Sending the mail
        javaMailSender.send(mailMessage);
    }

}
