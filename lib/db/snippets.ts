import { Snippet } from "@/models/Snippet";
import clientPromise from "./mongodb"

const getSnippetsCollection = async () => {
    const client = await clientPromise;
    const db = client.db("code-sharing");
    return db.collection<Snippet>("snippets");
}

export const getSnippetById = async (snippetId: string): Promise<Snippet | null> => {
    const snippets = await getSnippetsCollection();
    return snippets.findOne({ snippetId }, { projection: { _id: 0 } });
}

export const createSnippetRecord = async (data: {
    language: string;
    code: string;
    theme: string;
}): Promise<string> => {
    const snippets = await getSnippetsCollection();
    const snippetId = crypto.randomUUID();

    await snippets.insertOne({
        snippetId,
        language: data.language,
        code: data.code,
        theme: data.theme,
        createdAt: new Date()
    });

    return snippetId;
}