package faroukh.davouzov.cryptouitgelegd.dto;

import faroukh.davouzov.cryptouitgelegd.domain.Role;
import lombok.Data;
import java.util.Collection;

@Data
public class UserDTO {
    private String email;
    private String name;
    private String username;
    private Collection<Role> roles;
}
