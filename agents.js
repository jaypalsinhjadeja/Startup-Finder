// Startup Intelligence OS - Upgraded Multi-Agent Registry and Report Datasets

const agentPipelineState = { timers: new Set(), cancelled: false };
const scheduleAgentTask = (fn, delay) => {
  const timer = setTimeout(() => {
    agentPipelineState.timers.delete(timer);
    if (!agentPipelineState.cancelled) fn();
  }, delay);
  agentPipelineState.timers.add(timer);
};
const cancelAgentPipeline = () => {
  agentPipelineState.cancelled = true;
  agentPipelineState.timers.forEach(clearTimeout);
  agentPipelineState.timers.clear();
};

const agentsRegistry = [
  // Original 13 Agents
  { id: 1, name: "Problem Hunter", role: "Scrapes community forums for complaints & frustrations", icon: "fa-magnifying-glass", scoreKey: "painScore" },
  { id: 2, name: "Demand Analyzer", role: "Measures search volume, trend velocity, and interest", icon: "fa-chart-line", scoreKey: "demandScore" },
  { id: 3, name: "Competitor Analyst", role: "Identifies SaaS alternatives, features & pricing limits", icon: "fa-shield-halved", scoreKey: "competitionScore" },
  { id: 4, name: "Market Gap Finder", role: "Finds underserved workflows & expensive software weaknesses", icon: "fa-puzzle-piece", scoreKey: "marketGapScore" },
  { id: 5, name: "Monetization Analyst", role: "Recommends billing structures & pricing strategies", icon: "fa-dollar-sign", scoreKey: "monetizationScore" },
  { id: 6, name: "Solo Founder Evaluator", role: "Scores build difficulty, timeline, and stack complexity", icon: "fa-hammer", scoreKey: "soloFounderScore" },
  { id: 7, name: "MVP Planner", role: "Defines Must-Have features vs. roadmap iterations", icon: "fa-box-open", scoreKey: null },
  { id: 8, name: "Customer Analyst", role: "Identifies ICPs, buyer motivations & user personas", icon: "fa-users-viewfinder", scoreKey: null },
  { id: 9, name: "Go-To-Market Analyst", role: "Outlines launch steps and low-cost acquisition loops", icon: "fa-bullhorn", scoreKey: null },
  { id: 10, name: "Revenue Forecaster", role: "Calculates MRR/ARR scenarios up to 10k users", icon: "fa-chart-pie", scoreKey: null },
  { id: 11, name: "Founder Fit Analyzer", role: "Correlates builder skillset with target complexity", icon: "fa-street-view", scoreKey: null },
  { id: 12, name: "Trend Discovery Agent", role: "Matches niche with macro-level industry growth data", icon: "fa-fire", scoreKey: "trendScore" },
  { id: 13, name: "SEO & Keyword Agent", role: "Extracts low-competition, high-volume search queries", icon: "fa-key", scoreKey: "seoOpportunityScore" },

  // New 11 VC-Grade Validation Agents
  { id: 14, name: "Startup Killer Agent", role: "Actively flags technical, platform, and pricing failure vectors", icon: "fa-skull-crossbones", scoreKey: "riskScore" },
  { id: 15, name: "Founder-Market Fit Agent", role: "Critiques distribution channels, network, and asset advantages", icon: "fa-people-arrows", scoreKey: "founderFitScore" },
  { id: 16, name: "Moat & Defensibility Agent", role: "Calculates switching costs and competitor copy speeds", icon: "fa-fort-awesome", scoreKey: "moatScore" },
  { id: 17, name: "Customer Wallet Agent", role: "Audits budget ownership and buyer purchase intent", icon: "fa-wallet", scoreKey: "walletScore" },
  { id: 18, name: "Distribution Difficulty Agent", role: "Measures CAC costs and paid channel traffic friction", icon: "fa-route", scoreKey: "distributionScore" },
  { id: 19, name: "AI Replacement Risk Agent", role: "Scans roadmap risks of major foundational models (OpenAI, Google)", icon: "fa-robot", scoreKey: "aiRiskScore" },
  { id: 20, name: "Platform Dependency Agent", role: "Quantifies structural API fragile points and rate limits", icon: "fa-network-wired", scoreKey: "platformRiskScore" },
  { id: 21, name: "Security & Compliance Agent", role: "Reviews SOC2, HIPAA, GDPR security and enterprise readiness", icon: "fa-lock", scoreKey: "complianceScore" },
  { id: 22, name: "COGS & Unit Economics Agent", role: "Estimates server, database, API and gross margins", icon: "fa-percent", scoreKey: "unitEconomicsScore" },
  { id: 23, name: "Startup Simulator Agent", role: "Models Best/Expected/Worst 24-month growth cohort curves", icon: "fa-chart-area", scoreKey: "survivalScore" },
  { id: 24, name: "Investment Committee Agent", role: "Collates votes and verdicts from 6 investor/builder personas", icon: "fa-users", scoreKey: null }
];

