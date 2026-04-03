import type { BlogListBlock as BlogListProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'
import { HyfCard } from '@/primitives/card'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  author?: { name: string }
  featuredImage?: { url: string; alt?: string }
}

interface BlogListBlockComponentProps extends BlogListProps {
  posts?: BlogPost[]
}

export function BlogListBlock({
  heading,
  description,
  showExcerpt = true,
  showDate = true,
  showAuthor = true,
  posts = [],
}: BlogListBlockComponentProps) {
  return (
    <HyfSection className="hyf-blog-list">
      <HyfContainer>
        {(heading || description) && (
          <div className="text-center mb-12 max-w-2xl mx-auto">
            {heading && (
              <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-[var(--hyf-color-muted-foreground)]">
                {description}
              </p>
            )}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-[var(--hyf-color-muted-foreground)]">
            No posts yet. Create your first post in the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a key={post.id} href={`/blog/${post.slug}`} className="group">
                <HyfCard className="overflow-hidden h-full flex flex-col">
                  {post.featuredImage && (
                    <div className="overflow-hidden">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {(showDate || showAuthor) && (
                      <div className="flex items-center gap-2 text-sm text-[var(--hyf-color-muted-foreground)] mb-3">
                        {showDate && post.publishedAt && (
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString(
                              'en-AU',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </time>
                        )}
                        {showDate &&
                          showAuthor &&
                          post.publishedAt &&
                          post.author && <span aria-hidden="true">&middot;</span>}
                        {showAuthor && post.author && (
                          <span>{post.author.name}</span>
                        )}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-[var(--hyf-color-foreground)] group-hover:text-[var(--hyf-color-primary)] transition-colors">
                      {post.title}
                    </h3>
                    {showExcerpt && post.excerpt && (
                      <p className="mt-2 text-[var(--hyf-color-muted-foreground)] leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </HyfCard>
              </a>
            ))}
          </div>
        )}
      </HyfContainer>
    </HyfSection>
  )
}
