package com.ddubok.api.card.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DeleteCardReq {

    private Long cardId;
    private Long memberId;
}