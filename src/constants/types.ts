export const ACCOUNT_TYPE = {
    STUDENT: 0,
    TEACHER: 1,
} as const;

export const CLUB_TYPE = {
    MAJOR: 0,
    MINOR: 1,
    AUTONOMY: 2,
} as const;

export const DEPARTMENT = {
    IS: 0,
    SW: 1,
    IM: 2,
    CD: 3,
} as const;

export const ROLE_FLAG = {
    ADMIN: 1 << 0,
} as const;
