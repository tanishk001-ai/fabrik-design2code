export interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface CaseStudy {
  id: number;
  client: string;
  title: string;
  year: string;
  image: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}
