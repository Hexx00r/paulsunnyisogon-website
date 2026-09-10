import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import Problem from '@/sections/Problem'
import WhatIBuild from '@/sections/WhatIBuild'
import CaseStudyDJ from '@/sections/CaseStudyDJ'
import CaseStudyMelbourne from '@/sections/CaseStudyMelbourne'
import AutomationEngine from '@/sections/AutomationEngine'
import WhyMe from '@/sections/WhyMe'
import HowItWorks from '@/sections/HowItWorks'
import Services from '@/sections/Services'
import Footer from '@/sections/Footer'
import StickyMobileCta from '@/sections/StickyMobileCta'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Problem />
        <WhatIBuild />
        <CaseStudyDJ />
        <CaseStudyMelbourne />
        <AutomationEngine />
        <WhyMe />
        <HowItWorks />
        <Services />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
