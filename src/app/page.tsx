import { Hero } from '@/components/sections/Hero';
import { AboutIntro } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { PortfolioPreview } from '@/components/sections/Portfolio';
import { ExplorerBand } from '@/components/sections/ExplorerBand';
import { Recognition } from '@/components/sections/Recognition';
import { WhyLuma } from '@/components/sections/WhyLuma';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';

/**
 * The journey, in order:
 * deep space → who we are → what we do → what we made →
 * the threshold → what we were given → why us → what clients say → launch.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Services />
      <PortfolioPreview />
      <ExplorerBand />
      <Recognition />
      <WhyLuma />
      <Testimonials />
      <CallToAction />
    </>
  );
}
