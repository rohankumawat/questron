import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogsPage() {
  const blogPosts = getBlogPosts()

  return (
    <div className="min-h-screen bg-[#f0f9ff] dark:bg-[#0c4a6e] text-[#0c4a6e] dark:text-[#e0f2fe]">
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="bg-white dark:bg-[#075985] w-full">
              <CardHeader>
                <CardTitle>
                  <Link href={`/blogs/${post.slug}`} className="text-[#0ea5e9] dark:text-[#7dd3fc] hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#0369a1] dark:text-[#7dd3fc] mb-2">{post.date}</p>
                <p className="text-[#0c4a6e] dark:text-[#e0f2fe]">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'blog-posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, excerpt } = matter(fileContents, { excerpt: true })

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: excerpt || '',
    }
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

