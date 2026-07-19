import { ObjectId } from "mongodb";

export interface Snippet {
    _id?: ObjectId;
    language: string;
    code: string;
    createdAt: Date;
}