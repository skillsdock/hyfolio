import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarBlock } from '@/blocks/navbar/component'
import { HeroBlock } from '@/blocks/hero/component'
import { PricingBlock } from '@/blocks/pricing/component'
import { ComparisonBlock } from '@/blocks/comparison/component'
import { FAQBlock } from '@/blocks/faq/component'
import { CTABlock } from '@/blocks/cta/component'
import { FooterBlock } from '@/blocks/footer/component'

export async function PricingPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'pricing' })

  return (
    <>
      <NavbarBlock {...content.navbar} />
      <HeroBlock {...content.hero} />
      <PricingBlock {...content.pricing} />
      <ComparisonBlock {...content.comparison} />
      <FAQBlock {...content.faq} />
      <CTABlock {...content.cta} />
      <FooterBlock {...content.footer} />
    </>
  )
}
