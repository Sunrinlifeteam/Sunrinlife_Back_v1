export interface IWriteNoticeBody {
    type: 'notice' | 'intranet';
    title: string;
    content: string;
}

export interface INoticeListOption {
    type: 'notice' | 'intranet' | 'all';
    page: number;
    count: number;
    sort: 'old' | 'new';
}