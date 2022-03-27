export interface IWriteNoticeBody {
    type: 'school' | 'intranet';
    title: string;
    content: string;
}

export interface INoticeListOption {
    type: 'school' | 'intranet' | 'all';
    page: number;
    count: number;
    sort: 'old' | 'new';
    search: string;
}