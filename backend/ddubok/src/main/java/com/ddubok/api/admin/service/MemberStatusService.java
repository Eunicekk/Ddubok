package com.ddubok.api.admin.service;

import com.ddubok.api.admin.dto.request.GetMemberListReq;
import com.ddubok.api.admin.dto.response.GetMemberDetailRes;
import com.ddubok.api.admin.dto.response.GetMemberListRes;
import com.ddubok.api.admin.dto.response.UpdateMemberRoleRes;
import com.ddubok.api.admin.dto.response.UpdateMemberStateRes;
import java.util.List;

/**
 * 멤버에 대한 제지를 위한 서비스
 */
public interface MemberStatusService {

    /**
     * 관리자가 사용자 목록을 조회한다
     *
     * @param getMemberListReq 검색할 닉네임 키워드와 상태 정보를 포함하고 있는 객체
     * @return 조건에 맞는 사용자들의 목록을 반환
     */
    List<GetMemberListRes> getMemberList(GetMemberListReq getMemberListReq);

    /**
     * 관리자가 사용자의 상세 정보를 조회한다
     *
     * @param memberId 검색할 사용자의 번호
     * @return 해당 사용자의 상세 정보를 반환
     */
    GetMemberDetailRes getMemberDetail(Long memberId);

    /**
     * 관리자가 사용자의 역할을 변경한다
     *
     * @param memberId 역할을 변경할 사용자의 번호
     * @return
     */
    UpdateMemberRoleRes updateMemberRole(Long memberId);

    /**
     * 관리자가 사용자의 상태를 변경한다
     *
     * @param memberId 상태를 변경할 사용자의 번호
     * @return
     */
    UpdateMemberStateRes updateMemberState(Long memberId);
}
