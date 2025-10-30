"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useActionState } from 'react'
import * as action from '@/actions/index'

export default function CreateSnippetPage() {


    const [formState, formAction] = useActionState(
        async (prevState: any, formData: FormData) => {
            return await action.createSnippet(formData);
        },
        { message: "" }
    );

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Create New Snippet</h1>
            <form action={formAction} className="space-y-6">
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

                {formState.message && (<div className='px-2 py-1 border-2 border-red-600 text-bold bg-red-300'><h1>{formState.message}</h1></div>)}

                <div className="flex justify-end gap-4">
                    <Button type='submit'>Create Snippet</Button>
                    <Link href={"/"}> <Button>Cancel</Button></Link>
                </div>

            </form>
        </div>
    )
}
