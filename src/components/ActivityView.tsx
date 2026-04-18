import React from 'react';
import { ChevronLeft, Search, Filter, Heart, MessageSquare, Reply, ExternalLink, MoreHorizontal, UserPlus, Users, MessageCircle, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';

interface ActivityViewProps {
  onBack: () => void;
  onNavigateToProfile: () => void;
  onNavigateToPost: (postId: string) => void;
  onNavigateToDMs: () => void;
}

const ActivityView: React.FC<ActivityViewProps> = ({ onBack, onNavigateToProfile, onNavigateToPost, onNavigateToDMs }) => {
  return (
    <div className="flex-1 bg-surface min-h-screen pb-[100px] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 bg-surface/80 backdrop-blur-xl z-20 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-surface-container rounded-full transition-colors text-on-surface">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Activity Hub</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-10">
        {/* Network Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-outline">Network</h2>
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">2 New</span>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 shadow-sm">
              <div className="flex gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="Elena" 
                  className="w-12 h-12 rounded-xl object-cover border border-outline-variant/20"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-normal mb-1">
                    <span className="font-bold">Elena Rodriguez</span> invited you to connect
                  </p>
                  <p className="text-xs text-outline">Design Director at Nexus Labs</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-2.5 bg-on-surface text-surface rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Accept
                </button>
                <button className="py-2.5 bg-surface-container-high text-on-surface rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
                  Decline
                </button>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-primary-container/30 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64" className="w-8 h-8 rounded-full border-2 border-surface object-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-outline">
                    +12
                  </div>
                </div>
                <p className="text-sm font-medium">13 people viewed your profile</p>
              </div>
              <button onClick={onNavigateToProfile} className="text-[11px] font-black uppercase tracking-widest text-primary-container hover:underline">View all</button>
            </div>
          </div>
        </section>

        {/* Feed Activity */}
        <section>
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-outline mb-6">Feed Activity</h2>
          
          <div className="space-y-4">
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
                    alt="Marcus" 
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-sm">Marcus Thorne</h3>
                    <p className="text-[10px] text-outline font-bold uppercase tracking-widest mt-0.5">NEW POST • 4H AGO</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-surface-container-high rounded-lg border border-outline-variant/20">
                  <span className="text-[9px] font-black tracking-widest text-outline">FOLLOWING</span>
                </div>
              </div>
              <p className="text-sm italic text-on-surface/80 leading-relaxed mb-5 pl-2 border-l-2 border-primary-container/30">
                "The intersection of brutalist architecture and digital interfaces..."
              </p>
              <div className="flex gap-4">
                <button className="px-5 py-2 bg-surface-container-high text-on-surface rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
                  View Post
                </button>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-container hover:opacity-80 transition-opacity">
                  <Reply className="w-3 h-3" /> Quick Reply
                </button>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-primary-container" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-normal mb-1">
                    <span className="font-bold">Julian Voss</span> replied to your comment:
                  </p>
                  <p className="text-xs italic text-outline line-clamp-2 mb-4">
                    "Excellent point about the mathematical..."
                  </p>
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF4949] hover:opacity-80 transition-opacity">
                      <Heart className="w-3 h-3" /> Like
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-container hover:opacity-80 transition-opacity">
                      <Reply className="w-3 h-3" /> Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Messages */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-outline">Direct Messages</h2>
            <button className="p-1 text-on-surface hover:text-primary-container transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div onClick={onNavigateToDMs} className="bg-surface-container-low border border-outline-variant/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-surface-container transition-all cursor-pointer relative shadow-sm">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" 
                  className="w-12 h-12 rounded-2xl object-cover border border-outline-variant/20"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00FFAB] border-2 border-surface rounded-full shadow-sm"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-sm">Julian Voss</h3>
                  <span className="text-[10px] text-outline font-medium">8m</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-outline truncate max-w-[200px] font-medium italic">Hey, I've reviewed those architectural ...</p>
                  <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                </div>
              </div>
            </div>

            <div onClick={onNavigateToDMs} className="bg-surface-container-low border border-outline-variant/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-surface-container transition-all cursor-pointer relative shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
                <Users className="w-6 h-6 text-outline" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-sm">Design Strategy Group</h3>
                  <span className="text-[10px] text-outline font-medium">1d</span>
                </div>
                <p className="text-xs text-outline truncate max-w-[200px] font-medium">Elena: I've added the new brand guidelines t...</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center pt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-outline/30">End of Updates</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
