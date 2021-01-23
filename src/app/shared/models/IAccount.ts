import { ITag } from './Tag';

export interface IAccount {
    uuid: string;
    site: string;
    tags: ITag[] | undefined;
    username: string;
    password: string;
    addDate: Date;
    lastModified: Date;
    timesAccessed: number;
    timesUpdated: number;
}
