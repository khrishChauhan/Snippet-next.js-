import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import React from 'react'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'


const CreateSnippetPage = () => {
    
    async function createSnippet(formData: FormData) {
        "use server"
        const title = formData.get('title') as string
        const code = formData.get('code') as string

        const snippet =  await prisma.snippet.create({
            data: {
                title,
                code
            }
        })

        redirect('/');
    }
    
    
    
    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Create New Snippet</h1>
            <form action={createSnippet} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                    <Input 
                        type='text' 
                        placeholder='Enter snippet title...' 
                        id='title' 
                        name='title'
                        className="w-full"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="code" className="text-sm font-medium">Code</Label>
                    <Textarea 
                        placeholder='Your code snippet here...' 
                        id='code' 
                        name='code'
                        className="w-full min-h-[200px] font-mono"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button type='submit'>Create Snippet</Button>
                    <Link href={"/"}> <Button>Cancel</Button></Link>
                </div>
            </form>
        </div>
    )
}

export default CreateSnippetPage