// Pre-seeded startup opportunities updated with upgraded parameters
const seededOpportunities = [
  {
    id: "api-decay-tracker",
    startupName: "APIDecay Tracker",
    theme: "Developer Tools / Micro-SaaS",
    executiveSummary: "APIDecay Tracker is a micro-SaaS that monitors public and third-party APIs (Stripe, Twilio, OpenAI) for schema mutations, undocumented deprecations, and response behavior changes, alerting developers before checkouts or features break.",
    problemBeingSolved: "API providers often update payloads, deprecate parameters, or sunset versions without notice. Developer teams only discover these failures when active production checkouts break or integrations throw unexpected errors, leading to lost revenue and emergency debugging.",
    evidenceCollected: [
      { source: "Reddit (r/reactjs & r/webdev)", quote: "\"Stripe silently updated their API structure last night. Our webhook endpoint crashed. Took 4 hours to diagnose. Total nightmare.\"", url: "https://www.reddit.com/r/reactjs/search/?q=stripe%20webhook%20crashed" },
      { source: "Hacker News (Show HN)", quote: "\"Our startup's OpenAI integration broke because the completion schema returned slightly different format keys under load. We need a sentinel tool to watch this.\"", url: "https://hn.algolia.com/?q=openai%20completion%20schema%20drift" },
      { source: "G2 Review (Twilio Integrations)", quote: "\"Excellent developer platform, but API docs are occasionally out of sync with real payloads. Wish there was a schema drift alarm.\"", url: "https://www.g2.com/products/twilio/reviews" }
    ],
    targetAudience: "Mid-sized development teams, SaaS providers, e-commerce platforms using heavy third-party checkout/messaging integrations.",
    customerPersonas: [
      { name: "DevOps Engineer Derek", role: "Maintains reliability of checkout & auth flows", motivation: "Avoid midnight pager alerts and silent webhook drops.", pain: "Manually checking API documentation and updating SDKs." },
      { name: "CTO Clara", role: "Manages technical budget and service uptime", motivation: "Zero customer-facing downtime and robust billing systems.", pain: "Wasted developer salaries spent on diagnostic fire-drills." }
    ],
    marketDemandAnalysis: "High structural search growth for API monitoring, integrations reliability, and webhook testing solutions. The global API management market size is estimated at $4.5B and growing at a CAGR of 24.2%.",
    trendAnalysis: "As platforms rely more on granular microservices and LLM APIs (which suffer format drift), monitoring response schemas is transitioning from a niche tool to a mandatory infrastructure layer.",
    seoOpportunityAnalysis: "Highly targetable keyword cluster with low keyword difficulty (KD < 25): 'monitor webhook responses', 'api schema drift detector', 'stripe webhook debugging tool', 'track api deprecations'. Search volume shows a combined 25,000 monthly queries.",
    seoKeywords: [
      { keyword: "track api deprecations", volume: "2,400/mo", kd: "18 (Low)" },
      { keyword: "api schema drift monitor", volume: "1,200/mo", kd: "12 (Low)" },
      { keyword: "stripe webhook debug tool", volume: "3,800/mo", kd: "22 (Medium)" },
      { keyword: "webhooks monitoring saas", volume: "4,100/mo", kd: "25 (Medium)" }
    ],
    competitorAnalysis: [
      { name: "Datadog / NewRelic", pricing: "$15 - $70+/mo per host", strengths: "Deep infrastructure logging, server metrics, high brand authority.", weaknesses: "Requires heavy agent installation, complex setup, lacks specific payload schema drift detection or deprecation alerts." },
      { name: "Runscope / Postman", pricing: "$49 - $149/mo", strengths: "Excellent API assertions and manual run test builders.", weaknesses: "Requires manual test script authoring. Doesn't auto-detect third-party API deprecations or scan schemas dynamically." }
    ],
    marketGapAnalysis: "A gap exists for a zero-configuration integrations sentinel. Existing tools require engineers to write assertions manually for every endpoint. APIDecay automatically builds an AI-inferred schema profile from outgoing traffic and flags discrepancies.",
    monetizationStrategy: "B2B tier subscription model with usage-based volume increments (number of endpoints watched, testing frequency). Free tier for up to 3 endpoints to drive developer adoption.",
    pricingRecommendations: "Developer Tier: $29/mo (up to 15 endpoints, 5min checks), Growth Team Tier: $89/mo (up to 50 endpoints, 1min checks), Business Tier: $249/mo (custom schema compliance, SLA alerts).",
    mvpRoadmap: {
      v1: ["Must Have: Webhook schema visualizer, cron API check builder, Email & Slack alerts for status codes != 200."],
      v2: ["Should Have: Automatic schema difference analyzer, historical diff engine, direct integrations registry."],
      v3: ["Nice to Have: Github Actions integration to run contract-testing in CI/CD pipeline on codebase commits."]
    },
    buildComplexity: "Moderate backend logic, simple frontend display dashboard. Can be built with a lightweight Node.js/Python server, a Redis queue for scheduling tasks, and Postgres. Low database footprint.",
    founderFitAnalysis: "Ideal fit for technical founders (Developers) who understand webhook listeners and backend architecture. Marketing is straightforward via technical blogging and developer relations.",
    customerAcquisitionStrategy: "Direct seeding on developer platforms (Hacker News, r/webdev), launching a free web-based Webhook tester tool on Product Hunt to capture inbound emails, and technical SEO focused on API deprecation guides.",
    revenueForecast: [
      { tier: "100 Customers", mrr: "$7,900", arr: "$94,800", details: "Assumes $79 average contract value (ACV)" },
      { tier: "500 Customers", mrr: "$39,500", arr: "$474,000", details: "Assumes mixed Developer & Growth accounts" },
      { tier: "1,000 Customers", mrr: "$79,000", arr: "$948,000", details: "Includes several multi-seat Business accounts" },
      { tier: "10,000 Customers", mrr: "$790,000", arr: "$9,480,000", details: "Global presence with enterprise scale SLAs" }
    ],
    risks: [
      "Large providers like Stripe might launch native warning dashboards.",
      "Requires high reliability for the monitoring engine (needs multi-region failover)."
    ],
    advantages: [
      "Low maintenance overhead for single developer.",
      "High retention rates (once integrated into a development workflow, devs rarely swap it out)."
    ],
    
    // Upgraded Agent Outputs
    killerReport: {
      failureProb: "20%",
      topReasons: [
        "Major API providers release self-healing SDKs that make alerts redundant.",
        "Engineering teams build simple shell checks in-house instead of paying.",
        "High churn if development teams complete active migrations and pause subscription.",
        "Difficulty scaling sales to non-technical CTOs who don't understand integrations drift.",
        "No API payload visibility due to strict local network proxy filters.",
        "Liability risk if an alert fails and client loses checkout revenue.",
        "API changes occur too infrequently to justify continuous monitoring subscription.",
        "Security audits block access to production database integrations.",
        "Competitors like Datadog bundle specific webhook metrics for free.",
        "Solo founder fails to maintain continuous 24/7 server uptime monitoring requirements."
      ],
      fatalWarnings: [
        "IT Security blockers: Enterprise clients will resist letting a third-party monitor production webhooks.",
        "Liability concerns: If a warning is missed and checkouts go down, the startup could face litigation."
      ]
    },
    founderMarketFit: {
      fitScore: 8,
      advantages: [
        "Founder has strong engineering backgrounds and understands webhook logs.",
        "Can easily build the initial core CLI tool in Python/TypeScript without outsourcing."
      ],
      weaknesses: [
        "Lack of direct B2B corporate sales experience to negotiate with CTOs.",
        "No pre-existing distribution audience in corporate DevOps teams."
      ]
    },
    moatReport: {
      moatScore: 7,
      defensibilityScore: 6,
      survivalRating: "HIGH",
      openaiThreat: "Low threat. OpenAI doesn't natively monitor third-party API configurations or webhook failures.",
      googleThreat: "Low threat. Google Cloud monitoring handles GCP products, but does not offer cross-platform schema audits.",
      competitorClone: "Clonable in 45 days. However, the proprietary AI-learned schema profile profiles are hard to copy cleanly."
    },
    walletReport: {
      payProbability: 9,
      budgetAvailability: 8,
      spendingAnalysis: "Engineering managers have active budgets for reliability tooling (e.g. Sentry, LogRocket) and will easily expense a $79/mo subscription if it prevents a checkout failure."
    },
    distributionDifficulty: {
      diffScore: 5,
      acqDifficulty: "Medium",
      channels: [
        "Technical SEO guides solving specific error codes (e.g. 'Stripe Webhook signature verification failed')",
        "Show HN / Reddit developer threads",
        "Integration partnerships listing on libraries registries"
      ]
    },
    aiRiskReport: {
      aiRiskScore: 3,
      obsolescenceEstimate: "5+ Years",
      survivalProbability: "90%"
    },
    platformDependency: {
      platformRiskScore: 6,
      dependencyAnalysis: "Highly dependent on webhook endpoints remaining accessible, and APIs having visible change headers. Stripe/Twilio changing schema schemas without warning is both the threat and the source of value.",
      businessFragility: "Moderate"
    },
    complianceReport: {
      complianceScore: 5,
      readinessScore: 7,
      securityAssessment: "Requires encryption of OAuth access keys, secure vaults, and eventually SOC2 Type 1 certification to unlock contracts larger than $5,000/year."
    },
    cogsReport: {
      margin: "92%",
      unitScore: 9,
      profitability: "Exceptional. Low compute footprint since cron checks only transfer basic JSON payloads."
    },
    simulatorReport: {
      survivalProb: "88%",
      bestCase: { growth: "15% MoM", churn: "2.1%", cac: "$45", revenue: "$185,000", burn: "$1,800" },
      expectedCase: { growth: "8% MoM", churn: "4.2%", cac: "$75", revenue: "$94,000", burn: "$2,200" },
      worstCase: { growth: "2% MoM", churn: "9.8%", cac: "$160", revenue: "$28,000", burn: "$2,500" }
    },
    committeeReport: {
      votes: { bootstrap: "BUILD", indie: "BUILD", angel: "BUILD", vc: "PASS", pm: "BUILD", growth: "BUILD" },
      reasons: {
        bootstrap: "Cash flows are highly stable with low initial server upkeep. Perfect lifestyle SaaS.",
        indie: "Can build in 4 weeks and grow using organic tech blogging.",
        angel: "Clear pain point. CTOs will pay to avoid debugging fire-drills.",
        vc: "Pass. TAM is too small to yield a $1B venture return.",
        pm: "Clear workflow lock-in. Once a team integrates alerts, they never uninstall.",
        growth: "Developer SEO keywords are cheap and high intent, making CAC highly manageable."
      },
      consensus: "5/6 BUILD. Recommended for bootstrapping. Angel investment is viable, but VCs will pass due to market size caps."
    },

    painScore: 9,
    demandScore: 7,
    competitionScore: 5,
    marketGapScore: 8,
    monetizationScore: 8,
    soloFounderScore: 9,
    founderFitScore: 8, 
    seoOpportunityScore: 8,
    trendScore: 8,
    acquisitionPotentialScore: 7,
    riskScore: 3,
    aiRiskScore: 3,
    platformRiskScore: 6,
    complianceScore: 5,
    distributionScore: 5,
    moatScore: 7,
    walletScore: 9,
    unitEconomicsScore: 9,
    survivalScore: 8,
    overallScore: 81, // Adjusted dynamically by engine
    verdict: "STRONG OPPORTUNITY",
    buildRec: "Strong opportunity for solo builders. Build a HubSpot-specific prototype.",
    evidenceSources: "Reddit, Hacker News, G2 Developer Reviews"
  },
  {
    id: "repurpose-ai",
    startupName: "RepurposeAI",
    theme: "Creator Economy / AI Tools",
    executiveSummary: "RepurposeAI is an automated visual editing engine that ingests long-form horizontal podcasts or YouTube videos and programmatically crops, overlays subtitles, styles captions, and compiles viral hooks for TikTok, Instagram Reels, and YouTube Shorts.",
    problemBeingSolved: "Horizontal content creators spend hours using video software (Premiere Pro, CapCut) to manually crop, reposition speakers, and generate animated captions to feed daily vertical social platforms. Hiring manual video editors is expensive ($1.5k-$3k/mo).",
    evidenceCollected: [
      { source: "Twitter (Creator Community)", quote: "\"Spent all morning framing speakers and typing captions for a 30 second reel. I shoot for 1 hour but edit vertical clips for 5 hours.\"", url: "https://x.com/search?q=video%20edit%20repurpose" },
      { source: "YouTube Comment (Editing Course)", quote: "\"Is there an automated tool that actually does speaker tracking? Most AI cropping chops off the faces of co-hosts.\"", url: "https://www.youtube.com/results?search_query=ai+speaker+tracking+video+editor" },
      { source: "Product Hunt (AI Editors Hub)", quote: "\"Love the AI transcript-clippers, but they lack custom fonts and branding. All clips look identical. My channel loses its identity.\"", url: "https://www.producthunt.com/search?q=ai+video+editor" }
    ],
    targetAudience: "Solo podcast hosts, SaaS founders conducting video marketing, content creators, digital media agencies managing short-form clips.",
    customerPersonas: [
      { name: "Creator Chloe", role: "Full-Time Podcast Producer", motivation: "Maximize eyeballs on vertical channels without going broke hiring editors.", pain: "Tedious keyframing in Premiere and caption syncing." },
      { name: "SaaS Founder Sean", role: "Growth Marketer for Developer Tool", motivation: "Repurpose webinars and audio logs into quick Twitter videos.", pain: "Zero design/video editing background, and hates heavy software." }
    ],
    marketDemandAnalysis: "Enormous vertical video growth on TikTok, Instagram, and Shorts. Google Trends shows 'repurpose video AI' searches up 340% year-on-year. Active target base is 50M+ global content creators.",
    trendAnalysis: "Short-form content remains the primary traffic driver for podcasts and products. Platforms are rewarding high-volume daily uploads, boosting software helper demand.",
    seoOpportunityAnalysis: "Great volume cluster: 'crop horizontal video to vertical online', 'repurpose youtube to tiktok free', 'ai speaker tracking video editor'. Moderate keyword difficulty (KD ~ 35).",
    seoKeywords: [
      { keyword: "repurpose video to tiktok", volume: "8,900/mo", kd: "32 (Medium)" },
      { keyword: "crop video horizontal vertical", volume: "12,500/mo", kd: "28 (Medium)" },
      { keyword: "ai vertical clip editor", volume: "5,400/mo", kd: "36 (Medium)" },
      { keyword: "speaker tracking app", volume: "1,800/mo", kd: "20 (Low)" }
    ],
    competitorAnalysis: [
      { name: "Opus Clip", pricing: "$19 - $49/mo", strengths: "Great transcription-based hook analysis, fast rendering.", weaknesses: "Captions look very generic, limited speaker-tracking configuration, lack of multi-channel scheduled posting." },
      { name: "CapCut Pro", pricing: "$10/mo", strengths: "Extremely rich visual assets library, manual controls.", weaknesses: "Entirely manual workflow. The user has to crop, cut, overlay, and style every clip frame-by-frame." }
    ],
    marketGapAnalysis: "Current AI video editors produce identical aesthetic captions ('Hormozi templates'). A gap exists for an editor focusing on Brand Aesthetics (allowing custom typography, custom animated intro stickers, and direct connection to scheduling tools).",
    monetizationStrategy: "SaaS model with monthly credit allotment representing minutes of processed video. High-margin upsell for automatic social publishing features.",
    pricingRecommendations: "Basic: $19/mo (300 minutes, standard templates), Creator: $39/mo (900 minutes, custom brand overlays, scheduling), Agency: $120/mo (3000 minutes, team folders, white-label exports).",
    mvpRoadmap: {
      v1: ["Must Have: Horizontal MP4 uploader, AI face auto-crop, custom subtitle overlays, and export to vertical MP4."],
      v2: ["Should Have: Automatic transcription engine with key hook highlights, social publishing API integrations (TikTok/IG)."],
      v3: ["Nice to Have: Audio level detector that auto-zooms to active speaker on dual-cameras, multi-language subtitle translation."]
    },
    buildComplexity: "High infrastructure complexity due to GPU rendering requirements and video encoding pipelines. Using third-party rendering APIs (like Shotstack or Remotion) or serverless cloud GPU containers is recommended to simplify initial launch.",
    founderFitAnalysis: "Demands visual skills (frontend design) and understanding of cloud pipelines/FFmpeg. Excellent opportunity if the founder has a personal audience in the creator space.",
    customerAcquisitionStrategy: "Organic content creation (posting AI-edited shorts of top podcasts, tagging hosts), launching a free watermark-restricted crop widget on the web, and direct outreach to podcasts on Spotify.",
    revenueForecast: [
      { tier: "100 Customers", mrr: "$2,900", arr: "$34,800", details: "Assumes $29 average tier selection" },
      { tier: "500 Customers", mrr: "$14,500", arr: "$174,000", details: "Assumes mostly Creator accounts" },
      { tier: "1,000 Customers", mrr: "$29,000", arr: "$348,000", details: "Growth driven by small media agencies" },
      { tier: "10,000 Customers", mrr: "$290,000", arr: "$3,480,000", details: "Mass-market creator usage globally" }
    ],
    risks: [
      "High hosting/rendering server costs (GPU instances can eat margin).",
      "API platform changes from TikTok/Instagram limits video uploads."
    ],
    advantages: [
      "Huge active target audience (millions of creators looking for speed).",
      "Viral exposure potential if creators include 'Edited by RepurposeAI' tags."
    ],

    // Upgraded Agent Outputs
    killerReport: {
      failureProb: "55%",
      topReasons: [
        "OpenAI introduces native automated video cropping in GPT models.",
        "High churn rates (10%+ monthly) as creator channels run dry or creators switch templates.",
        "Video rendering server bills (AWS/GPU) exceed pricing margins.",
        "YouTube updates policies to block automated scraping of source podcasts.",
        "TikTok rate-limits automated direct posting integrations.",
        "Competitor saturation (OpusClip, Munch, Captions, Veed) triggers pricing wars.",
        "Long video upload speeds frustrate users on slow internet connections.",
        "AI hook finder misses the actual funny parts of horizontal podcasts.",
        "Manual adjustments of text placement take too long, defeating the automated model.",
        "Marketing costs spike as paid ads become crowded with AI clones."
      ],
      fatalWarnings: [
        "Extreme server costs: Video encoding eats up to 45% of margins if not optimized.",
        "High churn risk: Creators churn as soon as they stop active batch editing."
      ]
    },
    founderMarketFit: {
      fitScore: 7,
      advantages: [
        "Understanding of vertical social algorithm hooks and creator needs.",
        "Ability to distribute the tool organically via vertical Reels/Shorts."
      ],
      weaknesses: [
        "Lack of direct FFmpeg or serverless GPU deployment experience.",
        "No venture backing to absorb high early infrastructure burn."
      ]
    },
    moatReport: {
      moatScore: 4,
      defensibilityScore: 3,
      survivalRating: "VALIDATE FURTHER",
      openaiThreat: "High threat. OpenAI's Sora and GPT-5 video processing pipelines will eventually crop horizontal inputs automatically.",
      googleThreat: "High threat. YouTube (Google) has active creator tools and could build auto-clipping directly into YouTube Studio.",
      competitorClone: "Clonable in 21 days using APIs like Shotstack or Remotion."
    },
    walletReport: {
      payProbability: 8,
      budgetAvailability: 6,
      spendingAnalysis: "Creators will pay $20–$40/mo because it directly replaces a human editor, but their cards show high delinquency rates and sensitivity to subscription price adjustments."
    },
    distributionDifficulty: {
      diffScore: 7,
      acqDifficulty: "High",
      channels: [
        "Organic Shorts showing before/after cropping styles",
        "Direct cold DM pitches to spotify podcast hosts",
        "Affiliate influencer programs rewarding creators who share links"
      ]
    },
    aiRiskReport: {
      aiRiskScore: 8,
      obsolescenceEstimate: "1-2 Years",
      survivalProbability: "40%"
    },
    platformDependency: {
      platformRiskScore: 7,
      dependencyAnalysis: "Dependent on TikTok, IG, and YouTube APIs for uploads, and third-party transcription AI APIs for transcription outputs.",
      businessFragility: "High"
    },
    complianceReport: {
      complianceScore: 3,
      readinessScore: 8,
      securityAssessment: "Low compliance hurdles. Standard user terms of service, COPPA compliance regarding kids video content, and fair-use clauses."
    },
    cogsReport: {
      margin: "55%",
      unitScore: 5,
      profitability: "Moderate. Video encoding, cloud rendering, and transcription APIs consume substantial margin per credit hour."
    },
    simulatorReport: {
      survivalProb: "52%",
      bestCase: { growth: "25% MoM", churn: "6.2%", cac: "$25", revenue: "$240,000", burn: "$4,500" },
      expectedCase: { growth: "12% MoM", churn: "9.5%", cac: "$45", revenue: "$85,000", burn: "$5,800" },
      worstCase: { growth: "3% MoM", churn: "18.2%", cac: "$95", revenue: "$14,000", burn: "$6,200" }
    },
    committeeReport: {
      votes: { bootstrap: "PASS", indie: "BUILD", angel: "BUILD", vc: "BUILD", pm: "PASS", growth: "BUILD" },
      reasons: {
        bootstrap: "High server costs and massive customer churn make this a nightmare to bootstrap.",
        indie: "Viable wrapper model. Build it, run it for 12 months, and flip it on Acquire.com.",
        angel: "High customer interest and clear marketing angle. Worth a fast seed ticket.",
        vc: "Venture scale market. If you can scale users fast, you can raise series A before AI obsolescence hits.",
        pm: "Defensibility is zero. CapCut can roll this out in a weekly release.",
        growth: "Extremely high organic growth loops. You can use the product to market itself."
      },
      consensus: "4/6 BUILD. High velocity product that is great for raising VC capital or rapid flips, but dangerous for a solo bootstrap founder due to high churn and heavy compute overhead."
    },

    painScore: 8,
    demandScore: 9,
    competitionScore: 7,
    marketGapScore: 7,
    monetizationScore: 7,
    soloFounderScore: 7,
    founderFitScore: 7,
    seoOpportunityScore: 8,
    trendScore: 9,
    acquisitionPotentialScore: 9,
    riskScore: 6,
    aiRiskScore: 8,
    platformRiskScore: 7,
    complianceScore: 3,
    distributionScore: 7,
    moatScore: 4,
    walletScore: 8,
    unitEconomicsScore: 5,
    survivalScore: 5,
    overallScore: 64, // VC Risk Adjusted
    verdict: "HIGH RISK",
    buildRec: "High risk due to platform risk and high server costs. Solo founders should proceed only if they have pre-existing distribution.",
    evidenceSources: "Twitter Creator communities, Product Hunt, TikTok Comments"
  },
  {
    id: "revops-lead-auditor",
    startupName: "RevOps Lead Auditor",
    theme: "B2B SaaS / Revenue Ops",
    executiveSummary: "RevOps Lead Auditor is a CRM database scanner that integrates with HubSpot and Salesforce to identify duplicate leads, dead contact pipelines, and unassigned prospects, sending daily alert logs to Slack with automatic remediation scripts.",
    problemBeingSolved: "Mid-market B2B companies waste thousands on database storage costs due to duplicated contacts. More importantly, high-value outbound leads rot inside databases because salespeople fail to follow up within target SLAs, leading to lost client pipeline.",
    evidenceCollected: [
      { source: "SalesOps Reddit Thread", quote: "\"Salesforce data is completely clogged. We have 3 different entries for 'General Electric'. Marketing sends leads, sales never opens them. Exhausting.\"", url: "https://www.reddit.com/r/salesforce/" },
      { source: "G2 Review (HubSpot Deduplication)", quote: "\"Hubspot's deduplication algorithm is a black-box. It often merges the wrong fields. We need granular review rules before merging contacts.\"", url: "https://www.g2.com/products/hubspot-sales-hub/reviews" },
      { source: "Twitter (B2B SaaS Execs)", quote: "\"Discovered that 80 warm leads from our last conference sat unassigned in CRM for two weeks. Need a direct Slack notification system for lead leaks.\"", url: "https://x.com/search?q=hubspot%20leads%20slack" }
    ],
    targetAudience: "B2B SaaS companies, Sales Operations managers, marketing heads, mid-sized consulting firms with active outbound sales teams.",
    customerPersonas: [
      { name: "Sales Ops Sam", role: "CRM Admin & Operations Lead", motivation: "Keep CRM records neat, validate fields, and maintain data pipeline efficiency.", pain: "Manually writing Excel formulas to deduplicate thousands of CSV rows." },
      { name: "VP of Sales Victoria", role: "Exec managing Outbound quotas", motivation: "Accelerate lead response speed and maximize pipeline revenue.", pain: "No visibility on untouched leads, representatives hoarding accounts." }
    ],
    marketDemandAnalysis: "Corporate CRM database volumes are expanding. B2B operations spend on RevOps software is rising at 18.5% YoY. Enterprise lead management is a top-3 priority for CMOs.",
    trendAnalysis: "Operations focus is shifting from generic 'lead generation' to 'conversion hygiene' and 'lead routing validation' due to increasing cost of ad customer acquisition.",
    seoOpportunityAnalysis: "High commercial intent keywords: 'find lead leaks hubspot', 'salesforce duplicate manager clean', 'crm lead follow up SLA auditor'. Very low search volume but high buyer value.",
    seoKeywords: [
      { keyword: "crm duplicate cleanup tool", volume: "800/mo", kd: "15 (Low)" },
      { keyword: "salesforce lead aging report", volume: "1,500/mo", kd: "22 (Medium)" },
      { keyword: "hubspot slack lead alerts", volume: "1,100/mo", kd: "10 (Low)" },
      { keyword: "revops data auditor", volume: "400/mo", kd: "8 (Low)" }
    ],
    competitorAnalysis: [
      { name: "RingLead (ZoomInfo)", pricing: "$5,000+/year flat", strengths: "Very deep integrations, enterprise grade compliance policies.", weaknesses: "Enterprise pricing lock, requires manual deployment sales calls, highly complex configuration workflow." },
      { name: "Standard CRM Merging", pricing: "Included in CRM Suite", strengths: "Free, built-in features.", weaknesses: "Very basic logic, no automatic alert Slack integration, doesn't audit response SLA aging metrics." }
    ],
    marketGapAnalysis: "Mid-market companies are priced out of data cleanup enterprise suites like RingLead. They need a simple, self-serve integrations auditor that is set up in 5 minutes, connects directly to HubSpot/Slack, and alerts Ops teams the moment a $10k pipeline opportunity sits stale.",
    monetizationStrategy: "Pure B2B SaaS model. Tiered by contact database size (e.g. 5,000, 25,000, or 100,000 contact records).",
    pricingRecommendations: "Starter: $79/mo (up to 10k CRM contacts), Pro: $199/mo (up to 50k contacts, auto-dedupe rules), growth: $499/mo (up to 200k contacts, custom SLA alerts, Slack webhook queues).",
    mvpRoadmap: {
      v1: ["Must Have: HubSpot OAuth sync, duplicate identifier by email/domain, lead aging checker, daily Slack summary report."],
      v2: ["Should Have: Automatic merging algorithm based on field priority rules, Salesforce integration hook, CSV log downloads."],
      v3: ["Nice to Have: AI-powered title normalizer (e.g. merging 'VP Product' & 'Vice President, Product') and contact phone enrichment."]
    },
    buildComplexity: "Low-to-moderate difficulty. Requires working with Salesforce REST APIs and HubSpot SDKs, storing secure OAuth tokens, and writing match/merge algorithms. Frontend can be simple tables.",
    founderFitAnalysis: "Highly profitable. High average ACV. Excellent if the founder has background in B2B sales, Salesforce integrations, or RevOps consulting.",
    customerAcquisitionStrategy: "Direct outreach to early adopters in industry groups (LinkedIn/Slack), publishing helpful templates (like 'The Perfect CRM Deduplication Guide'), and list-building via a free CRM audit scanner tool.",
    revenueForecast: [
      { tier: "100 Customers", mrr: "$19,900", arr: "$238,800", details: "Assumes $199 Pro plan average" },
      { tier: "500 Customers", mrr: "$99,500", arr: "$1,194,000", details: "Mixed Pro and Growth Tier accounts" },
      { tier: "1,000 Customers", mrr: "$199,000", arr: "$2,388,000", details: "Includes corporate multi-workspace configurations" },
      { tier: "10,000 Customers", mrr: "$1,990,000", arr: "$23,880,000", details: "Global standard software for mid-market CRM admin" }
    ],
    risks: [
      "Security compliance (handling corporate customer CRM contacts requires GDPR/SOC2 readiness).",
      "API payload deprecations by HubSpot or Salesforce."
    ],
    advantages: [
      "Extremely high Customer Lifetime Value (LTV) and business retention.",
      "Clear, quantifiable ROI (easily show the VP of Sales that the app saved 14 leads worth $50,000 last week)."
    ],

    // Upgraded Agent Outputs
    killerReport: {
      failureProb: "30%",
      topReasons: [
        "Corporate legal reviews block integration of external scripts with customer contact records.",
        "Salesforce/HubSpot updates native deduplication logic, rendering the audit obsolete.",
        "Sales reps bypass data corrections and ignore Slack notifications.",
        "SOC2 certification requirements drain early bootstrapping capital ($15k+ audit fees).",
        "High friction onboarding if the CRM setup has custom unmapped data columns.",
        "Pricing pushback from small teams who don't realize data storage has a direct cost.",
        "Data loss occurs during automated merges, leading to loss of historical CRM notes.",
        "Long enterprise sales cycles eat cash runway before customer conversion occurs.",
        "Competitors block API relays or charge high integration network fees.",
        "Support burdens become too heavy for a solo founder as CRM records scale into millions."
      ],
      fatalWarnings: [
        "SOC2 compliance requirements: High-value B2B buyers will NOT connect their HubSpot database without an active SOC2 report.",
        "API restrictions: HubSpot/Salesforce can throttle database sync speeds, limiting real-time auditing."
      ]
    },
    founderMarketFit: {
      fitScore: 8,
      advantages: [
        "Founder understands enterprise Salesforce APIs and HubSpot CRM database layouts.",
        "Direct connection to B2B operations groups and CRM agencies."
      ],
      weaknesses: [
        "Requires SOC2 preparation which is complex for a solo founder.",
        "Requires deep enterprise sales outreach (LinkedIn cold messages, demos) which takes time."
      ]
    },
    moatReport: {
      moatScore: 8,
      defensibilityScore: 8,
      survivalRating: "HIGH",
      openaiThreat: "Low threat. OpenAI does not natively sync with private HubSpot structures or run secure merge algorithms.",
      googleThreat: "Low threat. Google Sheets is a CRM target but not an active CRM workflow auditor.",
      competitorClone: "Clonable in 90 days. High switching cost: once integrated into a team's daily Slack/CRM workflow, it is rarely removed."
    },
    walletReport: {
      payProbability: 9,
      budgetAvailability: 9,
      spendingAnalysis: "Excellent budget ownership. Sales Ops managers and VP of Sales have high willingness to pay since dirty databases directly cost storage fees and drop active deals."
    },
    distributionDifficulty: {
      diffScore: 6,
      acqDifficulty: "Medium",
      channels: [
        "Cold LinkedIn outreach to newly appointed Sales Ops managers",
        "HubSpot App Marketplace listing",
        "Technical CRM deduplication guides and audits templates"
      ]
    },
    aiRiskReport: {
      aiRiskScore: 2,
      obsolescenceEstimate: "5+ Years",
      survivalProbability: "95%"
    },
    platformDependency: {
      platformRiskScore: 8,
      dependencyAnalysis: "Entirely dependent on HubSpot & Salesforce API keys and OAuth infrastructure scopes. If these developer platforms restrict third-party access, the tool will fail.",
      businessFragility: "High"
    },
    complianceReport: {
      complianceScore: 8,
      readinessScore: 4,
      securityAssessment: "Very high compliance. Must meet GDPR policies regarding contact scrubbing, and SOC2 certification is required for enterprise sales cycles."
    },
    cogsReport: {
      margin: "88%",
      unitScore: 8,
      profitability: "High potential. Moderate database cost due to indexing large contact catalogs, but high pricing tiers ($199–$499) protect margins."
    },
    simulatorReport: {
      survivalProb: "84%",
      bestCase: { growth: "12% MoM", churn: "1.2%", cac: "$120", revenue: "$310,000", burn: "$3,200" },
      expectedCase: { growth: "6% MoM", churn: "2.4%", cac: "$240", revenue: "$145,000", burn: "$3,800" },
      worstCase: { growth: "1% MoM", churn: "7.2%", cac: "$450", revenue: "$42,000", burn: "$4,500" }
    },
    committeeReport: {
      votes: { bootstrap: "BUILD", indie: "PASS", angel: "BUILD", vc: "BUILD", pm: "BUILD", growth: "PASS" },
      reasons: {
        bootstrap: "High pricing tiers and high retention support a small, profitable bootstrap company.",
        indie: "Pass. Too much enterprise sales friction and SOC2 compliance hurdles for standard indie hackers.",
        angel: "High LTV and clear utility. Excellent target for early angel backing.",
        vc: "Very strong VC target. Enterprise integration scaling is highly defensible and has clear expansion loops.",
        pm: "Integration complexity creates a solid moat that protects against copycats.",
        growth: "Pass. Paid ad traffic is highly expensive; distribution requires direct high-touch sales outreach."
      },
      consensus: "4/6 BUILD. Recommended for enterprise-focused builders who are comfortable with long sales cycles, SOC2 audits, and high-touch customer support."
    },

    painScore: 9,
    demandScore: 8,
    competitionScore: 4,
    marketGapScore: 9,
    monetizationScore: 9,
    soloFounderScore: 8,
    founderFitScore: 8,
    seoOpportunityScore: 7,
    trendScore: 8,
    acquisitionPotentialScore: 8,
    riskScore: 4,
    aiRiskScore: 2,
    platformRiskScore: 8,
    complianceScore: 8,
    distributionScore: 6,
    moatScore: 8,
    walletScore: 9,
    unitEconomicsScore: 8,
    survivalScore: 8,
    overallScore: 80, // VC Risk Adjusted
    verdict: "STRONG OPPORTUNITY",
    buildRec: "Strong opportunity. Focus on building a HubSpot integration, securing initial customer data trust, and working toward SOC2 compliance.",
    evidenceSources: "Reddit SalesOps, HubSpot Developer forum, LinkedIn RevOps comments"
  }
];

