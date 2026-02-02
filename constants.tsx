
import { PortfolioItem, Service } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'PodCast',
    category: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/client 1.mp4'
  },
  {
    id: '2',
    title: 'Walkthrough',
    category: 'Content Strategy',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/client2.mp4'
  },
  {
    id: '3',
    title: 'Inspirational',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1485462195733-1469e3a67732?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/lady reel.mp4'
  },
  {
    id: '4',
    title: 'Cinematic Motivation',
    category: 'Visual Design',
    image: 'https://images.unsplash.com/photo-1539109132314-3475d24c2195?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/motivation.mp4'
  },
  {
    id: '5',
    title: 'Typography',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1481325545291-943f4eee1ad9?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/fonts 2.mp4',
    hoverVideo: '/capcot pro.mp4'
  },
  {
    id: '6',
    title: 'Tutorials',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    video: '/ai documentry video 4k.mp4'
  },
  {
    id: '7',
    title: 'Sports',
    category: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/sports.mp4',
    hoverVideo: '/football.mp4'
  },
  {
    id: '8',
    title: 'Youtube',
    category: 'VFX & Motion',
    image: 'https://images.unsplash.com/photo-1529139513055-07f9127ef3b0?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1539109132314-3475d24c2195?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: '/study hack sample.mp4',
    hoverVideo: '/tribal titan02.mp4'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Wedding & Event Cinema',
    description: 'Emotion-driven storytelling for life\'s biggest moments.',
    offerings: [
      'Wedding Films & Highlights',
      'Engagement / Pre-Wedding Stories',
      'Reception & Party Edits',
      'Same-Day Edit Films',
      'Teaser Trailers',
      'Full-Length Documentary Cuts',
      'Event Aftermovies',
      'Corporate Events & Launch Nights'
    ]
  },
  {
    id: 's2',
    name: 'Social-First Content',
    description: 'Designed for attention, engineered for platforms.',
    offerings: [
      'YouTube Long-Form Edits',
      'Instagram Reels & TikToks',
      'Podcast Video Cuts',
      'Vlogs & Creator Content',
      'Short-Form Series',
      'Vertical Ad Creatives',
      'Motion Captions & Subtitles',
      'Retention-Focused Re-Edits'
    ]
  },
  {
    id: 's3',
    name: 'Brand Commercials',
    description: 'High-impact visuals for products, campaigns, and premium brands.',
    offerings: [
      'Product Films',
      'Ad Campaign Edits',
      'Fashion & Lifestyle Spots',
      'Luxury Brand Videos',
      'Launch Trailers',
      'Corporate Brand Films',
      'Promotional Reels',
      'Cinematic B-Roll Packages'
    ]
  }
];
