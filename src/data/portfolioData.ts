import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  identity: {
    fullName: 'JOHN MATHEW B. MAURICIO',
    designation: 'Web Developer | Programmer | AI Researcher',
    roles: ['Web Developer', 'Programmer', 'AI Researcher'],
    location: 'Zamboanga City, Philippines',
    availability: 'Open to Remote/WFH & On-Site',
    statusTelemetry: 'ONLINE // ZAMBOANGA_PH',
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
        value: 'CSC PRO',
        label: 'Civil Service Eligible (PH)',
        accent: 'orange',
      },
      {
        value: '40% FASTER',
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
      nodeCode: 'NODE_01',
      title: 'HairMixer',
      subtitle: 'AI-Powered Hairstyle Recommendation & Simulation System',
      fullTitle: 'HairMixer — AI-Powered Hairstyle Recommendation & Simulation System',
      period: 'May 2026',
      role: 'Lead Developer & Lead Researcher',
      stack: ['Python', 'ResNet50', 'OpenCV', 'React.js', 'FastAPI'],
      prestigeBadge: 'ECAI 2026 PUBLISHED',
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
        'Decoupled full-stack computer vision architecture pairing an asynchronous FastAPI inference microservice with a reactive React.js simulation canvas. Facial frames undergo OpenCV ROI alignment and landmark mapping prior to ResNet50 classification, returning ranked hairstyle geometries and aligned alpha-composite overlays.',
      architectureLayers: [
        {
          layer: 'PRESENTATION_HUD',
          component: 'React.js Interactive Simulation Client',
          detail:
            'Frame pre-scaling, viewport canvas compositing, and cached asset preloading that cut client-side preview latency by 40%.',
        },
        {
          layer: 'API_GATEWAY',
          component: 'FastAPI Async Inference Router',
          detail:
            'Non-blocking request validation, payload compression, and warm model worker orchestration in Python.',
        },
        {
          layer: 'VISION_CORE',
          component: 'OpenCV + ResNet50 Deep Learning Engine',
          detail:
            'Facial boundary detection, geometric landmark normalization, and multi-class face-shape classification.',
        },
      ],
      repositoryUrl: 'https://github.com/matchewmau',
    },
    {
      id: 'pconnect',
      nodeCode: 'NODE_02',
      title: 'PConnect',
      subtitle: 'B2B Distribution & E-Commerce Platform',
      fullTitle: 'PConnect — B2B Distribution & E-Commerce Platform',
      period: 'Mar. 2025 - Sept. 2026',
      role: 'Project Manager & Lead Developer',
      stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
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
        'Multi-tenant B2B commerce engine architected on Laravel and MySQL to coordinate bulk procurement between regional distributors and commercial retail accounts. Enforces granular RBAC policies, automated commission ledger splits, and real-time stock locking.',
      architectureLayers: [
        {
          layer: 'COMMERCE_PORTAL',
          component: 'Tailwind CSS + JavaScript Storefront & Dashboards',
          detail:
            'Role-tailored supplier, distributor, and admin portals with live bulk order status telemetry.',
        },
        {
          layer: 'DOMAIN_LOGIC',
          component: 'Laravel RBAC & Multi-Tier Commission Engine',
          detail:
            'Middleware permission guards, automated fee calculation pipelines, and atomic inventory reservation.',
        },
        {
          layer: 'DATA_PERSISTENCE',
          component: 'Indexed MySQL + Tuned Eloquent ORM',
          detail:
            'Composite B-tree indexes, eager-loading query plans, and lean REST serializers sustaining <200ms reads.',
        },
      ],
      repositoryUrl: 'https://github.com/matchewmau',
    },
    {
      id: 'tj-fitness',
      nodeCode: 'NODE_03',
      title: 'TJ Fitness',
      subtitle: 'Full-Stack Gym Management System',
      fullTitle: 'TJ Fitness — Full-Stack Gym Management System',
      period: 'Aug. 2024 - Nov. 2024',
      role: 'Full-Stack Developer',
      stack: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Git'],
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
        'Centralized operational platform built on a clean modular PHP MVC pattern and relational MySQL schema. Replaces manual front-desk logs with unified member lifecycle tracking, daily check-in telemetry, financial reporting, and proactive renewal alerts.',
      architectureLayers: [
        {
          layer: 'ADMIN_CONSOLE',
          component: 'Responsive Tailwind CSS + JS Front-Desk UI',
          detail:
            'Fast member lookup, attendance check-in controls, financial summaries, and automated expiry alert banners.',
        },
        {
          layer: 'APPLICATION_CORE',
          component: 'Modular PHP MVC Controllers & Services',
          detail:
            'Separated routing, business validation, and billing cycle calculation governed by structured Git branching.',
        },
        {
          layer: 'RELATIONAL_STORE',
          component: 'Normalized MySQL Operational Database',
          detail:
            'Relational member profiles, subscription plan lifecycles, daily attendance logs, and payment audit trails.',
        },
      ],
      repositoryUrl: 'https://github.com/matchewmau',
    },
  ],
  arsenal: [
    {
      id: 'languages',
      quadrantCode: 'QUADRANT_01',
      title: 'Languages',
      subtitle: 'CORE_SYNTAX & QUERY_ENGINES',
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
      quadrantCode: 'QUADRANT_02',
      title: 'Frameworks & Libs',
      subtitle: 'APPLICATION_RUNTIMES & UI_SYSTEMS',
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
      quadrantCode: 'QUADRANT_03',
      title: 'AI & Machine Learning',
      subtitle: 'NEURAL_ARCHITECTURES & VISION',
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
      quadrantCode: 'QUADRANT_04',
      title: 'Tools & Infrastructure',
      subtitle: 'DEPLOYMENT, VERSIONING & DESIGN_OPS',
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
      issuer: 'CSC PH',
      accent: 'orange',
      tag: 'PRESTIGE_CREDENTIAL // GOV_ELIGIBLE',
    },
    {
      id: 'ecai-2026',
      title: 'Published Presenter: ECAI 2026 International Conference',
      issuer: 'ECAI 2026 International Conference',
      accent: 'orange',
      tag: 'PRESTIGE_CREDENTIAL // PEER_REVIEWED',
    },
    {
      id: 'google-ai',
      title: 'Google Platform for AI: Gemini & Vercel',
      issuer: 'Google Groups',
      accent: 'cyan',
      tag: 'VERIFIED_TRAINING // AI_CLOUD',
    },
    {
      id: 'dict-app-dev',
      title: 'Dual-Platform App Development',
      issuer: 'DICT Region IX',
      accent: 'cyan',
      tag: 'VERIFIED_TRAINING // MULTI_PLATFORM',
    },
  ],
  languages: ['English', 'Filipino (Tagalog)', 'Bisaya', 'Chavacano'],
};
