package CodeOrbit.backend.services.ai;


import java.util.List;

import CodeOrbit.backend.dto.CitationDto;

public record RetrievedContext(
        List<CitationDto> citations,
        String contextText) {
}