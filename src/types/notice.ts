export interface IWriteNoticeBody {
    type: 'school' | 'intranet';
    title: string;
    content: string;
}

export interface INoticeCountOption {
    type: 'school' | 'intranet' | 'all';
    search: string;
}

export interface INoticeListOption extends INoticeCountOption {
    page: number;
    count: number;
    sort: 'ASC' | 'DESC';
}
