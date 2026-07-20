'use client';

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";
import { Check, Link, Share2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { cn, getTruncatedLink } from "@/lib/utils";
import { shareSnippet } from "@/lib/actions/snippets";
import { defaultEditorSnippet, monacoEditorLanguagesOptions, MonacoEditorLanguageValue } from "@/constants";
import { Button } from "./ui/button";
import { Select } from "./ui/select";

const editorThemeOptions = ['Light', 'Dark'] as const;

type SavedSnapshot = {
    code: string;
    language: MonacoEditorLanguageValue;
    theme: 'light' | 'vs-dark';
};

type MonacoEditorProps = {
    initialCode?: string;
    initialLanguage?: MonacoEditorLanguageValue;
    initialTheme?: 'light' | 'vs-dark';
    snippetId?: string // Present when loaded from an existing share link
}

const MonacoEditor = ({
    initialCode,
    initialLanguage = 'html',
    initialTheme = 'light',
    snippetId: initialSnippetId
}: MonacoEditorProps) => {

    const router = useRouter();

    const [editorLanguage, setEditorLanguage] = useState<MonacoEditorLanguageValue>(initialLanguage);
    const [editorTheme, setEditorTheme] = useState<'light' | 'vs-dark'>(initialTheme);
    const [editorValue, setEditorValue] = useState(initialCode ?? defaultEditorSnippet ?? '');

    const [snippetId, setSnippetId] = useState<string | undefined>(initialSnippetId);
    const [isCopied, setIsCopied] = useState(false);

    const [isPending, startTransition] = useTransition();

    const [savedSnapshot, setSavedSnapshot] = useState<SavedSnapshot | undefined>(
        initialSnippetId
            ? { code: initialCode ?? '', language: initialLanguage, theme: initialTheme }
            : undefined
    );

    // Derived, not stored: true only when current content differs from the saved snapshot.
    const isDirty =
        !savedSnapshot ||
        savedSnapshot.code !== editorValue ||
        savedSnapshot.language !== editorLanguage ||
        savedSnapshot.theme !== editorTheme;

    const canShare = isDirty;

    const handleEditorChange = (value: string | undefined) => {
        setEditorValue(value ?? '');
    }

    const handleLanguageChange = (value: MonacoEditorLanguageValue) => {
        setEditorLanguage(value);
    }

    const handleThemeChange = (value: 'light' | 'vs-dark') => {
        setEditorTheme(value);
    }

    const handleShare = () => {
        if (!editorValue || !canShare) return;

        startTransition(async () => {
            const result = await shareSnippet({
                code: editorValue,
                language: editorLanguage,
                theme: editorTheme
            });

            if (!result.success) {
                sileo.error({
                    title: 'Error saving snippet',
                    description: result.message
                });
                return;
            }

            sileo.success({
                title: 'Snippet saved successfully',
                description: "You'll be redirected to the snippets unique page in a couple of seconds. Please do not refresh"
            });

            setSnippetId(result.snippetId);
            setSavedSnapshot({
                code: editorValue,
                language: editorLanguage,
                theme: editorTheme
            });

            setTimeout(() => {
                router.push(`/${result.snippetId}`);
            }, 2500);
        });
    }

    const handleCopyLink = async () => {
        if (!snippetId) return;
        const link = `${window.location.origin}/${snippetId}`;
        await navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }

    const monacoEditorOptions = {
        height: '50vh',
        theme: editorTheme,
        language: editorLanguage,
        defaultValue: editorValue,
        onChange: handleEditorChange
    }

    return (
        <section
            className={cn(
                "w-full p-8 rounded-lg shadow-lg",
                editorTheme === 'light' ? "bg-white" : "bg-[#1E1E1E]"
            )}
        >
            {/* Monaco Editor */}
            <Editor
                {...monacoEditorOptions}
            />

            {/* Editor action buttons */}
            <div className="w-full mt-8 flex items-center justify-between">
                <div className="flex gap-4">
                    {/* Custom Select button for selecting editor programming language and theme */}
                    <Select
                        options={monacoEditorLanguagesOptions}
                        value={editorLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value as MonacoEditorLanguageValue)}
                    />

                    <Select
                        options={editorThemeOptions}
                        value={editorTheme}
                        onChange={(e) => handleThemeChange(e.target.value as 'light' | 'vs-dark')}
                    />
                </div>

                <div className="flex items-center gap-3">
                    {snippetId && !isDirty && (
                        <Button
                            variant="ghost"
                            size="xs"
                            onClick={handleCopyLink}
                        >
                            {isCopied ? <Check /> : <Link />}
                            {isCopied ? "Copied!" : getTruncatedLink(snippetId)}
                        </Button>
                    )}

                    <Button
                        size="lg"
                        disabled={!editorValue || !isDirty || isPending}
                        onClick={handleShare}
                    >
                        <Share2 />
                        {isPending ? "Sharing..." : "Share"}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default MonacoEditor;