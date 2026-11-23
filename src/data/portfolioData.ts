import portraitMauricio from '../assets/portrait-mauricio.jpg';

import hairmixerHome from '../references/hairmixer/home.png';
import hairmixerDiscover from '../references/hairmixer/image1.png';
import hairmixerCatalog from '../references/hairmixer/image2.png';
import hairmixerQuiz from '../references/hairmixer/image7.png';
import hairmixerResults from '../references/hairmixer/image8.png';

import pconnectHome from '../references/pconnect/home.jpg';
import pconnectRegister from '../references/pconnect/pcon1.jpg';
import pconnectPortal from '../references/pconnect/pcon2.jpg';

import tjfitnessHome from '../references/tjfitness/home.png';
import tjfitnessWorkouts from '../references/tjfitness/gym.png';
import tjfitnessDashboard from '../references/tjfitness/gym2.png';

import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  identity: {
    fullName: 'John Mathew B. Mauricio',
    designation: 'Web Developer | Programmer | AI Researcher',
    roles: ['Web Developer', 'Programmer', 'AI Researcher'],
    location: 'Zamboanga City, Philippines',
    availability: 'Open to Remote/WFH & On-Site',
    statusTelemetry: 'Available · Zamboanga, PH',
    portraitUrl: portraitMauricio,
    email: 'johnmathewmau@gmail.com',
    phone: '+63 956 628 4039',
    githubUrl: 'https://github.com/matchewmau',
    githubHandle: 'github.com/matchewmau',
    summary:
      'Computer Science graduate and Career Service Professional Eligible software developer with experience in full-stack web development, system architecture, and AI. Skilled in React.js, Next.js, Node.js, Laravel, and Python, with experience building responsive, user-focused applications and deep learning solutions presented internationally at ECAI 2026.',
    heroMetrics: [
      {
        value: 'ECAI 2026',
        label: 'International AI Publication',
        accent: 'orange',
      },
      {
        value: 'CSC Professional',
        label: 'Civil Service Eligible (PH)',
        accent: 'orange',
      },
      {
        value: '40% Faster',
        label: 'CV Inference & Render Pipeline',
        accent: 'cyan',
      },
      {
        value: '<200ms API',
        label: 'High-Load B2B Query Latency',
        accent: 'cyan',
      },
    ],
  },
  constructs: [
    {
      id: 'hairmixer',
      nodeCode: '01',
      title: 'HairMixer',
      subtitle: 'AI-Powered Hairstyle Recommendation & Simulation System',
      fullTitle: 'HairMixer — AI-Powered Hairstyle Recommendation & Simulation System',
      period: 'May 2026',
      role: 'Lead Developer & Lead Researcher',
      stack: ['Python', 'ResNet50', 'OpenCV', 'React.js', 'FastAPI'],
      prestigeBadge: 'ECAI 2026 Published',
      coverImage: hairmixerHome,
      screenshots: [
        {
          src: hairmixerHome,
          alt: 'HairMixer landing page showing 3-step AI hairstyle workflow',
          caption: 'Landing Interface & 3-Step Virtual Try-On Workflow',
        },
        {
          src: hairmixerDiscover,
          alt: 'HairMixer hairstyle discovery view with category filters',
          caption: 'Interactive Style Discovery & Category Filtering',
        },
        {
          src: hairmixerCatalog,
          alt: 'HairMixer curated hairstyle catalog cards',
          caption: 'Curated Hairstyle Library with Face-Shape Compatibility Tags',
        },
        {
          src: hairmixerQuiz,
          alt: 'HairMixer 13-step user hair preference questionnaire',
          caption: 'Guided Multi-Step Hair Texture & Preference Profiler',
        },
        {
          src: hairmixerResults,
          alt: 'HairMixer recommended hairstyles with match percentages',
          caption: 'CNN Facial Structure Analysis & Ranked Match Scores',
        },
      ],
      highlights: [
        'Architected and trained an end-to-end computer vision pipeline using Convolutional Neural Networks (ResNet50) and OpenCV for multi-class facial structure classification and landmark mapping.',
        'Engineered a full-stack interactive simulation web app using React.js and FastAPI, reducing client-side inference and rendering latency by 40% for seamless virtual hairstyle previews.',
        'Authored peer-reviewed manuscript "HairMixer: A Hairstyle Recommendation and Simulation System Based on Facial Structure Using CNNs", accepted for presentation and publication at ECAI 2026.',
      ],
      metrics: [
        {
          value: '40% Latency Reduction',
          label: 'Client-Side Inference & Rendering',
          accent: 'cyan',
        },
        {
          value: 'ECAI 2026',
          label: 'Peer-Reviewed International Publication',
          accent: 'orange',
        },
        {
          value: 'ResNet50 + OpenCV',
          label: 'Multi-Class Facial Landmark Pipeline',
          accent: 'cyan',
        },
      ],
      architectureSummary:
        'Decoupled full-stack computer vision architecture pairing an asynchronous FastAPI inference service with a responsive React.js simulation interface. Uploaded portraits pass through OpenCV landmark alignment before ResNet50 face-shape classification and ranked hairstyle matching.',
      architectureLayers: [
        {
          layer: 'Frontend Client',
          component: 'React.js Simulation & Discovery UI',
          detail:
            'Guided preference wizard, category filtering, and client-side frame optimization cutting preview latency by 40%.',
        },
        {
          layer: 'Inference API',
          component: 'FastAPI Async Service',
          detail:
            'Non-blocking image payload validation, preprocessing orchestration, and low-latency model inference endpoints.',
        },
        {
          layer: 'Vision Pipeline',
          component: 'OpenCV + ResNet50 CNN',
          detail:
            '68-point facial landmark normalization and multi-class facial geometry classification.',
        },
      ],
      repositoryUrl: 'https://github.com/matchewmau',
    },
    {
      id: 'pconnect',
      nodeCode: '02',
      title: 'PConnect',
      subtitle: 'B2B Distribution & E-Commerce Platform',
      fullTitle: 'PConnect — B2B Distribution & E-Commerce Platform',
      period: 'Mar. 2025 - Sept. 2026',
      role: 'Project Manager & Lead Developer',
      stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
      coverImage: pconnectHome,
      screenshots: [
        {
          src: pconnectHome,
          alt: 'PConnect B2B storefront and distributor category browse page',
          caption: 'Multi-Tenant B2B Marketplace & Regional Distributor Directory',
        },
        {
          src: pconnectRegister,
          alt: 'PConnect distributor verification and BIR/SEC registration form',
          caption: 'Distributor Onboarding with BIR Form 2303 & SEC Verification',
        },
        {
          src: pconnectPortal,
          alt: 'PConnect supplier subscription plans and inventory dashboard',
          caption: 'Supplier Subscription Tiers, Inventory Sync & Order Management',
        },
      ],
      highlights: [
        'Directed full-cycle agile development and database architecture for a multi-tenant B2B commerce platform bridging regional suppliers and bulk commercial retailers.',
        'Implemented role-based access control (RBAC), multi-tier transaction commission models, and real-time inventory synchronization, reducing manual order processing overhead by 35%.',
        'Optimized Eloquent ORM queries, indexing, and REST API endpoints, sustaining sub-200ms response times during heavy transactional data reads.',
      ],
      metrics: [
        {
          value: '35% Overhead Cut',
          label: 'Automated Order & Commission Ops',
          accent: 'cyan',
        },
        {
          value: '<200ms API',
          label: 'Heavy Transactional Read Response',
          accent: 'cyan',
        },
        {
          value: 'Multi-Tenant RBAC',
          label: 'Supplier & Bulk Retailer Isolation',
          accent: 'cyan',
        },
      ],
      architectureSummary:
        'Multi-tenant B2B commerce platform built on Laravel and MySQL to connect verified regional distributors with commercial retail buyers. Combines document-verified onboarding, tiered commission workflows, and real-time stock synchronization.',
      architectureLayers: [
        {
          layer: 'Commerce Experience',
          component: 'Tailwind CSS + JavaScript Portals',
          detail:
            'Dedicated distributor storefronts, compliance onboarding forms, and bulk order tracking dashboards.',
        },
        {
          layer: 'Business Logic',
          component: 'Laravel RBAC & Commission Engine',
          detail:
            'Role-isolated access policies, subscription plan enforcement, and automated transaction commission splits.',
        },
        {
          layer: 'Database Layer',
          component: 'Indexed MySQL & Tuned Eloquent ORM',
          detail:
            'Composite indexing and eager-loaded relational queries sustaining sub-200ms API read performance.',
        },
      ],
      repositoryUrl: 'https://github.com/matchewmau',
    },
    {
      id: 'tj-fitness',
      nodeCode: '03',
      title: 'TJ Fitness',
      subtitle: 'Full-Stack Gym Management System',
      fullTitle: 'TJ Fitness — Full-Stack Gym Management System',
      period: 'Aug. 2024 - Nov. 2024',
      role: 'Full-Stack Developer',
      stack: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Git'],
      coverImage: tjfitnessHome,
      screenshots: [
        {
          src: tjfitnessHome,
          alt: 'TJ Fitness Gym landing page hero section',
          caption: 'Public Gym Landing Page & Membership Onboarding Portal',
        },
        {
          src: tjfitnessWorkouts,
          alt: 'TJ Fitness member workout catalog with difficulty filters',
          caption: 'Member Workout Programs & Difficulty Level Filtering',
        },
        {
          src: tjfitnessDashboard,
          alt: 'TJ Fitness administrative dashboard with analytics and schedule',
          caption: 'Admin Dashboard with Active Memberships, Calendar & Signup Trends',
        },
      ],
      highlights: [
        'Designed and deployed a centralized management web system to automate member onboarding, subscription renewals, daily attendance, and financial tracking.',
        'Created responsive administrative dashboards with automated expiry notifications, decreasing front-desk administrative paperwork.',
        'Standardized modular MVC architecture and Git branch management workflows to ensure continuous integration and maintain high code quality.',
      ],
      metrics: [
        {
          value: 'Automated Ops',
          label: 'Onboarding, Attendance & Renewals',
          accent: 'cyan',
        },
        {
          value: 'Live Alerts',
          label: 'Subscription Expiry Notifications',
          accent: 'cyan',
        },
        {
          value: 'Modular MVC',
          label: 'Standardized PHP & Git Workflow',
          accent: 'cyan',
        },
      ],
      architectureSummary:
        'Centralized gym operations web application built on a clean modular PHP MVC architecture and MySQL database. Streamlines member registration, curated workout access, subscription expiry alerts, and monthly signup analytics.',
      architectureLayers: [
        {
          layer: 'Member & Admin UI',
          component: 'Responsive Tailwind CSS + JS Views',
          detail:
            'Clean workout browsing for members paired with real-time KPI cards, calendar scheduling, and analytics charts for staff.',
        },
        {
          layer: 'Application Core',
          component: 'Modular PHP MVC Architecture',
          detail:
            'Structured controllers and domain models for membership billing cycles, attendance logs, and expiry notifications.',
        },
        {
          layer: 'Relational Storage',
          component: 'MySQL Operational Schema',
          detail:
            'Normalized tables tracking active/inactive members, subscription renewals, workout catalogs, and financial records.',
        },
      ],
      repositoryUrl: 'https://github.com/matchewmau',
    },
  ],
  arsenal: [
    {
      id: 'languages',
      quadrantCode: '01',
      title: 'Languages',
      subtitle: 'Core Programming & Query Languages',
      skills: [
        'Python',
        'JavaScript (ES6+)',
        'TypeScript',
        'PHP',
        'C++',
        'SQL (MySQL, PostgreSQL)',
        'HTML5',
        'CSS3',
      ],
    },
    {
      id: 'frameworks',
      quadrantCode: '02',
      title: 'Frameworks & Libraries',
      subtitle: 'Modern Web Runtimes & UI Systems',
      skills: [
        'React.js',
        'Next.js',
        'Node.js',
        'Express.js',
        'Laravel',
        'Django',
        'FastAPI',
        'Tailwind CSS',
      ],
    },
    {
      id: 'ai-ml',
      quadrantCode: '03',
      title: 'AI & Machine Learning',
      subtitle: 'Computer Vision & Deep Learning',
      skills: [
        'Convolutional Neural Networks (CNNs)',
        'ResNet50',
        'OpenCV',
        'Generative AI & LLM APIs',
        'Deep Learning',
      ],
    },
    {
      id: 'tools',
      quadrantCode: '04',
      title: 'Tools & Infrastructure',
      subtitle: 'DevOps, API Testing & Design Workflows',
      skills: [
        'Git',
        'GitHub',
        'Docker',
        'Postman',
        'Linux/Bash CLI',
        'Vercel',
        'Figma (UI/UX Prototyping)',
        'RESTful APIs',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Western Mindanao State University',
    period: '2022–2026',
    location: 'Zamboanga City, Philippines',
    coursework: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Database Systems',
      'Web Designing',
      'Web Programming',
      'AI',
    ],
  },
  certifications: [
    {
      id: 'csc-pro',
      title: 'Civil Service Eligibility — Professional Level',
      issuer: 'Civil Service Commission (CSC PH)',
      accent: 'orange',
      tag: 'Government Eligibility',
    },
    {
      id: 'ecai-2026',
      title: 'Published Presenter: ECAI 2026 International Conference',
      issuer: 'ECAI 2026 International Conference',
      accent: 'orange',
      tag: 'Peer-Reviewed AI Research',
    },
    {
      id: 'google-ai',
      title: 'Google Platform for AI: Gemini & Vercel',
      issuer: 'Google Groups',
      accent: 'cyan',
      tag: 'AI & Cloud Training',
    },
    {
      id: 'dict-app-dev',
      title: 'Dual-Platform App Development',
      issuer: 'DICT Region IX',
      accent: 'cyan',
      tag: 'Software Development',
    },
  ],
  languages: ['English', 'Filipino (Tagalog)', 'Bisaya', 'Chavacano'],
};
