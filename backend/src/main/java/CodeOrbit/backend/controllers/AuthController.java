package CodeOrbit.backend.controllers;

import CodeOrbit.backend.dto.UserResponse;
import CodeOrbit.backend.entity.User;
import CodeOrbit.backend.security.AppUserPrincipal;
import CodeOrbit.backend.security.CurrentUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final CurrentUser currentUser;

    @GetMapping("/login-url")
    public Map<String, String> loginUrl() {
        return Map.of(
                "url",
                "/oauth2/authorization/github"
        );
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me() {
        AppUserPrincipal principal = currentUser.require();
        User user = principal.getUser();

        return ResponseEntity.ok(
                new UserResponse(
                        user.getId(),
                        user.getGithubId(),
                        user.getGithubUsername(),
                        user.getDisplayName(),
                        user.getAvatarUrl()
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request
    ) {
        System.out.println("logging out");

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.noContent().build();
    }
}