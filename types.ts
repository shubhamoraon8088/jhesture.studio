
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  hoverImage: string;
  year: string;
  video?: string; // Optional video file path
  hoverVideo?: string; // Optional second video for hover state
}

export interface Service {
  id: string;
  name: string;
  description: string;
  offerings?: string[];
}
