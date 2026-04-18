import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function seedDatabase() {
  try {
    const systemDoc = await getDoc(doc(db, 'users', 'system'));
    
    if (systemDoc.exists()) {
      console.log('Database already seeded.');
      return;
    }
  } catch (error: any) {
    if (error.message?.includes('offline')) {
      console.warn('Offline: Skipping seed check');
      return;
    }
    console.error('Seed check error:', error);
    return;
  }

  console.log('Seeding database...');

  try {
    const mockUsers = [
      {
        id: 'system',
      username: 'System Log',
      email: 'system@opensphere.io',
      professional_bio: 'Automated System Logs',
      is_verified: true,
      nodes: 0,
      trust_score: 100,
      following: [],
      credentials: [],
      documents: []
    },
    {
      id: 'user-1',
      username: 'Marcus Vane',
      email: 'marcus@opensphere.io',
      professional_bio: 'Principal Architect @ OpenSphere. Building the future of vibe-coded systems. Ex-Google, Ex-Meta.',
      is_verified: true,
      nodes: 1242,
      trust_score: 98,
      following: [],
      credentials: [
        { id: '1', title: 'Senior Systems Architect', issuer: 'OpenSphere', date: '2024' },
        { id: '2', title: 'Distributed Systems Specialization', issuer: 'Stanford', date: '2023' }
      ],
      documents: [
        { id: '1', title: 'Q4 Performance Audit', category: 'Certifications', date: '2024-12-15', status: 'VERIFIED', tags: ['Performance', 'Audit'] },
        { id: '2', title: 'Distributed Ledger Patent', category: 'Publications', date: '2024-10-20', status: 'VERIFIED', tags: ['Blockchain', 'Patent'] },
        { id: '3', title: 'OpenSphere Core Architecture', category: 'Research', date: '2024-08-05', status: 'VERIFIED', tags: ['Architecture', 'Core'] }
      ]
    },
    {
      id: 'user-2',
      username: 'Elena Thorne',
      email: 'elena@opensphere.io',
      professional_bio: 'L3 Network Specialist',
      is_verified: true,
      nodes: 800,
      trust_score: 95,
      following: [],
      credentials: [],
      documents: []
    },
    {
      id: 'user-3',
      username: 'Sarah Koto',
      email: 'sarah@opensphere.io',
      professional_bio: 'Decentralized Validator Expert',
      is_verified: true,
      nodes: 1500,
      trust_score: 99,
      following: [],
      credentials: [],
      documents: []
    },
    {
      id: 'user-4',
      username: 'CEO Hustle',
      email: 'ceo@opensphere.io',
      professional_bio: 'Scaling is a mindset.',
      is_verified: true,
      nodes: 5000,
      trust_score: 85,
      following: [],
      credentials: [],
      documents: []
    }
  ];

  for (const user of mockUsers) {
    await setDoc(doc(db, 'users', user.id), user);
  }

  const mockPosts = [
    {
      id: 'post-1',
      authorId: 'user-1',
      authorName: 'Marcus Vane',
      author: '@VANE_OPS',
      time: '2m ago',
      content: 'The current obsession with "minimal viable liquidity" is killing the market. We\'re trading depth for perceived velocity.',
      type: 'VIBE',
      tag: 'ERR_SLIPPAGE_DETECTED',
      stats: { comments: 24, reVibes: 12, likes: 182 },
      createdAt: Date.now() - 120000
    },
    {
      id: 'post-2',
      authorId: 'user-2',
      authorName: 'Elena Thorne',
      author: '@THORNE_DEV',
      time: '15m ago',
      content: 'Thinking about the intersection of L3 networks and localized gig economies. The latency reduction alone could unlock $4B in untapped trade volume.',
      type: 'VIBE',
      tag: '01:04:22 // ALPHA // PROTOCOL_UPDATE',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000',
      stats: { comments: 8, reVibes: 45, likes: 312 },
      createdAt: Date.now() - 900000
    },
    {
      id: 'post-10',
      authorId: 'system',
      authorName: 'System Log',
      author: '@system_log',
      type: 'SYSTEM',
      title: 'MARKET_PULSE_ALERT',
      content: 'ETH/USD VOLATILITY SPIKE +4.2%\\nLIQUIDATION_EVENT_ID: 99283-X\\nNODE_HEALTH: 99.98%',
      createdAt: Date.now() - 1000000
    },
    {
      id: 'post-5',
      authorId: 'user-3',
      authorName: 'Sarah Koto',
      author: '@KOTO_ALPHA',
      time: '42m ago',
      content: 'If we don\'t fix the incentive alignment for decentralized validators, the whole stack is just centralized infrastructure with extra steps.',
      type: 'VIBE',
      stats: { comments: 156, reVibes: 89, likes: 1200 },
      createdAt: Date.now() - 2520000
    },
    {
      id: 'post-6',
      authorId: 'user-4',
      authorName: 'CEO Hustle',
      author: '@ceo_hustle',
      time: '1h ago',
      content: 'Scaling is a mindset before it\'s a technology. If you can\'t describe your business in 3 characters, it\'s too complex.',
      type: 'VIBE',
      stats: { comments: 12, reVibes: 12, likes: 45 },
      createdAt: Date.now() - 3600000
    },
    {
      id: 'post-3',
      authorId: 'system',
      authorName: 'System Log',
      author: '@system_log',
      title: 'Recursive Consensus in Heterogeneous Networks',
      description: 'A framework for ultra-low latency bridging between L1 architectures and private corporate subnets.',
      type: 'GIG',
      category: 'RESEARCH PAPER',
      readTime: '12 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0nzbp34bJyRHhUgdh8ihVwY5OPviaacy9poC_3hjD5SZ9gVPK_Dc38q_j6Ok0DimaqI6IPcwFWvMVkT3fqlQsO6g8-lBErY5ssb0qwq-ZEpx5wVgjr4nquHyxdo13VmiHeSfQFWU1AS8L3BAQcZyBHc1Z9LBY61ZLfJ2ukXsesyomq5vfrTKMfEJsGz37mjP-jbY8dAByg1jVhqyFv9vlD9W3_ZuFBUp1czjWD9tIWy3273T3jJFitt5P9MZ-2l53n5iZXP6EMm-Z',
      createdAt: Date.now() - 4000000
    },
    {
      id: 'post-4',
      authorId: 'system',
      authorName: 'System Log',
      author: '@system_log',
      title: 'Q3 Growth Ecosystem Report',
      description: "Summary of OpenSphere's expansion into the EMEA market and decentralized identity adoption rates.",
      type: 'GIG',
      category: 'MILESTONE',
      readTime: 'DATA VISUALIZATION',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxoGtN9S_Y9uyfT5FpumEGi_J48sIIRveFux9fgd3euxcUY3dzmNZbpzLrve3O3C3HFH1FMV-4D5P6h6z5GO9ovJb_0Ne0d4I949iQfEiu-2WWX1YHD_bV_YGdXFurFMrXYLPp3AZ9HcCbnNOdytSiS-Zty1ZNZeVtrGAknh78CUmlBi5CONtR_qvtyGloGNOyOqoRq5cpxkvQw_PfPQYz_o9vUZQa49HDspqO-t22eaYeTyFOw01t1nQyCHH0iCebAkK8zHhKhOA5',
      createdAt: Date.now() - 5000000
    }
  ];

  for (const post of mockPosts) {
    await setDoc(doc(db, 'posts', post.id), post);
  }

  const mockLounges = [
    {
      id: 'lounge-1',
      name: 'Core Architecture Sync',
      creator_id: 'user-1',
      skill_thresholds: { 'System Design': 85, 'Rust': 70 },
      is_temporary: false,
      created_at: new Date().toISOString()
    },
    {
      id: 'lounge-2',
      name: 'DeFi Alpha Leak',
      creator_id: 'user-2',
      skill_thresholds: { 'Smart Contracts': 90, 'Solidity': 80 },
      is_temporary: true,
      created_at: new Date().toISOString()
    }
  ];

  for (const lounge of mockLounges) {
    await setDoc(doc(db, 'lounges', lounge.id), lounge);
  }

  const mockBounties = [
    {
      id: 'bounty-1',
      title: 'Optimize Redis Caching Layer',
      description: 'Need a senior backend engineer to optimize our Redis caching layer for the Unfiltered Feed. Current latency is ~150ms, need it under 50ms.',
      reward: '$2,500 USDC',
      creator_id: 'user-1',
      creator_name: 'Marcus Vane',
      status: 'OPEN',
      createdAt: Date.now() - 86400000
    },
    {
      id: 'bounty-2',
      title: 'Smart Contract Audit',
      description: 'Looking for an experienced auditor to review our new staking contract before mainnet launch. Must have previous experience with DeFi protocols.',
      reward: '$5,000 USDC',
      creator_id: 'user-2',
      creator_name: 'Elena Thorne',
      status: 'OPEN',
      createdAt: Date.now() - 172800000
    }
  ];

  for (const bounty of mockBounties) {
    await setDoc(doc(db, 'bounties', bounty.id), bounty);
  }

  console.log('Database seeded successfully.');
  } catch (error: any) {
    if (error.message?.includes('offline')) {
      console.warn('Offline: Seeding postponed');
      return;
    }
    console.error('Seeding error:', error);
  }
}