// Upgraded Dynamic Report Generator incorporating 11 new validation dimensions
function generateDynamicReport(ideaText, founderProfile) {
  const sanitized = ideaText.trim().replace(/[^\w\s-]/g, '');
  const words = sanitized.split(/\s+/).filter(w => w.length > 2);
  const keywords = words.slice(0, 3);
  const coreKeyword = keywords[0] || "Custom App";
  const secondKeyword = keywords[1] || "Platform";
  
  const capitalizedKeyword = coreKeyword.charAt(0).toUpperCase() + coreKeyword.slice(1);
  const capSecond = secondKeyword.charAt(0).toUpperCase() + secondKeyword.slice(1);
  const startupName = capitalizedKeyword + (capSecond === "Platform" ? "Flow" : capSecond);
  
  // Calculate Positives
  const painScore = Math.min(10, Math.max(5, Math.floor(ideaText.length % 5) + 5));
  const demandScore = Math.min(10, Math.max(4, Math.floor(ideaText.length % 6) + 4));
  const competitionScore = Math.min(10, Math.max(3, Math.floor(ideaText.length % 4) + 4));
  const marketGapScore = Math.min(10, Math.max(5, Math.floor(ideaText.length % 5) + 5));
  const monetizationScore = Math.min(10, Math.max(4, Math.floor(ideaText.length % 4) + 6));
  const marketSize = `$${(Math.floor(ideaText.length % 5) * 50 + 100)}M ARR`;
  
  // Calculate Build Difficulty
  let buildDifficulty = 5;
  const lowercaseInput = ideaText.toLowerCase();
  if (lowercaseInput.includes("video") || lowercaseInput.includes("ai") || lowercaseInput.includes("nlp") || lowercaseInput.includes("gpu")) {
    buildDifficulty += 3;
  }
  if (lowercaseInput.includes("real-time") || lowercaseInput.includes("database") || lowercaseInput.includes("api")) {
    buildDifficulty += 1;
  }
  buildDifficulty = Math.min(10, Math.max(3, buildDifficulty));
  
  const soloFounderScore = Math.max(3, 11 - buildDifficulty);
  
  // Dynamic Founder Fit based on skillset match
  const devSkill = founderProfile.coding;
  const marketingSkill = founderProfile.marketing;
  
  let skillDiff = 0;
  if (buildDifficulty >= 7) {
    skillDiff = Math.max(0, 4 - devSkill);
  } else {
    skillDiff = Math.max(0, 2 - devSkill);
  }
  const founderFitScore = Math.min(10, Math.max(3, 10 - (skillDiff * 2)));

  const seoOpportunityScore = Math.min(10, Math.max(4, Math.floor(ideaText.length % 3) + 6));
  const trendScore = Math.min(10, Math.max(4, Math.floor(ideaText.length % 5) + 5));
  const acquisitionPotentialScore = Math.min(10, Math.max(4, Math.floor((devSkill + marketingSkill) / 2) + 4));
  
  // Risks (Negative scores)
  let riskScore = Math.min(10, Math.max(3, Math.floor(ideaText.length % 4) + 3));
  let aiRiskScore = Math.min(10, Math.max(2, Math.floor(ideaText.length % 5) + 2));
  if (lowercaseInput.includes("ai") || lowercaseInput.includes("gpt") || lowercaseInput.includes("content")) {
    aiRiskScore = Math.min(10, aiRiskScore + 4);
  }
  
  let platformRiskScore = Math.min(10, Math.max(2, Math.floor(ideaText.length % 4) + 3));
  if (lowercaseInput.includes("api") || lowercaseInput.includes("plugin") || lowercaseInput.includes("hubspot") || lowercaseInput.includes("stripe")) {
    platformRiskScore = Math.min(10, platformRiskScore + 3);
  }

  let complianceScore = Math.min(10, Math.max(2, Math.floor(ideaText.length % 3) + 2));
  if (lowercaseInput.includes("database") || lowercaseInput.includes("legal") || lowercaseInput.includes("health") || lowercaseInput.includes("crm")) {
    complianceScore = Math.min(10, complianceScore + 4);
  }

  let distributionScore = Math.min(10, Math.max(4, Math.floor(ideaText.length % 5) + 4));
  
  // Defensibilities (Positives)
  const moatScore = Math.max(2, 11 - aiRiskScore);
  const walletScore = Math.min(10, Math.max(4, Math.floor(ideaText.length % 3) + 6));
  const unitEconomicsScore = Math.min(10, Math.max(4, 11 - buildDifficulty));
  
  // Survival score (Positive)
  const survivalScore = Math.max(3, Math.round(((moatScore + walletScore + unitEconomicsScore) / 3)));
  
  // Upgraded Decision Engine overall Score Formula:
  // OverallScore = Positives average (Opportunity + Fit + Moat + Monetization + Economics + Survival) 
  // minus Risks (KillerRisk + AIRisk + PlatformRisk + Compliance + Distribution)
  const opportunityScore = Math.round((painScore + demandScore + marketGapScore) / 3);
  
  const positiveAverage = (opportunityScore + founderFitScore + moatScore + monetizationScore + unitEconomicsScore + survivalScore) / 6;
  const riskAverage = (riskScore + aiRiskScore + platformRiskScore + complianceScore + distributionScore) / 5;
  
  const overallScore = Math.max(0, Math.min(100, Math.round((positiveAverage * 12) - (riskAverage * 2.5))));
  
  // Verdict Categories matching new VC standards
  let verdict = "VALIDATE FURTHER";
  let rec = "Needs direct validation. Set up landing pages and collect early customer interview inputs.";
  
  if (overallScore >= 95) {
    verdict = "EXCEPTIONAL OPPORTUNITY";
    rec = "VC-grade opportunity with deep moats, excellent unit economics, and low replacement risks. Build immediately.";
  } else if (overallScore >= 85) {
    verdict = "BUILD IMMEDIATELY";
    rec = "Strong product market fit, high wallet intent, and manageable platform dependency. Setup pre-launch loops.";
  } else if (overallScore >= 75) {
    verdict = "STRONG OPPORTUNITY";
    rec = "Good opportunity. Ensure platform APIs and data flow security parameters are locked in.";
  } else if (overallScore >= 50) {
    verdict = "HIGH RISK";
    rec = "Major platform dependency or high AI obsolescence. Pivot segment or build as client service project first.";
  } else {
    verdict = "DO NOT BUILD";
    rec = "Failure probability is extreme. Competitors can copy in weeks, or platform limits kill structural utility.";
  }

  const fatalWarnings = [
    `AI Replacement: Large language models can natively automate this ${coreKeyword} process in their next core cycles.`,
    `Platform locks: Access to standard API endpoints for ${secondKeyword} is highly fragile and prone to rate limits.`
  ];

  return {
    id: coreKeyword.toLowerCase() + "-generated",
    startupName: startupName,
    theme: `${capitalizedKeyword} Automation / Web SaaS`,
    marketSize: marketSize,
    executiveSummary: `A risk-audited SaaS utility that automates ${ideaText.toLowerCase()}, eliminating complex manual workflows for business users and small teams.`,
    problemBeingSolved: `Users trying to manage ${coreKeyword} currently waste hours on manual workflows, copy-pasting data, or writing custom fragile scripts because existing major tools lack targeted, verticalized wrappers.`,
    evidenceCollected: [
      { source: "Reddit (r/SaaS & Industry Community)", quote: `\"Looking for a tool that handles ${coreKeyword} without requiring me to configure Zapier or write custom webhook parsers. Everything else is either bloated or too complex.\"` , url: `https://www.reddit.com/search/?q=automate%20${encodeURIComponent(coreKeyword.toLowerCase())}` },
      { source: "Indie Hackers forum", quote: `\"I would happily pay $50/mo if someone built an automatic scanner to audit our ${coreKeyword} logs. The manual audit is a nightmare for a team of our size.\"` , url: `https://www.indiehackers.com/search?q=${encodeURIComponent(coreKeyword.toLowerCase())}` }
    ],
    targetAudience: `Small-to-medium businesses, solo creators, and operations managers handling ${coreKeyword} pipelines daily.`,
    customerPersonas: [
      { name: `${capitalizedKeyword} Ops Olivia`, role: "Team Operations Lead", motivation: "Save hours of copy-pasting and reduce data cleaning chores.", pain: `Bloated tools requiring a developer to set up basic triggers for ${secondKeyword}.` }
    ],
    marketDemandAnalysis: `Steady organic interest. Search volume indicates rising query spikes for '${coreKeyword} helper' and 'automate ${secondKeyword}'. Market cap for workflow automation is valued at $9.2B.`,
    trendAnalysis: `Strong B2B shift toward simple, modular, and single-purpose utilities that solve specific problems (micro-SaaS) rather than large, bloated enterprise dashboard systems.`,
    seoOpportunityAnalysis: `Highly targetable niche search keywords with low competition. The organic KD scores are below 20, representing rapid index potential.`,
    seoKeywords: [
      { keyword: `automate ${coreKeyword.toLowerCase()}`, volume: "1,200/mo", kd: "12 (Low)" },
      { keyword: `best ${secondKeyword.toLowerCase()} helper tool`, volume: "900/mo", kd: "15 (Low)" },
      { keyword: `micro-saas for ${coreKeyword.toLowerCase()}`, volume: "350/mo", kd: "5 (Low)" }
    ],
    competitorAnalysis: [
      { name: "Generic Automators (Zapier/Make)", pricing: "$29 - $199/mo", strengths: "Integrate with thousands of apps, highly robust brand.", weaknesses: "Highly complex logic building, lacks deep vertical analytics, and becomes expensive quickly based on task runs." },
      { name: "Manual spreadsheets", pricing: "$0", strengths: "Free, total control of rows.", weaknesses: "Zero automation, human typing error prone, completely unscalable." }
    ],
    marketGapAnalysis: `While users can hack together a solution using Zapier, it requires complex custom JSON logic mapping and breaks regularly. ${startupName} provides an out-of-the-box system that does this task in one click with zero setup files.`,
    monetizationStrategy: "Monthly subscription model with two primary tiers based on usage or records processed.",
    pricingRecommendations: `Starter Plan: $29/mo (up to 1,000 monthly transactions), Growth Plan: $79/mo (up to 5,000 transactions and direct integrations, auto-sync features).`,
    mvpRoadmap: {
      v1: [`Must Have: Basic authentication dashboard, Oauth connection, automatic parsing module for ${coreKeyword}, and CSV download output.`],
      v2: ["Should Have: Slack alerts integration, automatic scheduling cron, historical error audits page."],
      v3: [`Nice to Have: Multi-user workspace controls, custom webhook relays, and ML-based duplicate classification.`]
    },
    buildComplexity: `${buildDifficulty > 7 ? 'High' : (buildDifficulty > 5 ? 'Moderate' : 'Low')} complexity. Requires standard API integrations, backend cron task worker scheduler, and simple UI tables.`,
    founderFitAnalysis: `With your current profile (Dev: ${devSkill}/5, Marketing: ${marketingSkill}/5), this build is classified as ${founderFitScore >= 8 ? 'an Excellent' : (founderFitScore >= 6 ? 'a Viable' : 'a High Risk')} match.`,
    customerAcquisitionStrategy: "Direct outreach to early adopters in industry slack groups, launching a mini tools registry on Github, and standard SEO guides answering common debug queries.",
    revenueForecast: [
      { tier: "100 Customers", mrr: `$${(29 * 100).toLocaleString()}`, arr: `$${(29 * 100 * 12).toLocaleString()}`, details: "Based on entry-level tier adoption" },
      { tier: "500 Customers", mrr: `$${(49 * 500).toLocaleString()}`, arr: `$${(49 * 500 * 12).toLocaleString()}`, details: "Assuming average blended pricing account size" },
      { tier: "1,000 Customers", mrr: `$${(49 * 1000).toLocaleString()}`, arr: `$${(49 * 1000 * 12).toLocaleString()}`, details: "Expanding to middle market teams" },
      { tier: "10,000 Customers", mrr: `$${(59 * 10000).toLocaleString()}`, arr: `$${(59 * 10000 * 12).toLocaleString()}`, details: "Broad mid-market global brand standard SaaS" }
    ],
    risks: [
      "Platforms might introduce native tools, squeezing the middleware market.",
      `User acquisition requires high trust since the app manages their ${coreKeyword} configurations.`,
      "Risk of churn if the workflow isn't embedded as a daily operational habit."
    ],
    advantages: [
      `Unsolved workflow specifically targeted at ${coreKeyword} automation.`,
      "High structural recurring revenue potential as a targeted SaaS utility.",
      `Low initial server infrastructure costs for basic text/data parsing.`
    ],

    // Upgraded Agent Outputs
    killerReport: {
      failureProb: `${riskScore * 10}%`,
      topReasons: [
        `Automating ${coreKeyword} can be built by competitors in less than 30 days.`,
        "Users bypass tool using basic ChatGPT scripts.",
        "High churn if customers only run audits occasionally.",
        "Data access security clearances reject syncing database columns.",
        "Third-party integrations deprecate access tokens, breaking application runtime.",
        "Paid ad customer acquisition costs exceed user lifetime values.",
        "Server costs scale exponentially if users process large data arrays.",
        "Standard B2B procurement processes block deployment.",
        "Large players (e.g. Stripe, HubSpot) launch free native templates.",
        "Solo founder fails to maintain security certifications (SOC2)."
      ],
      fatalWarnings: fatalWarnings
    },
    founderMarketFit: {
      fitScore: founderFitScore,
      advantages: [
        `Knowledge of ${coreKeyword} patterns and API workflows.`,
        "Direct control of code creation and database hosting."
      ],
      weaknesses: [
        "No existing distribution audience.",
        "Limited sales budget to bid on crowded CPC keywords."
      ]
    },
    moatReport: {
      moatScore: moatScore,
      defensibilityScore: Math.max(2, moatScore - 1),
      survivalRating: moatScore >= 7 ? "HIGH" : (moatScore >= 5 ? "VALIDATE FURTHER" : "LOW"),
      openaiThreat: `High threat. OpenAI's GPTS and active agent integrations can automate ${coreKeyword} setups natively.`,
      googleThreat: "Low threat. Google does not target small workflow utilities.",
      competitorClone: "Clonable in 30 days by any fullstack developer using standard APIs."
    },
    walletReport: {
      payProbability: walletScore,
      budgetAvailability: Math.min(10, walletScore + 1),
      spendingAnalysis: `Users actively allocate budgets for ${coreKeyword} tasks and will buy a utility if it saves direct engineering salaries.`
    },
    distributionDifficulty: {
      diffScore: distributionScore,
      acqDifficulty: distributionScore >= 7 ? "High" : (distributionScore >= 5 ? "Medium" : "Low"),
      channels: [
        "Direct cold outreach to Ops leads",
        "Targeted niche SEO blog posts",
        "Github open-source plugin wrapper promotion"
      ]
    },
    aiRiskReport: {
      aiRiskScore: aiRiskScore,
      obsolescenceEstimate: aiRiskScore >= 7 ? "1-2 Years" : "3-5 Years",
      survivalProbability: `${(10 - aiRiskScore) * 10}%`
    },
    platformDependency: {
      platformRiskScore: platformRiskScore,
      dependencyAnalysis: `Dependent on private API keys and OAuth setups. Breaking changes from platforms will crash client configurations.`,
      businessFragility: platformRiskScore >= 7 ? "High" : "Moderate"
    },
    complianceReport: {
      complianceScore: complianceScore,
      readinessScore: Math.max(3, 10 - complianceScore),
      securityAssessment: complianceScore >= 7 ? "High regulatory complexity. Requires secure vault storage, encryption, and SOC2 certification." : "Standard B2B SaaS security policies apply."
    },
    cogsReport: {
      margin: `${(10 - buildDifficulty) * 10 + 40}%`,
      unitScore: unitEconomicsScore,
      profitability: unitEconomicsScore >= 7 ? "High potential" : "Moderate margins"
    },
    simulatorReport: {
      survivalProb: `${survivalScore * 10}%`,
      bestCase: { growth: "18% MoM", churn: "1.5%", cac: "$30", revenue: "$120,000", burn: "$1,500" },
      expectedCase: { growth: "8% MoM", churn: "4.5%", cac: "$60", revenue: "$55,000", burn: "$2,000" },
      worstCase: { growth: "1% MoM", churn: "12.5%", cac: "$110", revenue: "$12,000", burn: "$2,200" }
    },
    committeeReport: {
      votes: { bootstrap: "BUILD", indie: "BUILD", angel: "PASS", vc: "PASS", pm: "BUILD", growth: "PASS" },
      reasons: {
        bootstrap: "Viable workflow helper. Low initial server bills and simple MVP scope.",
        indie: "Good target for launching on directories and building small recurring cash flows.",
        angel: "Pass. Lacks clear long-term defensibility moats.",
        vc: "Pass. Small niche. TAM does not support venture scales.",
        pm: "Features can be duplicated easily. Build velocity is the only moat.",
        growth: "Distribution channels are expensive. CAC will eat early pricing cash flows."
      },
      consensus: "3/6 BUILD. Recommended as a solo lifestyle software utility, but passed by VCs and Angels due to low defensibility moats."
    },

    painScore: painScore,
    demandScore: demandScore,
    competitionScore: competitionScore,
    marketGapScore: marketGapScore,
    monetizationScore: monetizationScore,
    soloFounderScore: soloFounderScore,
    founderFitScore: founderFitScore,
    seoOpportunityScore: seoOpportunityScore,
    trendScore: trendScore,
    acquisitionPotentialScore: acquisitionPotentialScore,
    riskScore: riskScore,
    aiRiskScore: aiRiskScore,
    platformRiskScore: platformRiskScore,
    complianceScore: complianceScore,
    distributionScore: distributionScore,
    moatScore: moatScore,
    walletScore: walletScore,
    unitEconomicsScore: unitEconomicsScore,
    survivalScore: survivalScore,
    overallScore: overallScore,
    verdict: verdict,
    buildRec: rec,
    evidenceSources: "Reddit forums, Hacker News comments"
  };
}

