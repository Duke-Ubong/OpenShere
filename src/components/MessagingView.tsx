import React, { useState } from 'react';
import { Search, Edit3, MoreHorizontal, User, Check, Users as UsersIcon, Plus, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  name: string;
  avatar: string | string[];
  lastMessage: string;
  time: string;
  unread: boolean;
  online?: boolean;
  isGroup?: boolean;
}

interface MessagingViewProps {
  currentUser: any;
  onNavigateToProfile: () => void;
}

const MessagingView: React.FC<MessagingViewProps> = ({ currentUser, onNavigateToProfile }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Direct Messages' | 'Groups'>('All');

  const messages: Message[] = [
    {
      id: '1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      lastMessage: "I've attached the final architect...",
      time: 'JUST NOW',
      unread: true,
      online: true
    },
    {
      id: '2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      lastMessage: "The API documentation is updated. ...",
      time: '14:20',
      unread: false,
      online: false
    },
    {
      id: '3',
      name: 'Design Sprint Team',
      avatar: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64'
      ],
      lastMessage: "Alex: Should we push the deadline t...",
      time: 'Yesterday',
      unread: false,
      isGroup: true
    },
    {
      id: '4',
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: "Thanks for the feedback on the cont...",
      time: 'Oct 24',
      unread: false
    },
    {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
      lastMessage: "The portfolio you sent was incredible...",
      time: 'Oct 22',
      unread: false
    }
  ];

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Direct Messages') return !msg.isGroup;
    if (activeTab === 'Groups') return msg.isGroup;
    return true;
  });

  return (
    <div className="flex-1 bg-surface min-h-screen pb-[100px] overflow-y-auto custom-scrollbar flex flex-col relative">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 bg-surface/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div 
            onClick={onNavigateToProfile}
            className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 cursor-pointer shadow-sm"
          >
            {currentUser?.profileImage ? (
              <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Avatar" className="w-full h-full object-cover" />
            )}
          </div>
          <h1 className="text-xl font-bold tracking-tight font-headline">Gigs Messaging</h1>
        </div>
        <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface">
          <Search className="w-5 h-5" />
        </button>
      </header>

      {/* Tabs / Segment Control */}
      <div className="px-4 mb-6">
        <div className="bg-surface-container-low p-1 rounded-2xl flex border border-outline-variant/10 shadow-sm">
          {(['All', 'Direct Messages', 'Groups'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-surface text-on-surface shadow-md scale-[1.02]' 
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Message List */}
      <div className="px-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredMessages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface border border-outline-variant/5 rounded-3xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-all cursor-pointer group shadow-sm active:scale-[0.98]"
            >
              <div className="relative">
                {msg.isGroup && Array.isArray(msg.avatar) ? (
                  <div className="relative w-14 h-14">
                    <img src={msg.avatar[0]} className="absolute top-0 right-0 w-10 h-10 rounded-xl border-2 border-surface object-cover z-10" />
                    <img src={msg.avatar[1]} className="absolute bottom-0 left-0 w-10 h-10 rounded-xl border-2 border-surface object-cover shadow-sm" />
                  </div>
                ) : (
                  <div className="relative w-14 h-14">
                    <img src={Array.isArray(msg.avatar) ? msg.avatar[0] : msg.avatar} className="w-full h-full rounded-2xl object-cover border border-outline-variant/10 shadow-sm" />
                    {msg.online && (
                      <div className="absolute -bottom-1 -right-0.5 w-4 h-4 bg-primary-container border-2 border-surface rounded-full shadow-sm"></div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-black text-base tracking-tight truncate group-hover:text-primary-container transition-colors">{msg.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black tracking-widest uppercase ${msg.time === 'JUST NOW' ? 'text-primary-container animate-pulse' : 'text-outline'}`}>
                      {msg.time}
                    </span>
                    {msg.unread && (
                      <div className="w-2.5 h-2.5 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,255,171,0.5)]"></div>
                    )}
                  </div>
                </div>
                <p className={`text-xs truncate ${msg.unread ? 'font-bold text-on-surface' : 'text-outline font-medium'}`}>
                  {msg.lastMessage}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[110px] right-6 w-16 h-16 bg-surface-container-highest text-on-surface rounded-[24px] flex items-center justify-center shadow-2xl border border-outline-variant/20 z-30"
      >
        <Edit3 className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default MessagingView;
