package faroukh.davouzov.cryptouitgelegd.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;
import faroukh.davouzov.cryptouitgelegd.domain.Role;
import faroukh.davouzov.cryptouitgelegd.domain.User;
import faroukh.davouzov.cryptouitgelegd.dto.ArticleBodyDTO;
import faroukh.davouzov.cryptouitgelegd.dto.UserDTO;
import faroukh.davouzov.cryptouitgelegd.dto.UserSaveDTO;
import faroukh.davouzov.cryptouitgelegd.service.RoleService;
import faroukh.davouzov.cryptouitgelegd.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserResource {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<User> users = userService.getUsers();
        List<UserDTO> userDTOS= users.stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList());
        return ResponseEntity.ok().body(userDTOS);
    }

    @GetMapping("/user/get")
    public ResponseEntity<UserDTO> getUser(@RequestParam String username){
        User user = userService.getUser(username);
        UserDTO userDTO = null;
        if(user != null){
            userDTO = modelMapper.map(user, UserDTO.class);
        }
        return ResponseEntity.ok().body(userDTO);
    }

    @GetMapping("/user/getByEmail")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestParam String email){
        User user = userService.getUserByEmail(email);
        UserDTO userDTO = null;
        if(user != null){
            userDTO = modelMapper.map(user, UserDTO.class);
        }
        return ResponseEntity.ok().body(userDTO);
    }

    @PostMapping("/user/save")
    public ResponseEntity<?> saveUser(@RequestBody UserSaveDTO userSaveDTO) {
        try{
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());

            User user = modelMapper.map(userSaveDTO, User.class);

            User foundUser = userService.getUserByEmail(user.getEmail());
            if(foundUser != null){
                throw new Exception("emailIsAlreadyUsed");
            }
            foundUser = userService.getUser(user.getUsername());
            if(foundUser != null){
                throw new Exception("usernameIsAlreadyUsed");
            }

            User createdUser = userService.saveUser(user);
            userService.addRoleToUser(createdUser.getUsername(), "ROLE_USER");
            return ResponseEntity.created(uri).body(createdUser);
        }catch (Exception exception){
            log.info(exception.getMessage());
            return ResponseEntity.status(FORBIDDEN).body(exception.getMessage());
        }
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addToUser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try{
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            }catch (Exception exception){
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }else{
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @Data
    static
    class RoleToUserForm {
        private String username;
        private String roleName;

    }



}
