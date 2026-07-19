'use client';

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";
import { Share2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { defaultEditorSnippet, monacoEditorLanguagesOptions, MonacoEditorLanguageValue } from "@/constants";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { shareSnippet } from "@/lib/actions/snippets";

const editorThemeOptions = ['Light', 'Dark'] as const;

const MonacoEditor = () => {

    const router = useRouter();

    const [editorLanguage, setEditorLanguage] = useState<MonacoEditorLanguageValue>('html');
    const [editorTheme, setEditorTheme] = useState<'light' | 'vs-dark'>('light');
    const [editorValue, setEditorValue] = useState(defaultEditorSnippet ?? '');
    const [canShare, setCanShare] = useState(true);
    const [isPending, startTransition] = useTransition();

    const markDirty = () => {
        setCanShare(true);
    }

    const handleEditorChange = (value: string | undefined) => {
        setEditorValue(value ?? '');
        markDirty();
    }

    const handleLanguageChange = (value: MonacoEditorLanguageValue) => {
        setEditorLanguage(value);
        markDirty();
    }

    const handleThemeChange = (value: 'light' | 'vs-dark') => {
        setEditorTheme(value);
        markDirty();
    }

    const handleShare = () => {
        if (!editorValue || editorValue === "" || !canShare) return;

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

            // For now, just disable Share on success.
            // Once /:snippetId exists, this is where you'd navigate there
            // and/or show a "copy link" button using result.snippetId.
            sileo.success({
                title: 'Snippet saved successfully',
                description: "You'll be redirected to the snippets unique page in a couple of seconds. Please do not refresh"
            });
            setCanShare(false);

            setTimeout(() => {
                router.push(`/snippets/${result.snippetId}`);
            }, 2500);
        });
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

                {/* TODO: Implement link sharing logic */}
                <Button
                    size="lg"
                    disabled={!editorValue || !canShare || isPending}
                    onClick={handleShare}
                >
                    <Share2 />
                    {isPending ? "Saving snippet..." : "Share"}
                </Button>
            </div>
        </section>
    )
}

export default MonacoEditor;