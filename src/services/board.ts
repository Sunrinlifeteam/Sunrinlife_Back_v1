import { Inject, Injectable } from '@decorators/di';
import { Like, Repository } from 'typeorm';
import { AttachmentEntity, BoardEntity, UserEntity } from '../entities';
import * as Board from '../types/board';
import { IUser } from '../types/user';

@Injectable()
export class BoardService {
    constructor(
        @Inject(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
        @Inject(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject(AttachmentEntity)
        private readonly attachmentRepository: Repository<AttachmentEntity>
    ) {}

    async findById(id: number) {
        const board = await this.boardRepository.findOne(id);
        return board;
    }

    async count(option: Board.DataOption) {
        const count = await this.boardRepository.count({
            where: {
                ...(option.title ? { title: Like(`%${option.title}%`) } : null),
                ...(option.type ? { type: option.type } : null),
            },
        });
        return count;
    }

    async find(option: Partial<Board.Body> & Board.SearchOption) {
        const data = await this.boardRepository.find({
            order: {
                [option.orderType]: option.sort,
            },
            where: {
                ...(option.title ? { title: Like(`%${option.title}%`) } : null),
                ...(option.type ? { type: option.type } : null),
            },
            skip: option.range.offset,
            take: option.range.count,
        });
        return data;
    }

    async findAndCount(option: Board.SearchOption & Board.DataOption) {
        const dataAndCount = await this.boardRepository.findAndCount({
            order: {
                [option.orderType]: option.sort,
            },
            where: {
                ...(option.title ? { title: Like(`%${option.title}%`) } : null),
                ...(option.content
                    ? { title: Like(`%${option.content}%`) }
                    : null),
                ...(option.type ? { type: option.type } : null),
            },
            skip: option.range.offset,
            take: option.range.count,
        });
        return dataAndCount;
    }

    async write(userData: IUser, body: Board.Body) {
        const user = await this.userRepository.findOne(userData);
        if (!user) throw new Error('Unauthorization');
        const attachments = await this.attachmentRepository.findByIds(
            body.attachments
        );
        const board = this.boardRepository.create({
            title: body.title,
            content: body.content,
            type: body.type,
            attachment: attachments,
            author: user,
        });
        return await this.boardRepository.save(board);
    }

    async update(userData: IUser, id: number, body: Partial<Board.Body>) {
        const user = await this.userRepository.findOne(userData);
        if (!user) throw new Error('Unauthorization');
        const previousArticleData = await this.boardRepository.findOne(id);
        if (!previousArticleData) throw new Error('Article not found');
        const attachments = await this.attachmentRepository.findByIds(
            body.attachments === undefined
                ? previousArticleData.attachment
                : body.attachments
        );
        return await this.boardRepository.update(
            {
                id,
                author: user,
            },
            {
                title:
                    body.title === undefined
                        ? previousArticleData.title
                        : body.title,
                content:
                    body.content === undefined
                        ? previousArticleData.content
                        : body.content,
                type:
                    body.type === undefined
                        ? previousArticleData.type
                        : body.type,
                attachment: attachments,
                author: user,
            }
        );
    }

    async delete(userData: IUser, id: number) {
        const user = await this.userRepository.findOne(userData);
        if (!user) throw new Error('Unauthorization');
        return await this.boardRepository.delete({
            id,
            author: user,
        });
    }
}
