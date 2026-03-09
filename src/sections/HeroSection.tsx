import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourtSeal } from '@/components/icons/CourtSeal';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onSubmitClick: () => void;
  onFeedClick: () => void;
}

export function HeroSection({ onSubmitClick, onFeedClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0)
        .fromTo(headline1Ref.current, { opacity: 0, y: 40, rotateX: 35 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7 }, 0.1)
        .fromTo(headline2Ref.current, { opacity: 0, y: 40, rotateX: 35 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7 }, 0.2)
        .fromTo(sublineRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4)
        .fromTo(ctaRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(sealRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.7);

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([labelRef.current, headline1Ref.current, headline2Ref.current, sublineRef.current, ctaRef.current, sealRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
            gsap.set(bgRef.current, { scale: 1, x: 0, opacity: 1 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold at visible state (already animated by load)
      // SETTLE (30-70%): Hold
      // EXIT (70-100%): Animate out
      scrollTl
        .fromTo(content, 
          { x: 0, opacity: 1 }, 
          { x: '-40vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bgRef.current, 
          { scale: 1, x: 0, opacity: 1 }, 
          { scale: 1.08, x: '6vw', opacity: 0.6, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(sealRef.current, 
          { y: 0, opacity: 1 }, 
          { y: '12vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-court-dark"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/hero-courtroom.jpg"
          alt="Courtroom"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(11,12,16,0.92) 0%, rgba(11,12,16,0.5) 50%, rgba(11,12,16,0.7) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl" style={{ marginLeft: '9vw' }}>
            {/* Micro label */}
            <p
              ref={labelRef}
              className="font-mono text-xs md:text-sm tracking-[0.2em] text-gold mb-4 md:mb-6"
              style={{ willChange: 'opacity, transform' }}
            >
              THE INTERNET'S AI JUDGMENT ENGINE
            </p>

            {/* Headlines */}
            <h1
              ref={headline1Ref}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground uppercase tracking-wide leading-none mb-2"
              style={{ willChange: 'opacity, transform' }}
            >
              WHERE IDEAS
            </h1>
            <h1
              ref={headline2Ref}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gradient-gold uppercase tracking-wide leading-none mb-6 md:mb-8"
              style={{ willChange: 'opacity, transform' }}
            >
              STAND TRIAL
            </h1>

            {/* Subline */}
            <p
              ref={sublineRef}
              className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-xl"
              style={{ willChange: 'opacity, transform' }}
            >
              Submit your concept. Receive a verdict. Get classed.
            </p>

            {/* CTA Row */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ willChange: 'opacity, transform' }}
            >
              <Button
                onClick={onSubmitClick}
                size="lg"
                className="bg-gold text-court-dark hover:bg-gold-light font-display font-bold tracking-wider px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-gold"
              >
                SUBMIT YOUR IDEA
              </Button>
              <button
                onClick={onFeedClick}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                See recent verdicts
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Court Seal */}
      <div
        ref={sealRef}
        className="absolute bottom-8 left-[9vw] z-10"
        style={{ willChange: 'opacity, transform' }}
      >
        <CourtSeal size={56} className="opacity-80" />
      </div>
    </section>
  );
}
