export interface IWriteNoticeBody {
    type: 'school' | 'intranet';
    title: string;
    content: string;
}

export interface INoticeCountOption {
    type: 'school' | 'intranet' | 'all';
    search: string;
}

export interface INoticeListOption {
    type: 'school' | 'intranet' | 'all';
    page: number;
    count: number;
    sort: 'ASC' | 'DESC';
    search: string;
}
