/* eslint-disable no-unused-vars */
import { Injectable } from '@decorators/di';
import { SchoolNotice } from '../models/schoolNotice';
import { INoticeBody, INoticeBodyWithID } from '../models/schoolNotice';

@Injectable()
export class SchoolNoticeService {
    constructor() {}

    list(): { id: number; title: string; created: Date; updated: Date }[] {
        // TODO
        return [];
    }

    get(id: number): SchoolNotice[] {
        // TODO
        return [];
    }

    add(data: INoticeBody): INoticeBodyWithID {
        // TODO
        return {
            id: 0,
            title: data.title,
            content: data.content,
            attachment: data.attachment,
        };
    }

    edit(data: INoticeBodyWithID): INoticeBodyWithID {
        // TODO
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            attachment: data.attachment,
        };
    }

    remove(id: number): INoticeBodyWithID[] {
        // TODO
        return [];
    }
}
