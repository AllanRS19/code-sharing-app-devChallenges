'use server';

import { createSnippetRecord } from "@/lib/db/snippets";
import { monacoEditorLanguagesOptions } from "@/constants";

const validLanguages: readonly string[] = monacoEditorLanguagesOptions.map((lang) => lang.toLowerCase());
const MAX_SNIPPET_LENGTH = 100_000;

type ShareSnippetInput = {
    code: string;
    language: string;
    theme: string;
};

type ActionResult =
    | { success: true; snippetId: string }
    | { success: false; message: string }

export async function shareSnippet(input: ShareSnippetInput): Promise<ActionResult> {
    if (!input.code || !input.language) {
        return { success: false, message: "One or more fields are missing" };
    }

    if (input.code.length > MAX_SNIPPET_LENGTH) {
        return { success: false, message: `Snippet exceeds maximum length of ${MAX_SNIPPET_LENGTH} characters` };
    }

    if (!validLanguages.includes(input.language)) {
        return { success: false, message: `Language must be one of: ${validLanguages.join(", ")}` };
    }

    try {
        const snippetId = await createSnippetRecord(input);

        return { success: true, snippetId }
    } catch (err) {
        console.error("Failed to save snippet:", err);
        return { success: false, message: "Something went wrong while saving the snippet" };
    }
}