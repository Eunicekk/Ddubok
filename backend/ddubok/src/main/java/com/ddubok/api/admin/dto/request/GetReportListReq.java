package com.ddubok.api.admin.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 신고에 대한 필터링요소
 */
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetReportListReq {

    private String state;
    @Builder.Default
    private int page = 0;
    @Builder.Default
    private int size = 50;
}
