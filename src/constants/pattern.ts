export const SUNRIN_EMAIL_PATTERN = new RegExp(
    '^[A-Za-z0-9._%+-]+@sunrint.hs.kr$'
);

export const SUNRIN_STUDENT_EMAIL_PATTERN = new RegExp(
    '^\\d{2}sunrin\\d{3}@sunrint.hs.kr$'
);

export const SEOUL_EDU_EMAIL_PATTERN = new RegExp(
    '^[A-Za-z0-9._%+-]+@sen.go.kr$'
);

export const DATE_PATTERN = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');

export const GITHUB_URL_PATTERN = new RegExp(
    '^(?:http(s)?://)?(?:www\\.)?github\\.com/[A-Za-z0-9_]+$'
);

export const GITHUB_ID_PATTERN = new RegExp('^[A-Za-z0-9_]+$');
