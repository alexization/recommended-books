const ErrorMessage = {
    /* 사용자 관련 에러 */
    USER_NOT_FOUND: {message: "사용자의 정보가 없습니다.", code: 1001},

    /* 유효성 검사 에러 */
    EMAIL_REQUIRED: {message: "이메일은 필수 입력 사항입니다.", code: 2001},
} as const;

export type ErrorMessageType = typeof ErrorMessage[keyof typeof ErrorMessage];