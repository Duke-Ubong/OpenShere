import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Edit2, ShieldCheck, FileText, Radio, 
  Zap, Lightbulb, ChevronRight, Sliders, Globe, 
  Lock, ArrowUpRight, Award, Bookmark, Grid, 
  Heart, MessageSquare, RefreshCw, Trash2, MapPin, 
  Link as LinkIcon, Share2, MoreVertical, Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface ProfileViewProps {
  user: any;
  posts: any[];
  onEdit: () => void;
  onNavigateToGigs: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, posts, onEdit, onNavigateToGigs }) => {
  const [activeTab, setActiveTab] = useState<'Gigs' | 'About' | 'Media'>('Gigs');

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Profile link copied to clipboard');
  };

  const handleViewCaseStudy = (title: string) => {
    toast.info(`Opening case study: ${title}`);
  };

  const handleBroadcastSignal = () => {
    toast.success('Initiating global broadcast signal...');
  };

  // Filter posts to show "Alex V" style content
  const gigs = [
    {
      id: 'g1',
      tag: 'CASE STUDY',
      time: '3 days ago',
      title: 'Redesigning the Global Logistics Interface for Aeroflow',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=2000',
      description: 'A deep dive into how we reduced operational friction by 40% through a custom Tonal Architecture system for real-time freight tracking.',
      stats: { likes: '1.2k', comments: '84' }
    },
    {
      id: 'g2',
      tag: 'ARTICLE',
      time: '1 week ago',
      title: 'The Future of Editorial UI in Professional Platforms',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000',
      description: 'Why professional networks are moving away from traditional container-based layouts and towards fluid, editorial-first experiences.',
      stats: { likes: '856', comments: '42' }
    }
  ];

  const milestones = [
    { date: '2024', event: 'Founded Neural Collective', type: 'MAINTAINER' },
    { date: '2022', event: 'Lead Architect at Fortune Tech', type: 'TENURE' },
    { date: '2019', event: 'Patent: Adaptive Mesh UI', type: 'INVENTOR' },
  ];

  const media = [
    { id: 'm1', type: 'SIGNAL', title: 'Dynamic Mesh Flow', preview: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800' },
    { id: 'm2', type: 'SIGNAL', title: 'Editorial Grid System', preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
    { id: 'm3', type: 'SIGNAL', title: 'Vibe Dial Interaction', preview: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800' },
  ];

  const credentials = [
    { title: 'System-1 Certified', issuer: 'PRO-RAW', date: '2024' },
    { title: 'Neural Architect', issuer: 'IEEE', date: '2023' },
  ];

  return (
    <div className="flex-1 bg-surface min-h-screen pb-[120px] overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Cover / Header Section */}
      <div className="relative h-[320px] bg-gradient-to-br from-[#0a2e2a] via-[#1a4a44] to-[#0a2e2a] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
        
        {/* Abstract Mesh Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#00ffab]/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[60%] bg-[#00ffab]/5 blur-[100px] rounded-full"></div>
        
        {/* Decorative Trajectory Line */}
        <div className="absolute bottom-10 left-0 right-0 h-[1px] bg-white/5 flex items-center justify-center gap-20">
           {['NODES', 'VAULT', 'PULSE', 'GRID'].map(tag => (
             <span key={tag} className="text-[8px] font-black text-white/20 tracking-[0.5em]">{tag}</span>
           ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 -mt-24 relative z-20 pb-20">
        {/* Profile Identity Block */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
           <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative group">
                 <div className="absolute -inset-2 bg-[#00ffab]/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                 <div className="w-40 h-40 rounded-[32px] overflow-hidden border-[6px] border-surface bg-surface-container-low shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.02] duration-500 relative z-10">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000" alt="Mock Profile" className="w-full h-full object-cover" />
                    )}
                 </div>
                 <div className="absolute -top-3 -right-3 w-12 h-12 bg-on-surface rounded-2xl flex items-center justify-center text-[#00ffab] border-4 border-surface shadow-lg z-20 hover:scale-110 transition-transform cursor-pointer group/medal">
                    <Award className="w-6 h-6" />
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-on-surface text-surface text-[10px] font-black rounded-lg opacity-0 group-hover/medal:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl">
                       TOP TIER CONTRIBUTOR
                    </div>
                 </div>
              </div>

              <div className="pb-2 space-y-1">
                  <div className="flex items-center gap-3">
                     <h1 className="text-5xl font-black font-headline tracking-tighter text-on-surface">{user?.username || 'Alex V.'}</h1>
                     <CheckCircle2 className={`w-6 h-6 ${user?.is_verified ? 'text-[#00ffab]' : 'text-primary-container'}`} />
                  </div>
                  <div className="flex items-center gap-3">
                     <p className="text-xl font-medium text-on-surface/80 uppercase tracking-tight">{user?.professional_bio?.slice(0, 30) || 'Principal Product Architect'}</p>
                     <span className="w-1.5 h-1.5 rounded-full bg-[#00ffab] animate-pulse"></span>
                     <span className="text-[10px] font-black text-[#00ffab] tracking-widest uppercase">Live Now</span>
                  </div>
              </div>
           </div>

            <div className="flex items-center gap-3">
               <button 
                 onClick={handleShare}
                 className="px-8 py-3 bg-surface-container-highest/40 backdrop-blur-md border border-outline-variant/20 rounded-2xl text-sm font-bold tracking-tight hover:bg-surface-container-highest transition-all flex items-center gap-2 shadow-lg group active:scale-95"
               >
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Share
               </button>
               <button 
                 onClick={onEdit}
                 className="px-8 py-3 bg-on-surface text-surface rounded-2xl text-sm font-black tracking-tight hover:opacity-90 active:scale-95 transition-all shadow-xl flex items-center gap-2"
               >
                  <Edit2 className="w-4 h-4" /> Edit Profile
               </button>
            </div>
        </div>

        {/* Bio Details - Modern Metadata */}
        <div className="flex flex-wrap gap-8 text-sm font-medium text-outline mb-10 tracking-tight">
           <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-container" /> {user?.location || 'San Francisco, CA'}
           </div>
           <a href={`https://${user?.website || 'alexvance.design'}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary-container hover:text-on-surface transition-all group">
              <LinkIcon className="w-4 h-4 group-hover:rotate-45 transition-transform" /> {user?.website || 'alexvance.design'}
           </a>
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ffab]" /> {user?.is_verified ? 'Verified Expert' : 'Identity Verified'}
           </div>
        </div>

        <p className="text-2xl font-medium text-on-surface-variant max-w-2xl leading-[1.4] mb-16 italic font-serif">
           "{user?.professional_bio || 'Architecting digital ecosystems for Fortune 500s. Specializing in high-velocity product delivery and editorial UI systems.'}"
        </p>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-surface-container-low/50 border border-outline-variant/10 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
           >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary-container/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-3 relative z-10">Gigs Completed</h3>
              <div className="text-5xl font-black tracking-tighter text-on-surface relative z-10">{user?.nodes || 0}</div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-surface-container-low/50 border border-outline-variant/10 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
           >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#00ffab]/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-3 relative z-10">Vibe Score</h3>
              <div className="flex items-baseline gap-3 relative z-10">
                 <div className="text-5xl font-black tracking-tighter text-[#00ffab]">{user?.trust_score || '0.0'}</div>
                 <span className="px-2 py-0.5 bg-[#00ffab]/10 border border-[#00ffab]/20 rounded text-[9px] font-black text-[#00ffab] tracking-widest uppercase">Top Tier</span>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-surface-container-low/50 border border-outline-variant/10 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
           >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-on-surface/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-3 relative z-10">Network Size</h3>
              <div className="text-5xl font-black tracking-tighter text-on-surface relative z-10">{user?.followers?.length || 0}</div>
           </motion.div>
        </div>

        {/* Dynamic Tabs */}
        <div className="flex gap-10 border-b border-outline-variant/10 mb-16 px-2">
           {(['Gigs', 'About', 'Media'] as const).map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`pb-4 text-sm font-black uppercase tracking-[0.1em] transition-all relative ${
                 activeTab === tab ? 'text-on-surface' : 'text-outline hover:text-on-surface'
               }`}
             >
               {tab}
               {activeTab === tab && (
                 <motion.div layoutId="profileTabLine" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-on-surface rounded-full" />
               )}
             </button>
           ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.3 }}
           >
             {activeTab === 'Gigs' && (
               <div className="space-y-24">
                  {gigs.map((gig) => (
                    <div key={gig.id} className="group cursor-pointer">
                       <div className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase mb-4">
                          <span className="px-2 py-1 bg-primary-container/10 border border-primary-container/20 text-primary-container rounded">{gig.tag}</span>
                          <span className="text-outline">{gig.time}</span>
                       </div>
                       <h2 className="text-4xl font-black tracking-tighter text-on-surface mb-6 group-hover:text-primary-container transition-colors leading-tight max-w-2xl">
                          {gig.title}
                       </h2>
                       <div className="aspect-video rounded-[40px] overflow-hidden border border-outline-variant/10 shadow-2xl mb-8 relative">
                          <img src={gig.image} alt={gig.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Zap className="w-12 h-12 text-white/50 animate-pulse" />
                          </div>
                       </div>
                       <p className="text-xl font-medium text-on-surface-variant leading-relaxed max-w-3xl mb-8">
                          {gig.description}
                       </p>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-8">
                             <div className="flex items-center gap-2 text-outline font-bold hover:text-primary-container transition-colors cursor-pointer group/stat active:scale-90" onClick={() => toast.success('Added to favorites')}>
                                <Heart className="w-5 h-5" /> {gig.stats.likes}
                             </div>
                             <div className="flex items-center gap-2 text-outline font-bold hover:text-primary-container transition-colors cursor-pointer group/stat active:scale-90" onClick={() => toast.info('Comments coming soon')}>
                                <MessageSquare className="w-5 h-5" /> {gig.stats.comments}
                             </div>
                          </div>
                          <button 
                            onClick={() => handleViewCaseStudy(gig.title)}
                            className="flex items-center gap-2 text-sm font-black text-primary-container hover:underline uppercase tracking-widest active:scale-95 transition-transform"
                          >
                             View Case Study <ArrowUpRight className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
             )}

             {activeTab === 'About' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12">
                     <section>
                        <h3 className="text-xl font-black font-headline uppercase tracking-tight mb-6">Biography</h3>
                        <p className="text-on-surface-variant leading-relaxed font-medium">
                           Alex V. is a multi-disciplinary designer focused on bridging the gap between high-level architectural thinking and meticulous interface craft. With a background in both engineering and fine arts, he creates digital systems that are as technically robust as they are visually arresting.
                        </p>
                     </section>

                     <section>
                        <h3 className="text-xl font-black font-headline uppercase tracking-tight mb-6">Trajectory</h3>
                        <div className="space-y-6">
                           {milestones.map((m, idx) => (
                             <div key={idx} className="flex gap-6 items-start group">
                                <div className="text-xs font-black text-outline pt-1">{m.date}</div>
                                <div className="flex-1">
                                   <div className="text-[10px] font-black text-primary-container uppercase tracking-[0.2em] mb-1">{m.type}</div>
                                   <div className="text-lg font-bold text-on-surface group-hover:text-primary-container transition-colors">{m.event}</div>
                                </div>
                             </div>
                           ))}
                        </div>
                     </section>
                  </div>

                  <div className="space-y-12">
                     <section>
                        <h3 className="text-xl font-black font-headline uppercase tracking-tight mb-6">Core Competencies</h3>
                        <div className="flex flex-wrap gap-4">
                           {['Systems Architecture', 'Editorial UI', 'Neural Branding', 'Motion Graphics', 'Functional Aesthetics'].map(skill => (
                             <div key={skill} className="px-5 py-3 bg-surface-container-high border border-outline-variant/10 rounded-[20px] shadow-sm hover:shadow-lg hover:border-primary-container/30 transition-all group">
                                <div className="text-xs font-bold tracking-tight mb-2 group-hover:text-primary-container">{skill}</div>
                                <div className="h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                                   <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary-container"></motion.div>
                                </div>
                             </div>
                           ))}
                        </div>
                     </section>

                     <section className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffab]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#00ffab] mb-6 flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4" /> Credentials
                        </h3>
                        <div className="space-y-4 relative z-10">
                           {credentials.map((cred, idx) => (
                             <div key={idx} className="flex justify-between items-center p-3 bg-surface rounded-2xl border border-outline-variant/10">
                                <div>
                                   <div className="text-sm font-bold text-on-surface">{cred.title}</div>
                                   <div className="text-[10px] text-outline uppercase font-black tracking-widest">{cred.issuer}</div>
                                </div>
                                <div className="text-xs font-medium text-outline">{cred.date}</div>
                             </div>
                           ))}
                        </div>
                     </section>
                  </div>
               </div>
             )}

             {activeTab === 'Media' && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {media.map((item) => (
                    <div key={item.id} className="group relative aspect-square rounded-[32px] overflow-hidden border border-outline-variant/10 shadow-lg cursor-pointer">
                       <img src={item.preview} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                          <div className="text-[10px] font-black text-primary-container uppercase tracking-widest mb-1">{item.type}</div>
                          <div className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</div>
                       </div>
                       <div className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Zap className="w-4 h-4" />
                       </div>
                    </div>
                  ))}
                  <div 
                    onClick={handleBroadcastSignal}
                    className="aspect-square rounded-[32px] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-3 text-outline hover:border-primary-container/40 hover:text-primary-container transition-all cursor-pointer group active:scale-95"
                  >
                     <Plus className="w-8 h-8 group-hover:scale-125 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Broadcast Signal</span>
                  </div>
               </div>
             )}
           </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);


export default ProfileView;
