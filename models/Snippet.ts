import { ObjectId } from "mongodb";

export interface Snippet {
    _id?: ObjectId;
    snippetId: string;
    language: string;
    code: string;
    theme: string;
    createdAt: Date;
}