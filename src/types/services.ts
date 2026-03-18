export type ServiceCategory =
  | "Health & Body"
  | "Money & Career"
  | "Relationships"
  | "Mind & Mood"
  | "Home & Life";

export interface Service {
  id: number;
  name: string;
  keyword: string;
  category: ServiceCategory;
  price_monthly: number;
  tagline: string;
  description: string;
  sample_text: string;
  frequency: string;
  reply_format: string;
  escalation: string;
  setup_questions: string[];
  weekly_report: boolean;
  streak_tracking: boolean;
  emoji: string;
}

export interface ServiceCatalog {
  services: Service[];
}
