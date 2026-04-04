import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarBlock } from '@/blocks/navbar/component'
import { HeroBlock } from '@/blocks/hero/component'
import { BlogListBlock } from '@/blocks/blog-list/component'
import { NewsletterBlock } from '@/blocks/newsletter/component'
import { FooterBlock } from '@/blocks/footer/component'

export async function BlogPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'blog' })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: content.blogList?.postsPerPage ?? 6,
    sort: '-publishedAt',
  })

  return (
    <>
      <NavbarBlock {...content.navbar} />
      <HeroBlock {...content.hero} />
      <BlogListBlock {...content.blogList} posts={posts} />
      <NewsletterBlock {...content.newsletter} />
      <FooterBlock {...content.footer} />
    </>
  )
}
