import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarBlock } from '@/blocks/navbar/component'
import { HeroBlock } from '@/blocks/hero/component'
import { FeaturesBlock } from '@/blocks/features/component'
import { StatsBlock } from '@/blocks/stats/component'
import { TestimonialsBlock } from '@/blocks/testimonials/component'
import { CTABlock } from '@/blocks/cta/component'
import { FooterBlock } from '@/blocks/footer/component'

export async function LandingPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'landing' })

  return (
    <>
      <NavbarBlock {...content.navbar} />
      <HeroBlock {...content.hero} />
      <FeaturesBlock {...content.features} />
      <StatsBlock {...content.stats} />
      <TestimonialsBlock {...content.testimonials} />
      <CTABlock {...content.cta} />
      <FooterBlock {...content.footer} />
    </>
  )
}
