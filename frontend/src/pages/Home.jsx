import React from 'react'
import Hero from '../components/Hero/Hero'
import Collections from '../components/Collections/Collections'
import BestSellers from '../components/Products/BestSellers'
import Spotlight from '../components/Spotlight/Spotlight'
import NewArrivals from '../components/Products/NewArrivals'
import Textures from '../components/Textures/Textures'
import WhyUs from '../components/WhyUs/WhyUs'
import SocialProof from '../components/SocialProof/SocialProof'

const Home = () => {
  return (
    <main>
      <Hero />
      <Collections />
      <BestSellers />
      <Spotlight />
      <NewArrivals />
      <Textures />
      <WhyUs />
      <SocialProof />
    </main>
  )
}

export default Home
