import React from 'react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteSnippet } from "@/actions"; 
import { notFound } from 'next/navigation';

const SnippetDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const id = parseInt((await params).id);
    
    const snippet = await prisma.snippet.findUnique({
        where: {
            id
        }
    });
    
    if (!snippet) notFound();

    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <div className=" mb-2 text-3xl font-bold">      SnippetDetailPage       </div>
            <h1 className=" mb-4 text-gray-500">      {snippet?.title}        </h1>
            <div className="flex gap-2 mb-4">
                <Link href={`/snippet/${id}/edit`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">       Edit      </button> </Link>

                <form  action={deleteSnippetAction}>
                    <button type='submit' className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">       Delete      </button>
                </form>

            </div>
            <pre className="mt-2 p-4 bg-gray-100 rounded-lg font-mono whitespace-pre-wrap text-sm text-gray-700 border border-gray-300">
                {snippet?.code}
            </pre>
        </div>
    )
}

export default SnippetDetailPage;

export const generateStaticParams = async () => {
    const snippets = await prisma.snippet.findMany();

    return snippets.map((snippet) => ({
        id: snippet.id.toString()
    }));
    
}