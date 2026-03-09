import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Crown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/store/AppContext';
import { CATEGORIES, TONE_MODES, type Category, type ToneMode } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface SubmitSectionProps {
  onAnalyze: (submission: string, category: string, tone: string) => void;
  remainingSubmissions: number;
  userTier: string;
}

export function SubmitSection({ onAnalyze, remainingSubmissions, userTier }: SubmitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { submission, setSubmission, category, setCategory, tone, setTone } = useApp();
  const [charCount, setCharCount] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(textareaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(buttonRef.current,
        { y: 18, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSubmission(text);
    setCharCount(text.length);
  };

  const handleAnalyze = () => {
    if (submission.trim().length >= 10 && remainingSubmissions > 0) {
      onAnalyze(submission, category, tone);
    }
  };

  const isValid = submission.trim().length >= 10;
  const canSubmit = isValid && remainingSubmissions > 0;

  return (
    <section
      ref={sectionRef}
      id="submit"
      className="relative w-full min-h-screen py-20 md:py-32 bg-court-dark"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.03) 0%, transparent 70%)'
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          ref={cardRef}
          className="max-w-4xl mx-auto bg-court-card border border-gold/30 rounded-2xl p-6 md:p-10 lg:p-12 shadow-court-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Header */}
          <div ref={titleRef} className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  Submit your idea
                </h2>
                
                {/* Remaining submissions badge */}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-sm font-medium ${
                    remainingSubmissions > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {remainingSubmissions} submission{remainingSubmissions !== 1 ? 's' : ''} remaining today
                  </span>
                  {userTier === 'FREE' && (
                    <span className="text-xs text-muted-foreground">
                      (Free tier)
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Category Select */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Category
                  </span>
                  <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                    <SelectTrigger className="w-[160px] bg-court-dark border-gold/30 text-foreground text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-court-card border-gold/30">
                      {CATEGORIES.map((cat) => (
                        <SelectItem 
                          key={cat.value} 
                          value={cat.value}
                          className="text-foreground hover:bg-gold/10 focus:bg-gold/10"
                        >
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone Select */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Tone
                  </span>
                  <Select value={tone} onValueChange={(v) => setTone(v as ToneMode)}>
                    <SelectTrigger className="w-[140px] bg-court-dark border-gold/30 text-foreground text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-court-card border-gold/30">
                      {TONE_MODES.map((mode) => (
                        <SelectItem 
                          key={mode.value} 
                          value={mode.value}
                          className="text-foreground hover:bg-gold/10 focus:bg-gold/10"
                        >
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Tone description */}
            <p className="mt-2 text-xs text-muted-foreground">
              {TONE_MODES.find(m => m.value === tone)?.description}
            </p>
          </div>

          {/* Warning for no remaining submissions */}
          {remainingSubmissions === 0 && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-400 font-medium">
                  Daily limit reached
                </p>
                <p className="text-xs text-red-400/70 mt-1">
                  Upgrade to get more submissions or wait until tomorrow.
                </p>
              </div>
            </div>
          )}

          {/* Textarea */}
          <div ref={textareaRef} className="mb-4 md:mb-6">
            <Textarea
              value={submission}
              onChange={handleTextChange}
              placeholder="Describe your idea, argument, or story..."
              className="w-full min-h-[180px] md:min-h-[220px] bg-court-dark border-gold/30 text-foreground placeholder:text-muted-foreground/50 resize-none focus:border-gold/60 focus:ring-gold/20 text-sm md:text-base leading-relaxed p-4 md:p-5"
              maxLength={500}
              disabled={remainingSubmissions === 0}
            />
          </div>

          {/* Footer */}
          <div ref={buttonRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {charCount}/500
              </span>
              {charCount < 10 && remainingSubmissions > 0 && (
                <span className="text-xs text-muted-foreground">
                  (min 10 characters)
                </span>
              )}
            </div>
            
            <Button
              onClick={handleAnalyze}
              disabled={!canSubmit}
              size="lg"
              className="w-full sm:w-auto bg-gold text-court-dark hover:bg-gold-light font-display font-bold tracking-wider px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <Send className="w-4 h-4 mr-2" />
              {remainingSubmissions === 0 ? 'Upgrade to Continue' : 'ANALYZE'}
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground/70">
            {userTier === 'FREE' ? (
              <>
                Free tier: 3 submissions/day.{' '}
                <button 
                  onClick={() => document.dispatchEvent(new CustomEvent('open-pricing'))}
                  className="text-gold hover:underline"
                >
                  Upgrade for more.
                </button>
              </>
            ) : (
              `${userTier} plan: Unlimited submissions.`
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
