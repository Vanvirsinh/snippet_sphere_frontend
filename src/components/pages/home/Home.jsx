import React from 'react';
import Hero from './Hero';
import Features from './Features';
import ShowCase from './ShowCase';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import FAQ from './FAQ';

function Home() {
  return (
    <div>
        <Hero />
        <ShowCase />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
    </div>
  )
}

export default Home