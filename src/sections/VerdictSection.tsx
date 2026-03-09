import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/store/AppContext';
import { RANK_LABELS, RANK_COLORS } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface VerdictSectionProps {
  onShare: () => void;
  onAppeal: () => void;
}

export function VerdictSection({ onShare, onAppeal }: VerdictSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const rankRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const weaknessesRef = useRef<HTMLDivElement>(null);
  const rulingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { verdict } = useApp();
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score counting
  useEffect(() => {
    if (!verdict) return;
    
    const duration = 1500;
    const steps = 60;
    const increment = verdict.score / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= verdict.score) {
        setDisplayScore(verdict.score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [verdict]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(card,
          { scale: 0.82, y: '18vh', opacity: 0 },
          { scale: 1, y: 0, opacity: 1, ease: 'power3.out' },
          0
        )
        .fromTo(scoreRef.current,
          { y: '-10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power3.out' },
          0.05
        )
        .fromTo(rankRef.current,
          { scale: 0.4, rotate: -25, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, ease: 'back.out(1.7)' },
          0.1
        )
        .fromTo(strengthsRef.current,
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power3.out' },
          0.15
        )
        .fromTo(weaknessesRef.current,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power3.out' },
          0.15
        )
        .fromTo(rulingRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power3.out' },
          0.2
        )
        .fromTo(ctaRef.current,
          { y: 24, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, ease: 'power3.out' },
          0.25
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!verdict) return null;

  const rankColor = RANK_COLORS[verdict.rank];
  const rankLabel = RANK_LABELS[verdict.rank];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-court-dark"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.08) 0%, transparent 60%)'
      }}
    >
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div
          ref={cardRef}
          className="w-full max-w-4xl bg-court-card border border-gold/40 rounded-2xl p-6 md:p-10 shadow-court-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Score Row */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div ref={scoreRef} className="flex items-baseline gap-2" style={{ willChange: 'transform, opacity' }}>
              <span className="font-display font-black text-5xl md:text-7xl text-gold">
                {displayScore}
              </span>
              <span className="font-mono text-xl md:text-2xl text-muted-foreground">
                /100
              </span>
            </div>
            
            <div 
              ref={rankRef} 
              className="flex flex-col items-center"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gold flex items-center justify-center bg-gold/10`}>
                <span className={`font-display font-black text-3xl md:text-4xl ${rankColor}`}>
                  {verdict.rank}
                </span>
              </div>
              <span className="mt-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {rankLabel}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gold/30 mb-6 md:mb-8" />

          {/* Two Columns */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Strengths */}
            <div ref={strengthsRef} style={{ willChange: 'transform, opacity' }}>
              <h3 className="font-display font-bold text-lg md:text-xl text-green-400 mb-4">
                Strengths
              </h3>
              <ul className="space-y-3">
                {verdict.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-foreground/90">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div ref={weaknessesRef} style={{ willChange: 'transform, opacity' }}>
              <h3 className="font-display font-bold text-lg md:text-xl text-orange-400 mb-4">
                Weaknesses
              </h3>
              <ul className="space-y-3">
                {verdict.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-foreground/90">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Final Ruling */}
          <div className="text-center mb-8">
            <p
              ref={rulingRef}
              className="font-display text-lg md:text-xl lg:text-2xl text-foreground italic"
              style={{ willChange: 'transform, opacity' }}
            >
              "{verdict.finalRuling}"
            </p>
          </div>

          {/* CTA Row */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ willChange: 'transform, opacity' }}
          >
            <Button
              onClick={onShare}
              size="lg"
              className="w-full sm:w-auto bg-gold text-court-dark hover:bg-gold-light font-display font-bold tracking-wider px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-gold"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share your verdict
            </Button>
            <Button
              onClick={onAppeal}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gold text-gold hover:bg-gold/10 font-display font-bold tracking-wider px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-xl"
            >
              <Scale className="w-4 h-4 mr-2" />
              Appeal
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
