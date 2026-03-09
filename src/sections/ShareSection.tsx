import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/store/AppContext';
import { RANK_LABELS, RANK_COLORS } from '@/types';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ShareSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const { verdict } = useApp();
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: '8vh', opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(buttonsRef.current?.children || [],
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!verdict) return null;

  const handleCopyLink = () => {
    const url = `https://youbeenclassed.org/verdict/${verdict.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = `I just got classed! ${verdict.score}/100 (Rank ${verdict.rank}) - "${verdict.finalRuling}"`;
    const url = `https://youbeenclassed.org/verdict/${verdict.id}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = `https://youbeenclassed.org/verdict/${verdict.id}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const rankColor = RANK_COLORS[verdict.rank];
  const rankLabel = RANK_LABELS[verdict.rank];

  return (
    <section
      ref={sectionRef}
      id="share"
      className="relative w-full py-20 md:py-32 bg-court-dark"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          ref={cardRef}
          className="max-w-xl mx-auto bg-court-card border border-gold/30 rounded-2xl p-6 md:p-8 shadow-court-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Preview Card */}
          <div className="bg-court-dark border border-gold/20 rounded-xl p-6 mb-6">
            <p className="font-mono text-xs text-gold tracking-wider mb-4">
              YOU'VE BEEN CLASSED
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl text-gold">
                  {verdict.score}
                </span>
                <span className="font-mono text-lg text-muted-foreground">/100</span>
              </div>
              <div className={`font-display font-bold text-3xl ${rankColor}`}>
                {verdict.rank}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-1">{rankLabel}</p>
            
            <p className="text-foreground italic mb-4">
              "{verdict.finalRuling}"
            </p>
            
            <p className="font-mono text-xs text-muted-foreground">
              youbeenclassed.org/verdict/{verdict.id}
            </p>
          </div>

          {/* Share Buttons */}
          <div ref={buttonsRef} className="grid grid-cols-3 gap-3">
            <Button
              onClick={handleShareTwitter}
              variant="outline"
              className="border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold/50"
            >
              <Twitter className="w-4 h-4 mr-2" />
              X
            </Button>
            <Button
              onClick={handleShareLinkedIn}
              variant="outline"
              className="border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold/50"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold/50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
