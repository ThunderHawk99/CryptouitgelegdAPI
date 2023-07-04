package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleService{
    Role getByName(String name);
}
