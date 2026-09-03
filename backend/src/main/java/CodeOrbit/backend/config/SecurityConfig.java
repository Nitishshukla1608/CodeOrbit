package CodeOrbit.backend.config;

import CodeOrbit.backend.security.GithubOAuth2UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            GithubOAuth2UserService githubOauth2UserService,
            AuthenticationSuccessHandler oauth2SuccessHandler,
            AuthenticationFailureHandler oauth2FailureHandler
    ) throws Exception {

        http

                // Use CorsConfig.java for CORS configuration
                .cors(Customizer.withDefaults())

                // CSRF disabled for now
                .csrf(csrf -> csrf.disable())

                // Session is created when required
                .sessionManagement(session -> session
                        .sessionCreationPolicy(
                                SessionCreationPolicy.IF_REQUIRED
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // OAuth endpoints must be public
                        .requestMatchers(
                                "/api/auth/login-url",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/error"
                        ).permitAll()

                        // CORS preflight requests
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // All API endpoints require authentication
                        .requestMatchers("/api/**")
                        .authenticated()

                        // Everything else can be accessed publicly
                        .anyRequest()
                        .permitAll()
                )

                // Return 401 instead of redirecting to login
                // for unauthenticated API requests
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(
                                new HttpStatusEntryPoint(
                                        HttpStatus.UNAUTHORIZED
                                )
                        )
                )

                // GitHub OAuth2
                .oauth2Login(oauth -> oauth

                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(
                                        githubOauth2UserService
                                )
                        )

                        .successHandler(
                                oauth2SuccessHandler
                        )

                        .failureHandler(
                                oauth2FailureHandler
                        )
                )

                // Logout
                .logout(logout -> logout

                        .logoutUrl("/api/auth/logout")

                        .logoutSuccessHandler(
                                (request, response, authentication) ->
                                        response.setStatus(
                                                HttpStatus.NO_CONTENT.value()
                                        )
                        )

                        .invalidateHttpSession(true)

                        .clearAuthentication(true)

                        .deleteCookies("CODEORBIT_SESSION")
                );

        return http.build();
    }


    // =========================================================
    // OAUTH SUCCESS
    // =========================================================

    @Bean
    AuthenticationSuccessHandler oauth2SuccessHandler(
            @Value("${app.frontend-url}") String frontendUrl
    ) {

        SimpleUrlAuthenticationSuccessHandler handler =
                new SimpleUrlAuthenticationSuccessHandler();

        handler.setDefaultTargetUrl(
                frontendUrl + "/auth/callback"
        );

        return handler;
    }


    // =========================================================
    // OAUTH FAILURE
    // =========================================================

    @Bean
    AuthenticationFailureHandler oauth2FailureHandler(
            @Value("${app.frontend-url}") String frontendUrl
    ) {

        SimpleUrlAuthenticationFailureHandler handler =
                new SimpleUrlAuthenticationFailureHandler();

        handler.setDefaultFailureUrl(
                frontendUrl + "/login?error=oauth_failed"
        );

        return handler;
    }
}