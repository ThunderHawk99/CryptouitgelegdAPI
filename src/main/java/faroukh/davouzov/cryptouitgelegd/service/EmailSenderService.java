package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.dto.EmailDetails;

public interface EmailSenderService {
    void sendSimpleMail(EmailDetails details);
}
