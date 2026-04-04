import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarBlock } from '@/blocks/navbar/component'
import { HeroBlock } from '@/blocks/hero/component'
import { DetailsBlock } from '@/blocks/details/component'
import { TeamBlock } from '@/blocks/team/component'
import { TimelineBlock } from '@/blocks/timeline/component'
import { CTABlock } from '@/blocks/cta/component'
import { FooterBlock } from '@/blocks/footer/component'

export async function AboutPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'about' })

  return (
    <>
      <NavbarBlock {...content.navbar} />
      <HeroBlock {...content.hero} />
      <DetailsBlock {...content.details} />
      <TeamBlock {...content.team} />
      <TimelineBlock {...content.timeline} />
      <CTABlock {...content.cta} />
      <FooterBlock {...content.footer} />
    </>
  )
}
