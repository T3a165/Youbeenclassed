import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GavelIcon } from '@/components/icons/GavelIcon';
import { useApp } from '@/store/AppContext';
import type { Verdict, Rank } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface AnalysisSectionProps {
  onComplete: () => void;
}

const ANALYSIS_STEPS = [
  'Parsing input...',
  'Cross-referencing patterns...',
  'Scoring against rubric...',
  'Preparing verdict...',
];

// Mock verdict generation - in production this would call an API
function generateMockVerdict(submission: string, category: string, tone: string): Verdict {
  const scores = [72, 84, 91, 67, 58, 95, 78, 63, 88, 45];
  const score = scores[Math.floor(Math.random() * scores.length)];
  
  let rank: Rank;
  if (score >= 90) rank = 'S';
  else if (score >= 80) rank = 'A';
  else if (score >= 70) rank = 'B';
  else if (score >= 60) rank = 'C';
  else if (score >= 50) rank = 'D';
  else rank = 'F';

  const strengthsPool = [
    'Clear problem definition',
    'Logical implementation path',
    'Potential market demand',
    'Unique angle',
    'Strong narrative structure',
    'Practical feasibility',
    'Creative approach',
    'Well-reasoned argument',
  ];

  const weaknessesPool = [
    'Competition may be significant',
    'Differentiation unclear',
    'Execution vague',
    'Market timing uncertain',
    'Resource requirements high',
    'Scalability concerns',
    'Regulatory hurdles',
    'Customer acquisition unclear',
  ];

  const rulings = [
    'Promising concept—but execution will make or break it.',
    'Solid foundation. Build fast and iterate.',
    'Unexpectedly competent. Worth pursuing.',
    'Interesting but needs significant refinement.',
    'Return to the workshop and try again.',
    'Surprisingly viable. Consider prototyping.',
  ];

  const shuffledStrengths = [...strengthsPool].sort(() => 0.5 - Math.random());
  const shuffledWeaknesses = [...weaknessesPool].sort(() => 0.5 - Math.random());

  return {
    id: Math.random().toString(36).substring(2, 9),
    score,
    rank,
    strengths: shuffledStrengths.slice(0, 3),
    weaknesses: shuffledWeaknesses.slice(0, 2),
    finalRuling: rulings[Math.floor(Math.random() * rulings.length)],
    category: category as any,
    tone: tone as any,
    submission,
    timestamp: Date.now(),
  };
}

export function AnalysisSection({ onComplete }: AnalysisSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const { submission, category, tone, setVerdict } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulate analysis progress
  useEffect(() => {
    if (!submission) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Generate verdict and complete
          const verdict = generateMockVerdict(submission, category, tone);
          setVerdict(verdict);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 150);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [submission, category, tone, setVerdict, onComplete]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(card,
          { y: '60vh', opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, ease: 'power3.out' },
          0
        )
        .fromTo(iconRef.current,
          { scale: 0.6, rotate: -12, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, ease: 'back.out(1.7)' },
          0.05
        )
        .fromTo(stepsRef.current?.children || [],
          { x: '-6vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, ease: 'power3.out' },
          0.1
        )
        .fromTo(progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power3.out' },
          0.15
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(card,
          { scale: 1, opacity: 1 },
          { scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(iconRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
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
      {/* Subtle scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,166,35,0.1) 2px, rgba(245,166,35,0.1) 4px)'
        }}
      />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div
          ref={cardRef}
          className="w-full max-w-2xl mx-4 md:mx-auto bg-court-card border border-gold/30 rounded-2xl p-8 md:p-12 shadow-court-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Icon */}
          <div ref={iconRef} className="flex justify-center mb-8" style={{ willChange: 'transform, opacity' }}>
            <div className="animate-pulse-gold">
              <GavelIcon size={80} animated />
            </div>
          </div>

          {/* Status headline */}
          <h2 className="font-mono text-lg md:text-xl text-center text-gold tracking-wider mb-8">
            ANALYZING SUBMISSION
          </h2>

          {/* Progress steps */}
          <div ref={stepsRef} className="space-y-4 mb-8">
            {ANALYSIS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ willChange: 'opacity, transform' }}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index <= currentStep ? 'bg-gold' : 'bg-muted-foreground/30'
                  }`}
                />
                <span
                  className={`text-sm md:text-base transition-colors duration-300 ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground/50'
                  }`}
                >
                  {step}
                </span>
                {index === currentStep && (
                  <span className="ml-auto">
                    <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-court-dark rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-150"
              style={{ 
                width: `${progress}%`,
                transformOrigin: 'left',
                willChange: 'transform'
              }}
            />
          </div>

          {/* Micro copy */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            This usually takes 6–10 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
