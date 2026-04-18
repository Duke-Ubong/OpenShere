import React from 'react';
import { Search, Bell, Filter, Command, TrendingUp, ChevronRight, ArrowRight, User, Users2, Building2, Zap, History, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchViewProps {
  currentUser: any;
  onFollowUser: (userId: string) => void;
  onNavigateToProfile: () => void;
}

const SearchView: React.FC<SearchViewProps> = ({ currentUser, onFollowUser, onNavigateToProfile }) => {
  const categories = ['All', 'People', 'Jobs', 'Posts'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const trendingItems = [
    { tag: '#QuarterlyResilience', description: '12.4k executives discussing strategy' },
    { tag: '#HedgeFundHiring', description: '8.2k active job postings this week' },
    { tag: '#DigitalEuroFuture', description: '3.1k policy briefs shared' }
  ];

  const experts = [
    {
      id: 'expert-1',
      name: 'Elena Rodriguez',
      role: 'Principal Venture Architect',
      badge: 'STANFORD ALUMNI',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      id: 'expert-2',
      name: 'Marcus Chen',
      role: 'Quant Strategist',
      badge: 'MIT RESEARCH',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    }
  ];

  const groups = [
    { name: 'Fintech Founders Collective', members: '2,403 members', active: '12 active today', icon: <Building2 className="w-5 h-5 text-primary-container" /> },
    { name: 'High-Yield Alpha Network', members: '856 members', active: '4 active today', icon: <TrendingUp className="w-5 h-5 text-primary-container" /> },
    { name: 'M&A Strategy Roundtable', members: '1,290 members', active: '8 active today', icon: <Users2 className="w-5 h-5 text-primary-container" /> }
  ];

  return (
    <div className="flex-1 bg-surface min-h-screen pb-[100px] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 bg-surface/80 backdrop-blur-xl z-20 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div 
            onClick={onNavigateToProfile}
            className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 cursor-pointer"
          >
            {currentUser?.profileImage ? (
              <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-6 h-6 text-outline" />
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold tracking-tight">Search & Discovery</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="px-6 py-4">
        {/* Search Bar */}
        <div className="relative group mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-outline group-focus-within:text-primary-container transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="Search roles, market trends, or ex..."
            className="w-full bg-surface-container-high border border-outline-variant/30 rounded-2xl py-4 pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container/50 transition-all text-sm font-medium"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <div className="flex items-center gap-1 bg-surface-container px-1.5 py-0.5 rounded border border-outline-variant/50">
              <Command className="w-3 h-3 text-outline" />
              <span className="text-[10px] font-bold text-outline">K</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-on-surface text-surface' 
                  : 'bg-surface-container border border-outline-variant/20 text-outline hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trending Section */}
        <section className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-32 h-32" />
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-black tracking-tighter mb-1">Trending in Finance</h2>
              <p className="text-xs text-outline font-medium">Real-time market velocity and shifts.</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary-container hover:text-primary-container/80 transition-colors">
              Global Heatmap
            </button>
          </div>

          <div className="space-y-6">
            {trendingItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center group/item cursor-pointer">
                <div>
                  <h3 className="font-bold text-base group-hover/item:text-primary-container transition-colors">{item.tag}</h3>
                  <p className="text-xs text-outline">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 text-primary-container">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">View analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Experts */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black tracking-tighter">Recommended Experts</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-surface-container border border-outline-variant/20 rounded-full hover:bg-surface-container-high transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 bg-surface-container border border-outline-variant/20 rounded-full hover:bg-surface-container-high transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
            {experts.map(expert => (
              <div key={expert.id} className="min-w-[280px] bg-surface-container border border-outline-variant/10 rounded-3xl p-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 border border-outline-variant/30">
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-lg mb-1">{expert.name}</h3>
                <p className="text-xs text-outline font-medium mb-1">{expert.role}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-outline/60 mb-6">{expert.badge}</p>
                <button 
                  onClick={() => onFollowUser(expert.id)}
                  className="w-full py-3 bg-on-surface text-surface rounded-xl font-black text-sm hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Metric of the Day */}
        <section className="bg-surface-container-highest border border-outline-variant/10 rounded-3xl p-8 mb-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-primary-container/20 rounded-lg mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-container">METRIC OF THE DAY</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter mb-4">+14.2%</h2>
            <p className="text-lg font-bold mb-6 leading-tight">Fintech IPO Interest spikes among late-stage VC funds this morning.</p>
            <div className="flex items-center gap-2 text-outline">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">Highest growth in 6 months</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[-20%] transform -translate-y-1/2 rotate-12 opacity-10">
             <TrendingUp className="w-64 h-64 text-primary-container" />
          </div>
        </section>

        {/* Suggested Groups */}
        <section className="mb-8">
          <h2 className="text-xl font-black tracking-tighter mb-6">Suggested Groups</h2>
          <div className="space-y-4">
            {groups.map((group, idx) => (
              <div key={idx} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-base">{group.name}</h3>
                    <p className="text-xs text-outline">{group.members} • {group.active}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-highest border border-outline-variant/20 text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container-high transition-colors">
                  Request Access
                </button>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-primary-container font-black text-sm uppercase tracking-widest mt-6 hover:opacity-80 transition-opacity">
            Discover more groups
          </button>
        </section>
      </div>
    </div>
  );
};

export default SearchView;
