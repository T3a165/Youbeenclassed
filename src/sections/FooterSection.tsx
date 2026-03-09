import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { label: 'Submit', id: 'submit' },
    { label: 'Feed', id: 'feed' },
    { label: 'Leaderboard', id: 'leaderboard' },
    { label: 'About', id: 'footer' },
    { label: 'Privacy', id: 'privacy' },
  ];

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative w-full py-12 md:py-16 bg-court-card border-t border-gold/25"
    >
      <div
        ref={contentRef}
        className="w-full px-4 sm:px-6 lg:px-8 xl:px-12"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-gold" />
              <span className="font-display font-bold text-xl tracking-wider text-foreground">
                YOU BEEN CLASSED
              </span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-4 md:gap-6">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground md:text-right max-w-xs">
              Built for the internet's best (and worst) ideas.
            </p>
          </div>

          {/* Bottom row */}
          <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} YouBeenClassed. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Where ideas stand trial.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
