import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClerkProvider, useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import axios from 'axios';
import { AppProvider, useApp } from '@/store/AppContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { SubmitSection } from '@/sections/SubmitSection';
import { AnalysisSection } from '@/sections/AnalysisSection';
import { VerdictSection } from '@/sections/VerdictSection';
import { ShareSection } from '@/sections/ShareSection';
import { FeedSection } from '@/sections/FeedSection';
import { LeaderboardSection } from '@/sections/LeaderboardSection';
import { AppealModal } from '@/sections/AppealSection';
import { FooterSection } from '@/sections/FooterSection';
import { PricingModal } from '@/components/PricingModal';
import { Button } from '@/components/ui/button';
import { Crown, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppContent() {
  const { verdict, isAppealOpen, closeAppeal, startAnalysis, setVerdict, openAppeal } = useApp();
  const { isSignedIn, user } = useUser();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showVerdict, setShowVerdict] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [userTier, setUserTier] = useState('FREE');
  const [remainingSubmissions, setRemainingSubmissions] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Fetch user tier on load
  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserTier();
    }
  }, [isSignedIn, user]);

  const fetchUserTier = async () => {
    try {
      const response = await axios.get(`/api/user/tier?userId=${user.id}`);
      setUserTier(response.data.tier);
      setRemainingSubmissions(response.data.remaining);
    } catch (error) {
      console.error('Failed to fetch user tier:', error);
    }
  };

  const scrollToSubmit = () => {
    document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeed = () => {
    document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = async (submission: string, category: string, tone: string) => {
    setError(null);
    
    // Check if user needs to upgrade
    if (remainingSubmissions <= 0 && userTier === 'FREE') {
      setIsPricingOpen(true);
      return;
    }

    setIsLoading(true);
    startAnalysis();
    setShowAnalysis(true);

    // Scroll to analysis
    setTimeout(() => {
      document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const response = await axios.post('/api/verdict', {
        submission,
        category,
        tone,
        userId: isSignedIn ? user.id : 'anonymous',
        userTier,
      });

      // Wait for analysis animation
      setTimeout(() => {
        setVerdict(response.data);
        setShowVerdict(true);
        setRemainingSubmissions(response.data.remaining);
        
        setTimeout(() => {
          document.getElementById('verdict')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 8000); // Match analysis animation duration

    } catch (error: any) {
      console.error('Analysis failed:', error);
      setError(error.response?.data?.error || 'Failed to generate verdict');
      setShowAnalysis(false);
      
      if (error.response?.status === 429) {
        setIsPricingOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    document.getElementById('share')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Global scroll snap for pinned sections
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [showAnalysis, showVerdict]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-court-dark">
      <div className="grain-overlay" />

      {/* Auth buttons */}
      <div className="fixed top-20 right-4 z-40 flex items-center gap-2">
        {isSignedIn ? (
          <>
            <button
              onClick={() => setIsPricingOpen(true)}
              className="flex items-center gap-1 bg-gold/20 text-gold px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gold/30 transition-colors"
            >
              <Crown className="w-4 h-4" />
              {userTier}
            </button>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
              Sign In
            </Button>
          </SignInButton>
        )}
      </div>

      <Navigation onSubmitClick={scrollToSubmit} />

      <main ref={mainRef}>
        <HeroSection onSubmitClick={scrollToSubmit} onFeedClick={scrollToFeed} />
        
        <SubmitSection 
          onAnalyze={handleAnalyze} 
          remainingSubmissions={remainingSubmissions}
          userTier={userTier}
        />

        {showAnalysis && (
          <div id="analysis">
            <AnalysisSection />
          </div>
        )}

        {showVerdict && verdict && (
          <div id="verdict">
            <VerdictSection onShare={handleShare} onAppeal={openAppeal} />
          </div>
        )}

        {showVerdict && verdict && <ShareSection />}

        <FeedSection />
        <LeaderboardSection />
        <FooterSection />
      </main>

      {isAppealOpen && <AppealModal />}
      
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        currentTier={userTier}
      />

      {/* Error toast */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold">×</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ClerkProvider>
  );
}

export default App;
