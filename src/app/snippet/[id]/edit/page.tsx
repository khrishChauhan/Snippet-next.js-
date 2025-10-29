import React from 'react'
import EditSnippetForm from '@/components/ui/EditSnippetForm'
import { prisma } from '@/lib/prisma'

const EditPageSnippet = async ({ params }: { params: Promise<{ id: string }> }) => {

    const id = parseInt((await params).id);

    const snippet = await prisma.snippet.findUnique({
        where: {
            id
        }
    });

        if (!snippet) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Snippet not found</h2>
                        <p className="text-gray-600">The requested snippet does not exist.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center min-h-screen ">
              <EditSnippetForm snippet={snippet} />
            </div>
        );
}

export default EditPageSnippet