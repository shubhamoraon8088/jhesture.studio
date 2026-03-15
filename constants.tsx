
import { PortfolioItem, Service } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'PodCast',
    category: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://youtube.com/shorts/qfoajV0oOpY?feature=share'
  },
  {
    id: '2',
    title: 'Walkthrough',
    category: 'Content Strategy',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://youtube.com/shorts/WhoLL4CBJyE?feature=share'
  },
  {
    id: '3',
    title: 'Inspirational',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1485462195733-1469e3a67732?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://youtube.com/shorts/Cyclnd_9UdQ?feature=share'
  },
  {
    id: '4',
    title: 'Cinematic Motivation',
    category: 'Visual Design',
    image: 'https://images.unsplash.com/photo-1539109132314-3475d24c2195?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://www.youtube.com/watch?v=hLtaSVUdQ9o'
  },
  {
    id: '5',
    title: 'Typography',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1481325545291-943f4eee1ad9?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://youtu.be/Zorl0Af5R3Y?si=o2DqbY7kKGDjQwqO',
    hoverVideo: 'https://youtu.be/-Rv6hzeXx98?si=tEjck8yuE6mJv6LY'
  },
  {
    id: '6',
    title: 'Tutorials',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    video: 'https://youtu.be/_kCzG6oe_pE'
  },
  {
    id: '7',
    title: 'Sports',
    category: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://youtu.be/qw3GEP51vqY?si=Ult1-ZHiZVcGUuFX',
    hoverVideo: 'https://youtu.be/lFIlCzw1hlc?si=xNeZEPyF5gVHg8jI'
  },
  {
    id: '8',
    title: 'Youtube',
    category: 'VFX & Motion',
    image: 'https://images.unsplash.com/photo-1529139513055-07f9127ef3b0?auto=format&fit=crop&q=80&w=1200',
    hoverImage: 'https://images.unsplash.com/photo-1539109132314-3475d24c2195?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    video: 'https://youtu.be/1ohAKsiLLl8',
    hoverVideo: 'https://youtu.be/_VzLfXaH9b4'
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
