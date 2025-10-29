import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function Home() {

  const snippets = await prisma.snippet.findMany();


  return (
    <div className=' w-screen h-full bg-amber-80 border-amber-100 '>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="font-bold text-4xl mb-8">Home</h1>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Snippets</h2>
          <Link href={"/snippet/new"}><Button>New</Button></Link>
        </div>

        {snippets.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No snippets yet</p>
        ) : (
          <div className="space-y-4">
            {snippets.map((snippet: { id: number; title: string }) => (
              <div key={snippet.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h2 className="text-lg font-medium">{snippet.title}</h2>
                <Link href={`/snippet/${snippet.id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
