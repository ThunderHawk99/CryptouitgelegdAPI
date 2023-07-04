package faroukh.davouzov.cryptouitgelegd.service;


import faroukh.davouzov.cryptouitgelegd.domain.Role;
import faroukh.davouzov.cryptouitgelegd.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoleServiceImpl implements RoleService{

    private final RoleRepository roleRepository;

    @Override
    public Role getByName(String name) {
        return roleRepository.findByName(name);
    }
}
