'use client';

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Share2 } from "lucide-react";
import { defaultEditorSnippet, monacoEditorLanguagesOptions, MonacoEditorLanguageValue } from "@/constants";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { cn } from "@/lib/utils";

const editorThemeOptions = ['Light', 'Dark'] as const;

const MonacoEditor = () => {

    const [editorLanguage, setEditorLanguage] = useState<MonacoEditorLanguageValue>('html');
    const [editorTheme, seteditorTheme] = useState<'light' | 'vs-dark'>('light');
    const [editorValue, setEditorValue] = useState(defaultEditorSnippet ?? '');

    const handleEditorChange = (value: string | undefined) => {
        setEditorValue(value ?? '');
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
                        onChange={(e) => setEditorLanguage(e.target.value as MonacoEditorLanguageValue)}
                    />

                    <Select
                        options={editorThemeOptions}
                        value={editorTheme}
                        onChange={(e) => seteditorTheme(e.target.value as 'light' | 'vs-dark')}
                    />
                </div>

                {/* TODO: Implement link sharing logic */}
                <Button
                    size="lg"
                >
                    <Share2 />
                    Share
                </Button>
            </div>
        </section>
    )
}

export default MonacoEditor;