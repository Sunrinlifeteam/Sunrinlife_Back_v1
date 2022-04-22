export enum Type {
    default = 0,
    anonymous = 1,
}

export interface Body {
    title: string;
    content: string;
    type: Type;
    attachments: number[];
}

export interface DataOption {
    title?: string;
    content?: string;
    type?: Type;
}

export interface SearchOption {
    range: Range;
    sort: 'ASC' | 'DESC';
    orderType: 'created' | 'updated';
}

export interface Range {
    offset: number;
    count: number;
}