// Simulated Pipeline Console Runner executing all 24 agents
function runAgentPipelineSimulation({ ideaText, founderProfile, onAgentStart, onAgentComplete, onLog, onFinished }) {
  cancelAgentPipeline();
  agentPipelineState.cancelled = false;
  let activeAgentIndex = 0;
  const totalAgents = agentsRegistry.length;
  
  let matchedReport = seededOpportunities.find(o => 
    ideaText.toLowerCase().includes(o.startupName.toLowerCase()) || 
    ideaText.toLowerCase().includes(o.id.replace(/-/g, ' '))
  );
  
  if (!matchedReport) {
    matchedReport = generateDynamicReport(ideaText, founderProfile);
  }
  
  const simulationLogs = [
    // 1. Problem Hunter
    [
      `[Problem Hunter] Accessing forum APIs and scraper engines...`,
      `[Problem Hunter] Scanning Reddit (r/saas, r/startups) and Hacker News threads...`,
      `[Problem Hunter] Identified 27 threads complaining about manual tasks.`,
      `[Problem Hunter] Pain score set to: ${matchedReport.painScore}/10.`
    ],
    // 2. Demand Analyzer
    [
      `[Demand Analyzer] Scrutinizing Google Trends and keyword volumes...`,
      `[Demand Analyzer] Demand score finalized at: ${matchedReport.demandScore}/10.`
    ],
    // 3. Competitor Analyst
    [
      `[Competitor Analyst] Mapping active SaaS competitors...`,
      `[Competitor Analyst] Competitor A: ${matchedReport.competitorAnalysis[0].name}. Competitor B: ${matchedReport.competitorAnalysis[1].name}.`,
      `[Competitor Analyst] Competition score set to: ${matchedReport.competitionScore}/10.`
    ],
    // 4. Market Gap Finder
    [
      `[Market Gap Finder] Identifying unmet features and pricing holes...`,
      `[Market Gap Finder] Gap score set to: ${matchedReport.marketGapScore}/10.`
    ],
    // 5. Monetization Analyst
    [
      `[Monetization Analyst] Validating pricing models and value-metric hooks...`,
      `[Monetization Analyst] Monetization score: ${matchedReport.monetizationScore}/10.`
    ],
    // 6. Solo Founder Evaluator
    [
      `[Solo Founder Evaluator] Evaluating backend code complexity...`,
      `[Solo Founder Evaluator] Solo build rating: ${matchedReport.soloFounderScore}/10.`
    ],
    // 7. MVP Planner
    [
      `[MVP Planner] Segmenting V1 (Must Haves), V2 (Should Haves), V3 (Nice to Haves)...`,
      `[MVP Planner] MVP roadmap exported successfully.`
    ],
    // 8. Customer Analyst
    [
      `[Customer Analyst] Generating ICP persona cards: motivations & hurdles...`,
      `[Customer Analyst] Customer profiles structured.`
    ],
    // 9. GTM Analyst
    [
      `[Go-To-Market Analyst] Compiling acquisition loops and launch strategies...`,
      `[Go-To-Market Analyst] Launch timelines mapped.`
    ],
    // 10. Revenue Forecaster
    [
      `[Revenue Forecaster] Simulating pricing scenarios for 100, 500, 1000, 10000 customers...`,
      `[Revenue Forecaster] Financial spreadsheet updated.`
    ],
    // 11. Founder Fit Analyzer
    [
      `[Founder Fit Analyzer] Matching developer coding proficiency...`,
      `[Founder Fit Analyzer] Profile comparison completed.`
    ],
    // 12. Trend Discovery
    [
      `[Trend Discovery Agent] Querying macro interest indexes...`,
      `[Trend Discovery Agent] Trend score set to: ${matchedReport.trendScore}/10.`
    ],
    // 13. SEO Agent
    [
      `[SEO Keyword Agent] Running keyword search difficulty checks...`,
      `[SEO Keyword Agent] SEO opportunity score: ${matchedReport.seoOpportunityScore}/10.`
    ],
    // 14. Startup Killer (New Agent)
    [
      `[Startup Killer] Red-teaming the startup idea. Looking for fatal vulnerabilities...`,
      `[Startup Killer] Identifying pricing, compliance, and platform churn vectors...`,
      `[Startup Killer] FATAL RISK WARNING: ${matchedReport.killerReport.fatalWarnings[0]}`,
      `[Startup Killer] Failure probability evaluated at: ${matchedReport.killerReport.failureProb}.`
    ],
    // 15. Founder-Market Fit (New Agent)
    [
      `[Founder-Market Fit] Auditing founder competitive distribution advantage...`,
      `[Founder-Market Fit] Founder coding skill: ${founderProfile.coding}/5. GTM skill: ${founderProfile.marketing}/5.`,
      `[Founder-Market Fit] Match score set to: ${matchedReport.founderMarketFit.fitScore}/10.`
    ],
    // 16. Moat & Defensibility (New Agent)
    [
      `[Moat & Defensibility] Auditing workflow lock-in and switching costs...`,
      `[Moat & Defensibility] Clone speed checks: competitors can duplicate core logic in 30-45 days.`,
      `[Moat & Defensibility] Moat score: ${matchedReport.moatReport.moatScore}/10. Defensibility: ${matchedReport.moatReport.defensibilityScore}/10.`
    ],
    // 17. Customer Wallet (New Agent)
    [
      `[Customer Wallet] Auditing buyer budget ownership and trigger events...`,
      `[Customer Wallet] Payment probability: ${matchedReport.walletReport.payProbability}/10. Budget: ${matchedReport.walletReport.budgetAvailability}/10.`
    ],
    // 18. Distribution Difficulty (New Agent)
    [
      `[Distribution Difficulty] Calculating search keyword CPC and paid ads friction...`,
      `[Distribution Difficulty] Channels difficulty rating: ${matchedReport.distributionDifficulty.acqDifficulty}. Score: ${matchedReport.distributionDifficulty.diffScore}/10.`
    ],
    // 19. AI Replacement Risk (New Agent)
    [
      `[AI Replacement Risk] Analyzing OpenAI & Google AI roadmap intersections...`,
      `[AI Replacement Risk] Time-to-obsolescence estimate: ${matchedReport.aiRiskReport.obsolescenceEstimate}.`,
      `[AI Replacement Risk] Risk score set to: ${matchedReport.aiRiskReport.aiRiskScore}/10.`
    ],
    // 20. Platform Dependency (New Agent)
    [
      `[Platform Dependency] Analyzing API rate limits and Oauth lock-in fragility...`,
      `[Platform Dependency] Platform risk score: ${matchedReport.platformDependency.platformRiskScore}/10.`
    ],
    // 21. Security & Compliance (New Agent)
    [
      `[Security & Compliance] Auditing GDPR, HIPAA and SOC2 onboarding blockers...`,
      `[Security & Compliance] Compliance complexity score: ${matchedReport.complianceReport.complianceScore}/10.`
    ],
    // 22. COGS & Unit Economics (New Agent)
    [
      `[COGS & Unit Economics] Ingesting database server and API cost allocations...`,
      `[COGS & Unit Economics] Gross margins projected at: ${matchedReport.cogsReport.margin}. Economics score: ${matchedReport.cogsReport.unitScore}/10.`
    ],
    // 23. Startup Simulator (New Agent)
    [
      `[Startup Simulator] Executing 24-month Monte Carlo cohort models...`,
      `[Startup Simulator] Survival probability: ${matchedReport.simulatorReport.survivalProb}. Best, Expected, Worst cases structured.`
    ],
    // 24. Investment Committee (New Agent)
    [
      `[Investment Committee] Running independent role evaluation logs...`,
      `[Investment Committee] Bootstrap: ${matchedReport.committeeReport.votes.bootstrap}. Angel: ${matchedReport.committeeReport.votes.angel}. VC: ${matchedReport.committeeReport.votes.vc}.`,
      `[Investment Committee] Consensus reached: ${matchedReport.committeeReport.consensus.substring(0, 80)}...`
    ]
  ];

  onLog("Initializing upgraded Startup Decision Engine pipeline...", "system");
  onLog(`Analysing target concept: "${ideaText}"`, "highlight");
  
  function nextStep() {
    if (activeAgentIndex >= totalAgents) {
      onLog("=============================================", "system");
      onLog("[Investment Committee Judge] Calculating risk-adjusted decision coefficients...", "system");
      onLog("[Investment Committee Judge] Deducting risk, AI threat, and compliance limits...", "system");
      
      // Dynamic recalculation of scores incorporating active founder profile sliders
      let finalReport = { ...matchedReport };
      const coding = founderProfile.coding;
      
      // Dynamic fit logic
      const devDiff = matchedReport.id.includes("repurpose") ? 8 : (matchedReport.id.includes("api") ? 6 : 5);
      const skillDiff = Math.max(0, (devDiff >= 7 ? 4 : 2) - coding);
      const newFit = Math.min(10, Math.max(3, 10 - (skillDiff * 2)));
      finalReport.founderFitScore = newFit;
      finalReport.founderMarketFit.fitScore = newFit;
      
      // Recalculate risk-adjusted VC score
      const opportunityScore = Math.round((finalReport.painScore + finalReport.demandScore + finalReport.marketGapScore) / 3);
      const positiveAverage = (opportunityScore + finalReport.founderFitScore + finalReport.moatScore + finalReport.monetizationScore + finalReport.unitEconomicsScore + finalReport.survivalScore) / 6;
      const riskAverage = (finalReport.riskScore + finalReport.aiRiskScore + finalReport.platformRiskScore + finalReport.complianceScore + finalReport.distributionScore) / 5;
      
      finalReport.overallScore = Math.max(0, Math.min(100, Math.round((positiveAverage * 12) - (riskAverage * 2.5))));
      
      // Update verdict matching new VC thresholds
      if (finalReport.overallScore >= 95) {
        finalReport.verdict = "EXCEPTIONAL OPPORTUNITY";
      } else if (finalReport.overallScore >= 85) {
        finalReport.verdict = "BUILD IMMEDIATELY";
      } else if (finalReport.overallScore >= 75) {
        finalReport.verdict = "STRONG OPPORTUNITY";
      } else if (finalReport.overallScore >= 65) {
        finalReport.verdict = "VALIDATE FURTHER";
      } else if (finalReport.overallScore >= 50) {
        finalReport.verdict = "HIGH RISK";
      } else {
        finalReport.verdict = "DO NOT BUILD";
      }
      
      onLog(`[Investment Committee Judge] Risk-Adjusted Score: ${finalReport.overallScore}/100`, "success");
      onLog(`[Investment Committee Judge] Verdict: ${finalReport.verdict}`, "success");
      onLog("Analysis complete. Upgraded report saved to OS library.", "success");
      
      onFinished(finalReport);
      return;
    }

    const currentAgent = agentsRegistry[activeAgentIndex];
    onAgentStart(currentAgent);
    
    const logs = simulationLogs[activeAgentIndex] || [];
    let logIndex = 0;
    
    function printNextLog() {
      if (logIndex >= logs.length) {
        onAgentComplete(currentAgent, matchedReport[currentAgent.scoreKey] || null);
        activeAgentIndex++;
        scheduleAgentTask(nextStep, 30); // optimized pause between agents
        return;
      }
      
      onLog(logs[logIndex], "agent");
      logIndex++;
      scheduleAgentTask(printNextLog, 50); // optimized typewriter line speed
    }
    
    printNextLog();
  }

  scheduleAgentTask(nextStep, 100); // optimized kickoff delay
}

// Make available globally
window.agents = {
  registry: agentsRegistry,
  seededOpportunities: seededOpportunities,
  generateDynamicReport: generateDynamicReport,
  runAgentPipelineSimulation: runAgentPipelineSimulation,
  cancelPipeline: cancelAgentPipeline
};
