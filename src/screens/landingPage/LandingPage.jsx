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
    <>
    <div className=" bg-[radial-gradient(circle_at_top_right,theme(colors.green.900)_0%,theme(colors.green.950)_30%,theme(colors.black)_55%,theme(colors.black)_100%)] min-h-screen">
    <Topnav />
    <Homepage />
    <Partner />
    </div>
    <WhyUs />
    <Features />
    <Faq />
    <Bookkeeping />
    <Footer />
    </>
  )
}

export default LandingPage