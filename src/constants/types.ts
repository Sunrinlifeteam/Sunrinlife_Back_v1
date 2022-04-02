export type valueOf<T> = T[keyof T];

export const ACCOUNT_TYPE = {
    STUDENT: 0,
    TEACHER: 1,
} as const;

export type CLUB_TYPE_VALUES = typeof CLUB_TYPE[keyof typeof CLUB_TYPE];
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
