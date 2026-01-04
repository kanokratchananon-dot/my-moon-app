
import React, { useState, useEffect } from 'react';
import { Sparkles, GraduationCap, Heart, Leaf, Star, ChevronLeft, RefreshCw, Loader2, Moon, Zap, Share2, Info, ArrowRight } from 'lucide-react';
import { AgeGroup, Category, TarotCardData } from './types';
import { CARD_THEMES } from './constants';
import { generateCardReading, generateCardImage } from './services/geminiService';
import { OFFLINE_MESSAGES } from "./constants"

const ageGroupTranslations: Record<AgeGroup, string> = {
  [AgeGroup.PRIMARY]: 'ประถมศึกษา (6–11 ปี)',
  [AgeGroup.LOWER_SECONDARY]: 'มัธยมต้น (12–14 ปี)',
  [AgeGroup.UPPER_SECONDARY]: 'มัธยมปลาย (15–18 ปี)',
};

const categoryTranslations: Record<Category, string> = {
  [Category.CAREER_LEARNING]: 'การเรียน & เป้าหมาย',
  [Category.LOVE_FRIENDSHIP]: 'เพื่อน & ความรัก',
  [Category.HEALTH_WELLBEING]: 'สุขภาพ & ความสุข',
  [Category.LUCK_OPPORTUNITY]: 'โชคลาภ & โอกาส',
};

const loadingTips = [
  "ดวงจันทร์กำลังรวบรวมพลังงานบวกให้คุณ...",
  "จักรวาลกำลังเลือกคำแนะนำที่เหมาะที่สุด...",
  "ความโชคดีกำลังเดินทางมาหาคุณแล้ว...",
  "เตรียมเปิดรับสิ่งดีๆ ที่กำลังจะเกิดขึ้นนะ"
];

const App: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'age' | 'category' | 'loading' | 'result'>('landing');
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [reading, setReading] = useState<TarotCardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(0);
function getRandomMessage(category: keyof typeof OFFLINE_MESSAGES) {
  const list = OFFLINE_MESSAGES[category]
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}
  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % loadingTips.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [step]);

 import { OFFLINE_MESSAGES } from "./constants"

