// Startup Intelligence OS - shared foundations
(function () {
  const STORAGE_KEY = "startup-intelligence-os:v4";

  const clone = (value) => JSON.parse(JSON.stringify(value));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const slugify = (value) => String(value || "opportunity")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const ideaSignature = (niche, idea) => {
    const source = idea || {};
    const identity = source.id || source.startupName || source.tagline || "opportunity";
    return `${slugify(niche || source.researchKeyword || "global")}::${slugify(identity)}`;
  };

  const hash = (value) => {
    let result = 2166136261;
    for (const char of String(value)) {
      result ^= char.charCodeAt(0);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  };

  const seededNumber = (seed, min, max) => {
    const value = hash(seed) / 4294967295;
    return Math.floor(value * (max - min + 1)) + min;
  };

  const calculateScore = (report, weights) => {
    const w = weights || {
      pain: 0.20, demand: 0.15, gap: 0.15, monetization: 0.10,
      moat: 0.10, founderFit: 0.10, competition: 0.05,
      distribution: 0.05, aiRisk: 0.05, platformRisk: 0.05
    };
    const positive =
      clamp(report.painScore, 0, 10) * w.pain +
      clamp(report.demandScore, 0, 10) * w.demand +
      clamp(report.marketGapScore, 0, 10) * w.gap +
      clamp(report.monetizationScore, 0, 10) * w.monetization +
      clamp(report.moatScore, 0, 10) * w.moat +
      clamp(report.founderFitScore, 0, 10) * w.founderFit;
    const negative =
      clamp(report.competitionScore, 0, 10) * w.competition +
      clamp(report.distributionScore, 0, 10) * w.distribution +
      clamp(report.aiRiskScore, 0, 10) * w.aiRisk +
      clamp(report.platformRiskScore, 0, 10) * w.platformRisk;
    return clamp(Math.round(((positive - negative + 3) / 10) * 100), 0, 100);
  };

  const defaults = {
    id: "generated-opportunity",
    startupName: "Untitled Opportunity",
    theme: "SaaS",
    executiveSummary: "Opportunity generated from market research.",
    problemBeingSolved: "A recurring workflow remains expensive, fragmented, or manual.",
    marketSize: "Needs validation",
    marketDemandAnalysis: "Demand must be confirmed with primary evidence.",
    marketGapAnalysis: "The proposed gap requires customer and competitor validation.",
    buildRec: "Run customer interviews and a paid-intent test before building.",
    pricingRecommendations: "Test willingness to pay with three pricing anchors.",
    evidenceSources: "Estimated research model",
    evidenceCollected: [],
    customerPersonas: [],
    seoKeywords: [],
    competitorAnalysis: [],
    advantages: [],
    risks: [],
    painScore: 5, demandScore: 5, competitionScore: 5, marketGapScore: 5,
    monetizationScore: 5, founderFitScore: 5, moatScore: 5, riskScore: 5,
    aiRiskScore: 5, platformRiskScore: 5, complianceScore: 5,
    distributionScore: 5, unitEconomicsScore: 5, survivalScore: 5,
    walletScore: 5, trendScore: 5, seoOpportunityScore: 5,
    acquisitionPotentialScore: 5, soloFounderScore: 5,
    mvpRoadmap: { v1: [], v2: [], v3: [] },
    killerReport: { failureProb: "50%", fatalWarnings: [], topReasons: [] },
    founderMarketFit: { fitScore: 5, advantages: [], weaknesses: [] },
    moatReport: {
      moatScore: 5, defensibilityScore: 4, survivalRating: "VALIDATE",
      openaiThreat: "Needs validation", googleThreat: "Needs validation",
      competitorClone: "Clone speed has not been validated."
    },
    walletReport: {
      payProbability: 5, budgetAvailability: 5,
      spendingAnalysis: "Interview budget owners and test paid intent."
    },
    distributionDifficulty: {
      diffScore: 5, acqDifficulty: "Medium",
      channels: ["Customer interviews", "Niche communities", "Targeted outbound"]
    },
    aiRiskReport: {
      aiRiskScore: 5, obsolescenceEstimate: "Needs validation",
      survivalProbability: "50%"
    },
    platformDependency: {
      platformRiskScore: 5, dependencyAnalysis: "Map required APIs and fallback paths.",
      businessFragility: "Moderate"
    },
    complianceReport: {
      complianceScore: 5, readinessScore: 5,
      securityAssessment: "Complete a data-flow and regulatory review."
    },
    cogsReport: {
      margin: "Needs modeling", unitScore: 5,
      profitability: "Validate infrastructure and third-party API costs."
    },
    simulatorReport: {
      survivalProb: "50%",
      bestCase: { growth: "15% MoM", churn: "2%", cac: "$50", revenue: "$100,000", burn: "$2,000" },
      expectedCase: { growth: "7% MoM", churn: "5%", cac: "$100", revenue: "$50,000", burn: "$3,000" },
      worstCase: { growth: "1% MoM", churn: "12%", cac: "$250", revenue: "$10,000", burn: "$4,000" }
    },
    committeeReport: {
      votes: { bootstrap: "VALIDATE", indie: "VALIDATE", angel: "PASS", vc: "PASS", pm: "VALIDATE", growth: "VALIDATE" },
      reasons: {
        bootstrap: "Validate paid demand first.", indie: "Keep the MVP narrow.",
        angel: "Evidence is not yet investment-ready.", vc: "Scale is unproven.",
        pm: "Confirm workflow frequency.", growth: "Test one repeatable channel."
      },
      consensus: "Validation required before committing significant capital."
    }
  };

  const mergeNested = (base, source) => Object.assign({}, base, source || {});

  const normalizeReport = (input) => {
    const report = Object.assign({}, clone(defaults), input || {});
    report.id = report.id || slugify(report.startupName);
    report.mvpRoadmap = mergeNested(defaults.mvpRoadmap, report.mvpRoadmap);
    report.killerReport = mergeNested(defaults.killerReport, report.killerReport);
    report.founderMarketFit = mergeNested(defaults.founderMarketFit, report.founderMarketFit);
    report.moatReport = mergeNested(defaults.moatReport, report.moatReport);
    report.walletReport = mergeNested(defaults.walletReport, report.walletReport);
    report.distributionDifficulty = mergeNested(defaults.distributionDifficulty, report.distributionDifficulty);
    report.aiRiskReport = mergeNested(defaults.aiRiskReport, report.aiRiskReport);
    report.platformDependency = mergeNested(defaults.platformDependency, report.platformDependency);
    report.complianceReport = mergeNested(defaults.complianceReport, report.complianceReport);
    report.cogsReport = mergeNested(defaults.cogsReport, report.cogsReport);
    report.simulatorReport = mergeNested(defaults.simulatorReport, report.simulatorReport);
    report.committeeReport = {
      votes: mergeNested(defaults.committeeReport.votes, report.committeeReport && report.committeeReport.votes),
      reasons: mergeNested(defaults.committeeReport.reasons, report.committeeReport && report.committeeReport.reasons),
      consensus: report.committeeReport && report.committeeReport.consensus || defaults.committeeReport.consensus
    };
    report.overallScore = Number.isFinite(Number(report.overallScore))
      ? clamp(report.overallScore, 0, 100)
      : calculateScore(report);
    report.verdict = report.verdict || (report.overallScore >= 70
      ? "STRONG OPPORTUNITY" : report.overallScore >= 50 ? "VALIDATE FURTHER" : "HIGH RISK");
    report.createdAt = report.createdAt || new Date().toISOString();
    report.updatedAt = new Date().toISOString();
    report.favorite = Boolean(report.favorite);
    report.notes = report.notes || "";
    return report;
  };

  const Storage = {
    load() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch (error) {
        console.warn("Unable to load saved workspace", error);
        return {};
      }
    },
    save(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return true;
      } catch (error) {
        console.warn("Unable to save workspace", error);
        return false;
      }
    },
    clear() {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const ResearchService = {
    endpoint: "",
    configure(endpoint) {
      this.endpoint = String(endpoint || "").trim();
    },
    async research(keyword, founderProfile, signal) {
      if (!this.endpoint) return null;
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, founderProfile }),
        signal
      });
      if (!response.ok) throw new Error(`Research service failed (${response.status})`);
      return response.json();
    }
  };

  window.StartupCore = {
    Storage, ResearchService, normalizeReport, calculateScore,
    seededNumber, slugify, ideaSignature, clamp
  };
})();
