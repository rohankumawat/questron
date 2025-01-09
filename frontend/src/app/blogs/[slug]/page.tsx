import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'blog-posts')
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params
  const fullPath = path.join(process.cwd(), 'blog-posts', `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(fileContents)

  return (
    <div className="min-h-screen bg-[#f0f9ff] dark:bg-[#0c4a6e] text-[#0c4a6e] dark:text-[#e0f2fe]">
      <main className="container mx-auto px-6 py-16">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-[#0369a1] dark:text-[#7dd3fc] mb-8">{data.date}</p>
          <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-[#0c4a6e] dark:prose-headings:text-[#e0f2fe] prose-a:text-[#0ea5e9] dark:prose-a:text-[#7dd3fc]">
            <MDXRemote source={content} />
          </div>
        </article>
      </main>
    </div>
  )
}

