import React from 'react'
import Topnav from '../../components/Topnav'
import Homepage from './sections/Homepage'
import Partner from './sections/Partner'
import WhyUs from './sections/WhyUs'
import Features from './sections/Features'
import Faq from './sections/Faq'
import Bookkeeping from './sections/Bookkeeping'
import Footer from '../../components/Footer'

const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Topnav />
      
      {/* Hero section with gradient background */}
      <div className="bg-[radial-gradient(circle_at_top_right,theme(colors.green.900)_0%,theme(colors.green.950)_30%,theme(colors.black)_55%,theme(colors.black)_100%)] min-h-screen w-full">
        <section id="home" className="w-full">
          <Homepage />
        </section>
        <section className="w-full">
          <Partner />
        </section>
      </div>
      
      {/* Other sections */}
      <section id="why-us" className="w-full">
        <WhyUs />
      </section>
      
      <section id="features" className="w-full">
        <Features />
      </section>
      
      <section id="faq" className="w-full">
        <Faq />
      </section>
      
      <section className="w-full">
        <Bookkeeping />
      </section>
      
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  )
}

export default LandingPage