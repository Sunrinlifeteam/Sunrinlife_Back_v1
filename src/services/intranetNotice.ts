/* eslint-disable no-unused-vars */
import { Injectable } from '@decorators/di';
import { IAttachment } from '../models/attachment';
import { IntranetNotice } from '../models/intranetNotice';

@Injectable()
export class IntranetNoticeService {
    constructor() {}

    list(): { id: number; title: string; created: Date; updated: Date }[] {
        // TODO
        return [];
    }

    get(id: number): IntranetNotice[] {
        // TODO
        return [];
    }

    add(data: { title: string; content: string; attachment: IAttachment[] }): {
        id: number;
        title: string;
        content: string;
        attachment: IAttachment[];
    } {
        // TODO
        return {
            id: 0,
            title: data.title,
            content: data.content,
            attachment: data.attachment,
        };
    }

    edit(data: {
        id: number;
        title: string;
        content: string;
        attachment: IAttachment[];
    }): {
        id: number;
        title: string;
        content: string;
        attachment: IAttachment[];
    } {
        // TODO
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            attachment: data.attachment,
        };
    }

    remove(id: number): { id: number; title: string; content: string }[] {
        // TODO
        return [];
    }
}
