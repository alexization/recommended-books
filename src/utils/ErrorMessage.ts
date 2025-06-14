export const ErrorMessage = {
    /* 예상치 못한 에러 */
    UNEXPECTED_ERROR: {message: "예상치 못한 오류 입니다.", code: 500},

    /* 사용자 관련 에러 1xxx */
    USER_NOT_FOUND: {message: "사용자의 정보가 없습니다.", code: 1001},
    USER_ALREADY_EXISTS: {message: "이미 가입한 이메일입니다.", code: 1002},
    USER_DELETE_TARGET_NOT_EXISTS: {message: "삭제하려는 유저가 없습니다.", code: 1003},

    /* 유효성 검사 에러 2xxx */
    EMAIL_REQUIRED: {message: "이메일은 필수 입력 사항입니다.", code: 2001},
    EMAIL_INVALID_FORMAT: {message: "올바른 이메일 형식이 아닙니다.", code: 2002},
    NAME_REQUIRED: {message: "이름은 필수 입력 사항입니다.", code: 2003},
    NAME_TOO_LONG: {message: "이름은 10글자 이내여야 합니다.", code: 2004},

    /* 도서 관련 에러 3xxx */
    BOOK_PAGE_NUMBER_INVALID: {message: "페이지 번호는 1 이상이어야 합니다.", code: 3001},

    /* 인증 및 인가 관련 에러 4xxx */
    PASSWORD_INVALID: {message: "비밀번호가 올바르지 않습니다.", code: 4001},
    ACCESS_TOKEN_EXPIRED: {message: "access 토큰이 만료되었습니다.", code: 4002},
    REFRESH_TOKEN_EXPIRED: {message: "refresh 토큰이 만료되었습니다.", code: 4003},
    INVALID_TOKEN: {message: "유효하지 않는 토큰입니다.", code: 4004},
    TOKEN_VERIFICATION_FAILED: {message: "토큰 검증에 실패했습니다.", code: 4005},
    AUTHORIZATION_HEADER_MISSING: {message: "Authorization 헤더가 없습니다.", code: 4006},
    INVALID_BEARER_TOKEN: {message: "Bearer 토큰이 아닙니다.", code: 4007},
    TOKEN_MISSING: {message: "토큰이 제공되지 않았습니다.", code: 4008},
    UNAUTHORIZED_ACCESS: {message: "인증되지 않은 접근입니다.", code: 4009},
    FORBIDDEN_ACCESS: {message: "접근 권한이 없습니다.", code: 4010},

    /* Open API 관련 에러 5xxx */
    API_CALL_ERROR: {message: "Open API 호출 중 오류가 발생했습니다.", code: 5001},

} as const;

export type ErrorMessageType = typeof ErrorMessage[keyof typeof ErrorMessage];