import { Post } from "@/types/model"
import CoreLayout from "@/layouts/core-layout.tsx"
import { Header } from "@/components/md/header.tsx"
import { Markdown } from "@/components/md/markdown.tsx"
import { Prose } from "@/components/md/prose.tsx"

export default function Show({ post }: { post: Post }) {
  return (
    <CoreLayout>
      <div className="mx-auto min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-7xl lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <Header title={post.title} />
          <Prose>{Markdown(post.body)}</Prose>
        </article>
      </div>
    </CoreLayout>
  )
}