const handleDrawCard = async () => {
  if (!category) return;

  setStep("loading");

  try {
    const prompt = `ให้คำแนะนำเชิงบวกสำหรับนักเรียน เรื่อง ${category}`;

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    setReading({
      name: "Moon Guidance",
      imageUrl: "/moon-card.jpg",
      thaiMeaning: data.text,
      thaiGuidance: data.text,
    });

    setStep("result");
  } catch (err) {
    console.error(err);
    setError("พลังจักรวาลขัดข้องเล็กน้อย ลองใหม่อีกครั้ง");
    setStep("category");
  }
};
  const handleShare = async () => {
    if (!reading) return;
    const shareData = {
      title: 'Moon Message - สารจากดวงจันทร์',
      text: `🔮 ฉันได้ไพ่ "${reading.name}"\n\n📖 ความหมาย: ${reading.thaiMeaning}\n\n💡 คำแนะนำ: ${reading.thaiGuidance}\n\nรับพลังบวกของคุณได้ที่นี่! 🌙`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('คัดลอกคำทำนายลงคลิปบอร์ดแล้ว! ส่งต่อให้เพื่อนได้เลย');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const reset = () => {
    setAgeGroup(null);
    setCategory(null);
    setReading(null);
    setStep('landing');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-6 py-8 relative overflow-hidden font-mali">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex flex-col items-center mb-10 pt-4">
        <div className="text-center">
          <h1 className="font-syne text-5xl font-black italic tracking-tighter text-glow uppercase">
            MOON<span className="text-pink-500">MESSAGE</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <p className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] uppercase">Counselor Friends Network</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-20 flex flex-col">
        
        {step === 'landing' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
            {/* Moon & YC Logo Visual */}
            <div className="mb-10 relative group">
              <div className="absolute inset-0 bg-cyan-500/30 blur-[80px] opacity-40 animate-pulse rounded-full"></div>
              <div className="relative w-56 h-56 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <Moon size={180} className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] rotate-12" fill="currentColor" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="font-syne text-6xl font-black italic text-pink-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] tracking-tighter select-none">
                    YC
                   </span>
                </div>
                <Star size={20} className="absolute top-4 left-4 text-white animate-pulse" fill="currentColor" />
                <Star size={14} className="absolute bottom-8 right-4 text-cyan-400 animate-pulse delay-75" fill="currentColor" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">สวัสดีเพื่อนรัก ✨</h2>
            <p className="text-gray-300 mb-10 leading-relaxed px-4 text-lg">
              โครงการ <span className="text-cyan-400 font-bold">YC เพื่อนที่ปรึกษา</span><br/>
              หอวัง นนทบุรี ชวนคุณมารับพลังบวกวันนี้
            </p>
            
            <button 
              onClick={() => setStep('age')}
              className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-3xl font-black text-xl shadow-[0_10px_30px_rgba(244,63,94,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              เริ่มค้นหาคำตอบ <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest">โรงเรียนนวมินทราชินูทิศ หอวัง นนทบุรี</p>
          </div>
        )}

        {step === 'age' && (
          <div className="animate-in slide-in-from-right duration-500">
            <button onClick={() => setStep('landing')} className="flex items-center gap-1 text-cyan-400 mb-8 font-bold hover:text-white transition-colors">
              <ChevronLeft size={20} /> ย้อนกลับ
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">คุณกำลังเรียนอยู่ระดับไหน?</h2>
            <p className="text-gray-400 mb-8">เราจะได้เลือกคำแนะนำที่ตรงใจคุณที่สุด</p>
            <div className="space-y-4">
              {Object.values(AgeGroup).map((group) => (
                <button
                  key={group}
                  onClick={() => { setAgeGroup(group); setStep('category'); }}
                  className="w-full p-6 y2k-card rounded-3xl text-left flex items-center justify-between hover:bg-white/10 transition-all border border-white/10 group active:scale-[0.98]"
                >
                  <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{ageGroupTranslations[group]}</span>
                  <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'category' && (
          <div className="animate-in slide-in-from-right duration-500">
            <button onClick={() => setStep('age')} className="flex items-center gap-1 text-cyan-400 mb-8 font-bold hover:text-white transition-colors">
              <ChevronLeft size={20} /> ย้อนกลับ
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">อยากได้รับพลังงานในด้านไหน?</h2>
            <p className="text-gray-400 mb-8">เลือกหมวดหมู่ที่คุณสนใจในตอนนี้</p>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(Category).map((cat) => {
                const Icon = cat === Category.CAREER_LEARNING ? GraduationCap :
                             cat === Category.LOVE_FRIENDSHIP ? Heart :
                             cat === Category.HEALTH_WELLBEING ? Leaf : Star;
                return (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); handleDrawCard(); }}
                    className="flex flex-col items-center justify-center p-6 y2k-card rounded-3xl gap-3 aspect-square border border-white/10 text-center hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group active:scale-[0.95]"
                  >
                    <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon size={32} />
                    </div>
                    <span className="text-sm font-bold text-white leading-tight group-hover:text-cyan-300">{categoryTranslations[cat]}</span>
                  </button>
                );
              })}
            </div>
            {error && <p className="mt-6 text-pink-500 text-center font-bold animate-pulse">{error}</p>}
          </div>
        )}

        {step === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="relative mb-10">
              <Loader2 size={80} className="text-pink-500 animate-spin" />
              <Moon size={40} className="absolute inset-0 m-auto text-white animate-pulse" fill="currentColor" />
            </div>
            <div className="h-24 flex flex-col items-center justify-center">
              <p className="text-xl font-bold text-white mb-3 animate-bounce">โปรดรอสักครู่...</p>
              <p className="text-gray-400 italic px-8 transition-opacity duration-1000 text-sm md:text-base h-12 flex items-center">
                {loadingTips[tipIndex]}
              </p>
            </div>
          </div>
        )}

        {step === 'result' && reading && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-white/20 mb-8 group">
              <img src={reading.imageUrl} alt={reading.name} className="w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 text-center">
                <h3 className="font-syne text-3xl font-black text-white text-glow italic uppercase tracking-tighter">{reading.name}</h3>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="y2k-card p-6 rounded-3xl border-l-4 border-cyan-500 shadow-lg">
                <h4 className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                  <Star size={12} fill="currentColor" /> Message from Universe
                </h4>
                <p className="text-white text-lg leading-relaxed font-medium">{reading.thaiMeaning}</p>
              </div>

              <div className="y2k-card p-6 rounded-3xl border-l-4 border-pink-500 bg-pink-500/5 shadow-lg">
                <h4 className="text-pink-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                  <Zap size={12} fill="currentColor" /> Daily Guidance
                </h4>
                <p className="text-white text-lg font-bold leading-relaxed">{reading.thaiGuidance}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={handleShare}
                className="py-4 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95 transition-all hover:bg-gray-100"
              >
                <Share2 size={20} /> แชร์ให้เพื่อน
              </button>
              <button 
                onClick={() => setStep('category')}
                className="py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm"
              >
                <RefreshCw size={20} /> ลองอีกครั้ง
              </button>
            </div>

            <button onClick={reset} className="w-full py-4 text-gray-500 font-bold hover:text-white transition-all text-sm uppercase tracking-widest active:scale-95">
              ← กลับสู่หน้าหลัก
            </button>
          </div>
        )}
      </main>

      <footer className="relative z-20 mt-10 text-center pb-4 opacity-50 hover:opacity-100 transition-opacity">
        <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] font-black">
          © 2025 // PROJECT YC HWN // STELLAR_CORE
        </p>
      </footer>
    </div>
  );
};

export default App;
