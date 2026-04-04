import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarBlock } from '@/blocks/navbar/component'
import { HeroBlock } from '@/blocks/hero/component'
import { ContactBlock } from '@/blocks/contact/component'
import { FAQBlock } from '@/blocks/faq/component'
import { FooterBlock } from '@/blocks/footer/component'

export async function ContactPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'contact' })

  return (
    <>
      <NavbarBlock {...content.navbar} />
      <HeroBlock {...content.hero} />
      <ContactBlock {...content.contact} />
      <FAQBlock {...content.faq} />
      <FooterBlock {...content.footer} />
    </>
  )
}
