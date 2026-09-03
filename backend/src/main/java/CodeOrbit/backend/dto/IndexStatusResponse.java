package CodeOrbit.backend.dto;

import java.time.Instant;
import java.util.UUID;

import CodeOrbit.backend.entity.IndexStatus;

public record IndexStatusResponse(
        UUID repositoryId,
        IndexStatus indexStatus,
        int filesTotal,
        int filesProcessed,
        int chunkCount,
        Instant indexedAt,
        String errorMessage) {
}
