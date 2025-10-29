"use client"
import React from 'react'
import { Editor } from '@monaco-editor/react'
import type { Snippet } from '@prisma/client'
import { Button } from './button'
import { saveSnippet } from '@/actions'

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {

    const[code,setCode] = React.useState(snippet.code);

    const handleEditorChange = (value: string = "" ) => {
        setCode(value || '');
    }


    const saveSnippetAction = saveSnippet.bind(null, snippet.id, code);

    return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
        <form action={saveSnippetAction} className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold  text-gray-800">Your Code Editor</h1>
            <Button type="submit" className="ml-4 bg-gray-300">Save Changes</Button>
        </form>
        <div className="rounded-lg overflow-hidden border border-gray-200">
            <Editor
                height="70vh"
                defaultLanguage="javascript"
                defaultValue={code}
                theme="vs-dark"
                onChange={handleEditorChange}
            />
        </div>
    </div>
)
}

export default EditSnippetForm