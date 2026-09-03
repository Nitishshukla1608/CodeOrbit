package CodeOrbit.backend.controllers;

import CodeOrbit.backend.dto.IndexStatusResponse;
import CodeOrbit.backend.dto.RepositoryResponse;
import CodeOrbit.backend.entity.Repository;
import CodeOrbit.backend.security.CurrentUser;
import CodeOrbit.backend.services.RepoService;
import CodeOrbit.backend.services.indexing.IndexingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/repos")
@RequiredArgsConstructor
public class RepoController {

    private final CurrentUser currentUser;
    private final RepoService repoService;
    private final IndexingService indexingService;

    // GET /api/repos?refresh=true
    @GetMapping
    public List<RepositoryResponse> list(
            @RequestParam(name = "refresh", defaultValue = "true") boolean refresh
    ) {
        UUID userId = currentUser.require().getId();

        if (refresh) {
            return repoService.syncAndListRepos(userId);
        }

        return repoService.listStored(userId);
    }

    // GET /api/repos/{id}
    @GetMapping("/{id}")
    public RepositoryResponse get(@PathVariable UUID id) {
        UUID userId = currentUser.require().getId();

        Repository repository = repoService.requireOwned(id, userId);

        return repoService.toResponse(repository);
    }


    // GET /api/repos/{id}/status
    @GetMapping("/{id}/status")
    public IndexStatusResponse status(@PathVariable UUID id) {
        UUID userId = currentUser.require().getId();

        return repoService.status(id, userId);
    }
}