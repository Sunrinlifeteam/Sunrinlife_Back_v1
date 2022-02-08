/* eslint-disable no-unused-vars */
import { Injectable } from '@decorators/di';
import { IAttachment } from '../models/attachment';
import { SchoolNotice } from '../models/schoolNotice';

@Injectable()
export class SchoolNoticeService {
    constructor() {}

    list(): { id: number; title: string; created: Date }[] {
        // TODO
        return [];
    }

    get(id: number): SchoolNotice[] {
        // TODO
        return [];
    }

    add(data: { title: string; content: string; attachment: IAttachment[] }): {
        title: string;
        content: string;
        attachment: IAttachment[];
    } {
        // TODO
        return {
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
