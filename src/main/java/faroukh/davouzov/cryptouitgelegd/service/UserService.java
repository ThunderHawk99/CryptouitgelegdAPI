package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.domain.Role;
import faroukh.davouzov.cryptouitgelegd.domain.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    User getUserByEmail(String email);
    List<User> getUsers();
}
