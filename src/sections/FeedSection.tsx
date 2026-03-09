import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '@/store/AppContext';
import { CATEGORIES, RANK_COLORS, type Category, type Rank } from '@/types';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Mock feed data
const MOCK_FEED = [
  { id: '1', title: 'AI that writes breakup messages', score: 91, rank: 'A' as Rank, verdict: 'Surprisingly practical', category: 'idea', timestamp: Date.now() - 3600000 },
  { id: '2', title: 'Edible coffee cups', score: 63, rank: 'C' as Rank, verdict: 'Interesting gimmick', category: 'product', timestamp: Date.now() - 7200000 },
  { id: '3', title: 'Pizza delivered by drone pigeons', score: 27, rank: 'F' as Rank, verdict: 'Logistically chaotic', category: 'business', timestamp: Date.now() - 10800000 },
  { id: '4', title: 'Solar-powered desalination backpack', score: 97, rank: 'S' as Rank, verdict: 'Game-changing potential', category: 'startup', timestamp: Date.now() - 14400000 },
  { id: '5', title: 'AI-assisted farming drone swarm', score: 95, rank: 'S' as Rank, verdict: 'Revolutionary for agriculture', category: 'startup', timestamp: Date.now() - 18000000 },
  { id: '6', title: 'Self-cleaning restaurant kitchen', score: 92, rank: 'A' as Rank, verdict: 'Massive labor cost savings', category: 'business', timestamp: Date.now() - 21600000 },
];

export function FeedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { feedFilter, setFeedFilter } = useApp();

  const filteredFeed = feedFilter === 'all' 
    ? MOCK_FEED 
    : MOCK_FEED.filter(item => item.category === feedFilter);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(filtersRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(gridRef.current?.children || [],
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 25%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const filters: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    ...CATEGORIES.slice(0, 5),
  ];

  return (
    <section
      ref={sectionRef}
      id="feed"
      className="relative w-full py-20 md:py-32 bg-court-dark"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-6 md:mb-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Recent Verdicts
          </h2>
          <p className="text-muted-foreground">
            See what's being judged right now.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFeedFilter(filter.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                feedFilter === filter.value
                  ? 'bg-gold text-court-dark'
                  : 'bg-court-card border border-gold/30 text-foreground hover:border-gold/60'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="bg-court-card border border-gold/20 rounded-xl p-5 hover:border-gold/40 transition-all hover:-translate-y-1 hover:shadow-court cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-foreground pr-4 line-clamp-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <div className={`font-display font-bold text-xl ${RANK_COLORS[item.rank]} flex-shrink-0`}>
                  {item.rank}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-lg text-gold">{item.score}</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
              
              <p className="text-sm text-muted-foreground italic">
                "{item.verdict}"
              </p>
              
              <div className="mt-4 pt-3 border-t border-gold/10">
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {CATEGORIES.find(c => c.value === item.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
