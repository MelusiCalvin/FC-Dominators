export interface Player {
  id: number;
  name: string;
  position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
  jersey_number: number;
  bio: string;
  achievements?: string;
  date_of_birth?: string;
  nationality?: string;
  height?: string;
  weight?: string;
  photo: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Coach {
  id: number;
  name: string;
  role: 'head_coach' | 'assistant_coach' | 'fitness_coach' | 'youth_coach';
  bio: string;
  experience_years: number;
  certifications?: string;
  photo: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClubInfo {
  id: number;
  name: string;
  established_year: number;
  description: string;
  mission: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  active_members: number;
  expert_coaches: number;
  programs: number;
  years_of_excellence: number;
  logo?: string;
  banner_image?: string;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  age_group: string;
  schedule: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image?: string;
  created_at: string;
}
