
import React from 'react';

export type PageType = 'home' | 'elementary' | 'junior' | 'senior' | 'bulletin';

export interface NavItem {
  label: string;
  page: PageType;
  dropdown?: { label: string; id: string }[];
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string; // Full content for modal
  image: string;
  date: string;
  category: 'highlight' | 'normal' | 'event';
  targetGrade?: 'elementary' | 'junior' | 'senior' | 'all';
  externalLink?: string; // Optional external link (e.g., Instagram)
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  image: string;
  status: 'upcoming' | 'past';
  description: string;
}
