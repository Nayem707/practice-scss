import type { LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface HeroTech {
  label: string;
  icon: LucideIcon;
}

export interface HeroCta {
  label: string;
  to: string;
}

export interface HeroContent {
  eyebrow: string;
  /** Rendered as separately revealed lines; the last line gets the gradient. */
  titleLines: readonly string[];
  lead: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  stackLabel: string;
  techs: readonly HeroTech[];
}
