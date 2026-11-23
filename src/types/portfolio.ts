export type AccentVariant = 'cyan' | 'orange';

export interface ProjectMetric {
  label: string;
  value: string;
  accent?: AccentVariant;
}

export interface ArchitectureLayer {
  layer: string;
  component: string;
  detail: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ConstructProject {
  id: string;
  nodeCode: string;
  title: string;
  subtitle: string;
  fullTitle: string;
  period: string;
  role: string;
  stack: string[];
  prestigeBadge?: string;
  coverImage: string;
  screenshots: ProjectScreenshot[];
  highlights: string[];
  metrics: ProjectMetric[];
  architectureSummary: string;
  architectureLayers: ArchitectureLayer[];
  repositoryUrl: string;
}

export interface SubroutineQuadrant {
  id: string;
  quadrantCode: string;
  title: string;
  subtitle: string;
  skills: string[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  accent: AccentVariant;
  tag: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  period: string;
  location: string;
  coursework: string[];
}

export interface PortfolioData {
  identity: {
    fullName: string;
    designation: string;
    roles: string[];
    location: string;
    availability: string;
    statusTelemetry: string;
    portraitUrl: string;
    email: string;
    phone: string;
    githubUrl: string;
    githubHandle: string;
    summary: string;
    heroMetrics: ProjectMetric[];
  };
  constructs: ConstructProject[];
  arsenal: SubroutineQuadrant[];
  education: EducationInfo;
  certifications: CredentialItem[];
  languages: string[];
}
