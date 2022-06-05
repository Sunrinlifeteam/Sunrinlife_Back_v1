export interface Body {
    title: string;
    content: string;
    attachments: number[];
}

export interface DataOption {
    title?: string;
    content?: string;
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

export interface WorkResult {
    status: number;
    data?: any;
}
