// Startup Intelligence OS - Main System Coordinator (v3.0 Research-First Engine)

const app = {
  // Founder Profile Configurations
  founderProfile: {
    name: "Solo Builder",
    coding: 4,
    design: 3,
    marketing: 3,
    sales: 2,
    hours: 20,
    budget: 1000
  },

  reportsLibrary: [],
  currentSimulationId: null,
  activeResearchResult: null,  // Stores the current research cycle output
  activeAbortController: null,
  researchHistory: [],
  rejectedIdeas: [],

  init() {
    this.startClock();
    this.runBootSequence();
    this.loadPreseededMarkets();
    this.restoreWorkspace();
    this.loadFounderProfileFromSliders();
    
    // Set default library list from seeded opportunities (legacy support)
    window.agents.seededOpportunities.forEach(report => {
      const normalized = StartupCore.normalizeReport(report);
      if (!this.isIdeaRejected(normalized.researchKeyword || 'global', normalized) &&
          !this.reportsLibrary.some(saved => saved.id === normalized.id)) {
        this.reportsLibrary.push(normalized);
      }
    });
    this.updateLibraryListUI();
  },

  restoreWorkspace() {
    const saved = StartupCore.Storage.load();
    this.reportsLibrary = (saved.reportsLibrary || []).map(StartupCore.normalizeReport);
    this.researchHistory = saved.researchHistory || [];
    this.rejectedIdeas = saved.rejectedIdeas || [];
    if (saved.serviceEndpoint) StartupCore.ResearchService.configure(saved.serviceEndpoint);
    if (!saved.founderProfile) return;
    this.founderProfile = { ...this.founderProfile, ...saved.founderProfile };
    const fields = {
      profCodingSlider: 'coding', profDesignSlider: 'design',
      profMarketingSlider: 'marketing', profSalesSlider: 'sales',
      profHoursSlider: 'hours', profBudgetSlider: 'budget'
    };
    Object.entries(fields).forEach(([id, key]) => {
      const element = document.getElementById(id);
      if (element) element.value = this.founderProfile[key];
    });
    const nameInput = document.getElementById('profNameInput');
    if (nameInput) nameInput.value = this.founderProfile.name;
    this.updateFounderName(this.founderProfile.name);
  },

  saveWorkspace() {
    StartupCore.Storage.save({
      founderProfile: this.founderProfile,
      reportsLibrary: this.reportsLibrary,
      researchHistory: this.researchHistory.slice(0, 25),
      rejectedIdeas: this.rejectedIdeas,
      serviceEndpoint: StartupCore.ResearchService.endpoint
    });
  },

  getIdeaSignature(niche, idea) {
    return StartupCore.ideaSignature(niche, idea);
  },

  isIdeaRejected(niche, idea) {
    const signature = this.getIdeaSignature(niche, idea);
    return this.rejectedIdeas.some(item => item.signature === signature);
  },

  filterRejectedIdeas(result) {
    if (!result || !Array.isArray(result.opportunities)) return result;
    result.opportunities = result.opportunities.filter(
      opportunity => !this.isIdeaRejected(result.keyword, opportunity)
    );
    result.topPicks = ResearchEngine._identifyTopPicks(result.opportunities);
    return result;
  },

  rejectIdea(idea, niche) {
    const researchNiche = niche || idea.researchKeyword || this.activeResearchResult?.keyword || 'global';
    const signature = this.getIdeaSignature(researchNiche, idea);
    if (!this.rejectedIdeas.some(item => item.signature === signature)) {
      this.rejectedIdeas.push({
        signature,
        niche: researchNiche,
        startupName: idea.startupName,
        rejectedAt: new Date().toISOString()
      });
    }
    this.reportsLibrary = this.reportsLibrary.filter(report =>
      report.id !== idea.id && report.startupName !== idea.startupName
    );
    if (this.activeResearchResult) {
      this.filterRejectedIdeas(this.activeResearchResult);
      ui.renderComparisonMatrix(this.activeResearchResult);
    }
    if (ui.activeReport && (ui.activeReport.id === idea.id ||
        ui.activeReport.startupName === idea.startupName)) {
      ui.activeReport = null;
      document.getElementById('reportContentContainer').style.display = 'none';
      document.getElementById('noReportSelectedMsg').style.display = 'block';
    }
    this.updateLibraryListUI();
    this.saveWorkspace();
  },

  startClock() {
    const clockEl = document.getElementById('systemClock');
    const updateTime = () => {
      const d = new Date();
      clockEl.innerText = d.toLocaleTimeString();
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  // Upgraded boot logs showing advanced VC verification matrices
  runBootSequence() {
    const term = document.getElementById('bootTerminal');
    const fill = document.getElementById('bootLoaderFill');
    const enterBtn = document.getElementById('enterSystemBtn');

    const bootLogs = [
      "SYSTEM BOOT: v3.0.0-research-first-engine",
      "RESEARCH DEPTH ENGINE: Initializing ecosystem mapping databases...",
      "PAIN CLUSTER HUNTER: Loading complaint aggregation pipelines...",
      "COMPETITOR SCANNER: Mounting intelligence frameworks...",
      "REVIEW ANALYZER: Synchronizing sentiment analysis models...",
      "GAP DISCOVERER: Initializing market gap detection algorithms...",
      "OPPORTUNITY GENERATOR: Loading multi-model diversification engine...",
      "COMPARISON MATRIX: Initializing 9-dimension ranking engine...",
      "ANTI-HALLUCINATION: Data confidence labeling ACTIVE",
      "THRESHOLD GATES: Minimum research requirements ENFORCED",
      "RULE: Startup ideas FORBIDDEN until research thresholds met",
      "RESEARCH DEPTH ENGINE: ALL PHASES ONLINE",
      "STARTUP INTELLIGENCE OS v3.0: READY."
    ];

    let currentLogIndex = 0;
    const totalDuration = 2200; // ms
    const logInterval = totalDuration / bootLogs.length;

    const printLog = () => {
      if (currentLogIndex >= bootLogs.length) {
        fill.style.width = "100%";
        enterBtn.style.display = "inline-flex";
        
        enterBtn.onclick = () => {
          document.getElementById('bootScreen').style.opacity = 0;
          setTimeout(() => {
            document.getElementById('bootScreen').style.display = "none";
          }, 800);
        };
        return;
      }

      const line = document.createElement('div');
      line.style.marginBottom = "4px";
      line.style.fontSize = "0.8rem";
      line.innerText = `> ${bootLogs[currentLogIndex]}`;
      term.appendChild(line);
      term.scrollTop = term.scrollHeight;

      const pct = (currentLogIndex / bootLogs.length) * 100;
      fill.style.width = `${pct}%`;

      currentLogIndex++;
      setTimeout(printLog, logInterval);
    };

    setTimeout(printLog, 200);
  },

  // Load Pre-Researched Markets onto home screen grid (Research-First)
  loadPreseededMarkets() {
    const grid = document.getElementById('preseededIdeasContainer');
    grid.innerHTML = '';
    
    // Show pre-researched market cards
    const preseededMarkets = [
      { keyword: 'youtube', label: 'YouTube Creator Economy', icon: 'fa-youtube', iconColor: '#ff0000', oppCount: 8, painClusters: 25, competitors: 12 }
    ];
    
    preseededMarkets.forEach(market => {
      const card = document.createElement('div');
      card.className = 'glass-card idea-card';
      card.style.cursor = 'pointer';
      card.onclick = () => {
        this.loadPreseededResearch(market.keyword);
      };
      
      card.innerHTML = `
        <span class="idea-badge"><i class="fa-solid fa-database"></i> PRE-RESEARCHED</span>
        <h3 class="card-title" style="margin-bottom: 8px; font-size: 1.25rem;">
          <i class="fa-brands ${market.icon}" style="color: ${market.iconColor};"></i> ${market.label}
        </h3>
        <p style="font-size: 0.85rem; margin-bottom: 16px;">Deep ecosystem research with ${market.painClusters} pain clusters, ${market.competitors} competitors analyzed, and ${market.oppCount} ranked startup opportunities.</p>
        <div class="idea-stats">
          <div class="stat-item">
            <span>Pain Clusters</span>
            <span style="color: var(--danger); font-weight: 700;">${market.painClusters}</span>
          </div>
          <div class="stat-item">
            <span>Competitors</span>
            <span style="color: var(--accent); font-weight: 700;">${market.competitors}</span>
          </div>
          <div class="stat-item">
            <span>Opportunities</span>
            <span style="color: var(--success); font-weight: 700;">${market.oppCount}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    
    // Also show legacy seeded opportunities as quick-view cards
    window.agents.seededOpportunities.forEach(idea => {
      const card = document.createElement('div');
      card.className = 'glass-card idea-card';
      card.style.cursor = 'pointer';
      card.onclick = () => {
        this.runSelectedIdeaScan(idea.id);
      };
      
      const opportunityScore = Math.round((idea.painScore + idea.demandScore + idea.marketGapScore) / 3);
      const positiveAverage = (opportunityScore + idea.founderFitScore + idea.moatScore + idea.monetizationScore + idea.unitEconomicsScore + idea.survivalScore) / 6;
      const riskAverage = (idea.riskScore + idea.aiRiskScore + idea.platformRiskScore + idea.complianceScore + idea.distributionScore) / 5;
      const calculatedScore = Math.max(0, Math.min(100, Math.round((positiveAverage * 12) - (riskAverage * 2.5))));
      idea.overallScore = calculatedScore;
      
      card.innerHTML = `
        <span class="idea-badge">${idea.theme}</span>
        <h3 class="card-title" style="margin-bottom: 8px; font-size: 1.25rem;">
          <i class="fa-solid fa-cube" style="color: var(--primary);"></i> ${idea.startupName}
        </h3>
        <p style="font-size: 0.85rem; margin-bottom: 16px;">${idea.executiveSummary.substring(0, 120)}...</p>
        <div class="idea-stats">
          <div class="stat-item">
            <span>Fail Risk</span>
            <span class="score-badge ${idea.riskScore >= 6 ? 'score-high' : 'score-medium'}">${idea.riskScore * 10}%</span>
          </div>
          <div class="stat-item">
            <span>AI Risk</span>
            <span class="score-badge ${idea.aiRiskScore >= 7 ? 'score-high' : 'score-medium'}">${idea.aiRiskScore}/10</span>
          </div>
          <div class="stat-item">
            <span>Venture Score</span>
            <span style="color: var(--accent); font-weight: 700;">${idea.overallScore}/100</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  // Load a pre-seeded research cycle instantly
  loadPreseededResearch(keyword) {
    const result = this.filterRejectedIdeas(
      ResearchEngine.generateResearchCycle(keyword, this.founderProfile)
    );
    this.activeResearchResult = result;
    
    // Render research dashboard with completed data
    ui.renderResearchDashboard(result, true);  // true = instant (no animation)
    this.switchView('research');
    
    // Also populate comparison matrix
    ui.renderComparisonMatrix(result);
    
    // Add opportunities to library
    result.opportunities.forEach(opp => {
      const fullReport = this._convertOpportunityToReport(opp, result);
      const dupIdx = this.reportsLibrary.findIndex(r => r.startupName === fullReport.startupName);
      if (dupIdx === -1) this.reportsLibrary.push(fullReport);
    });
    this.updateLibraryListUI();
  },

  switchView(viewId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const targetNav = document.getElementById(`nav-${viewId}`);
    if (targetNav) targetNav.classList.add('active');

    const views = document.querySelectorAll('.view-container');
    views.forEach(v => v.classList.remove('active'));
    
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add('active');

    document.getElementById('activeProcessName').innerText = `PROCESS: ${viewId.toUpperCase()}_VIEW`;
  },

  // Setup list of 24 agent cards in progress stack (legacy)
  initAgentProgressGrid(runningNicheName) {
    const grid = document.getElementById('agentsProgressGrid');
    grid.innerHTML = '';
    
    window.agents.registry.forEach(agent => {
      const card = document.createElement('div');
      card.className = 'agent-progress-card';
      card.id = `agent-card-${agent.id}`;
      card.innerHTML = `
        <div class="agent-icon-wrap">
          <i class="fa-solid ${agent.icon}"></i>
        </div>
        <div class="agent-mini-info">
          <span class="agent-mini-name">Agent ${agent.id}: ${agent.name}</span>
          <span class="agent-mini-status" id="agent-status-${agent.id}">PENDING</span>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  // Legacy: run a seeded idea through the old 24-agent pipeline
  runSelectedIdeaScan(ideaId) {
    const ideaObj = window.agents.seededOpportunities.find(i => i.id === ideaId);
    if (!ideaObj) return;

    this.initAgentProgressGrid(ideaObj.startupName);
    this.switchView('console');
    this.executeSimulationPipeline(ideaObj.startupName);
  },

  // ========================================
  // NEW: Research-First Cycle (replaces runCustomAnalysis)
  // ========================================
  async runResearchCycle() {
    const input = document.getElementById('ideaSearchInput');
    const query = input.value.trim();
    if (!query) {
      alert("Please enter a market or keyword to research.");
      return;
    }

    this.switchView('research');
    document.getElementById('sysDot').className = 'dot processing';
    document.getElementById('sysStatusText').innerText = 'RESEARCH_PIPELINE';
    this.activeAbortController = new AbortController();
    try {
      const remoteResult = await StartupCore.ResearchService.research(
        query, this.founderProfile, this.activeAbortController.signal
      );
      if (remoteResult) {
        this.completeResearch(remoteResult);
        return;
      }
      this.executeResearchPipeline(query);
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error(error);
      this.executeResearchPipeline(query);
    }
  },

  completeResearch(result) {
    result = this.filterRejectedIdeas(result);
    this.activeResearchResult = result;
    document.getElementById('sysDot').className = 'dot';
    document.getElementById('sysStatusText').innerText = 'SYS_ONLINE';
    ui.renderResearchDashboard(result, true);
    ui.renderComparisonMatrix(result);
    result.opportunities.forEach(opp => {
      const report = this._convertOpportunityToReport(opp, result);
      const index = this.reportsLibrary.findIndex(item => item.id === report.id);
      if (index >= 0) this.reportsLibrary[index] = report;
      else this.reportsLibrary.push(report);
    });
    this.researchHistory.unshift({
      keyword: result.keyword,
      generatedAt: result.generatedAt || new Date().toISOString(),
      confidence: result.dataConfidenceLevel,
      opportunityCount: result.opportunities.length
    });
    this.updateLibraryListUI();
    this.saveWorkspace();
  },

  executeResearchPipeline(keyword) {
    // Initialize research UI
    ui.initResearchView(keyword);
    
    ResearchEngine.runResearchSimulation({
      keyword: keyword,
      founderProfile: this.founderProfile,
      
      onPhaseStart: (phase, idx) => {
        ui.updateResearchPhase(phase, idx, 'active');
        document.getElementById('researchPhaseHeadline').innerHTML = 
          `<i class="fa-solid fa-spinner fa-spin" style="color: var(--accent);"></i> Phase ${idx + 1}/6: ${phase.name} — ${phase.description}`;
      },
      
      onPhaseComplete: (phase, idx) => {
        ui.updateResearchPhase(phase, idx, 'completed');
      },
      
      onLog: (message, type, progress) => {
        const term = document.getElementById('researchTerminalLog');
        const line = document.createElement('div');
        line.className = `log-line ${type || ''}`;
        const ts = new Date().toLocaleTimeString();
        line.innerHTML = `<span style="color: var(--text-dim); margin-right: 8px;">[${ts}]</span> ${message}`;
        term.appendChild(line);
        term.scrollTop = term.scrollHeight;
        
        document.getElementById('researchProgressPercent').innerText = `${progress}%`;
      },
      
      onThresholdUpdate: (thresholds) => {
        ui.updateResearchThresholds(thresholds);
      },
      
      onFinished: (result) => {
        this.activeResearchResult = result;
        
        document.getElementById('sysDot').className = 'dot';
        document.getElementById('sysStatusText').innerText = 'SYS_ONLINE';
        document.getElementById('researchPhaseHeadline').innerHTML = 
          `<i class="fa-solid fa-circle-check" style="color: var(--success);"></i> Research Complete — ${result.opportunities.length} opportunities generated`;
        document.getElementById('researchProgressPercent').innerText = '100%';
        
        // Render full research dashboard
        ui.renderResearchDashboard(result, false);
        
        // Render comparison matrix
        ui.renderComparisonMatrix(result);
        
        // Show "View Opportunities" button
        document.getElementById('viewOpportunitiesBtn').style.display = 'inline-flex';
        
        // Add opportunities to library
        result.opportunities.forEach(opp => {
          const fullReport = this._convertOpportunityToReport(opp, result);
          const dupIdx = this.reportsLibrary.findIndex(r => r.startupName === fullReport.startupName);
          if (dupIdx !== -1) {
            this.reportsLibrary[dupIdx] = fullReport;
          } else {
            this.reportsLibrary.push(fullReport);
          }
        });
        this.updateLibraryListUI();
      }
    });
  },

  // Convert a research opportunity into a legacy-compatible report for the library viewer
  _convertOpportunityToReport(opp, researchResult) {
    const cluster = researchResult.painClusters.find(c => c.id === opp.painClusterId) || {};
    return StartupCore.normalizeReport({
      id: StartupCore.slugify(`${researchResult.keyword}-${opp.startupName}`),
      researchKeyword: researchResult.keyword,
      startupName: opp.startupName,
      executiveSummary: opp.tagline,
      problemBeingSolved: cluster.description || opp.whyItWins,
      theme: opp.businessModel,
      painScore: opp.painScore,
      demandScore: opp.demandScore,
      marketGapScore: opp.marketGapScore,
      monetizationScore: opp.monetizationScore,
      riskScore: Math.round((opp.competitionScore + opp.aiRisk + opp.platformRisk) / 3),
      founderFitScore: opp.founderFitScore,
      moatScore: opp.moatStrength,
      aiRiskScore: opp.aiRisk,
      platformRiskScore: opp.platformRisk,
      complianceScore: 3,
      distributionScore: opp.distributionDifficulty,
      unitEconomicsScore: 7,
      survivalScore: opp.moatStrength,
      marketSize: opp.marketSize,
      marketSizeConfidence: opp.marketSizeConfidence || 'ESTIMATED DATA',
      mvpFeatures: opp.mvpFeatures || [],
      launchStrategy: [`Target ${opp.targetAudience}`, `Pricing: ${opp.pricing}`, opp.whyItWins],
      evidenceCollected: (opp.evidence || []).map((e, i) => ({
        source: `Research Finding #${i+1}`,
        quote: typeof e === 'string' ? e : e.text,
        url: typeof e === 'object' ? e.url : null
      })),
      competitors: researchResult.competitors.slice(0, 5).map(c => ({
        name: c.name,
        pricing: c.pricing,
        weakness: c.weaknesses[0] || 'N/A'
      })),
      evidenceSources: 'Research Depth Engine v3.0',
      marketDemandAnalysis: `Demand score ${opp.demandScore}/10 in the current dataset.`,
      marketGapAnalysis: opp.whyItWins,
      pricingRecommendations: opp.pricing,
      mvpRoadmap: {
        v1: (opp.mvpFeatures || []).slice(0, 2),
        v2: (opp.mvpFeatures || []).slice(2),
        v3: ['Add collaboration and integrations after paid validation.']
      },
      risks: opp.riskFactors || [],
      advantages: [opp.whyItWins],
      customerPersonas: [{
        name: `${opp.targetAudience} Lead`,
        role: opp.targetAudience,
        motivation: `Solve ${cluster.name || 'the target workflow'} faster.`,
        pain: cluster.description || 'Current tools are fragmented or manual.'
      }],
      seoKeywords: [],
      competitorAnalysis: researchResult.competitors.slice(0, 5).map(c => ({
        name: c.name,
        pricing: c.pricing,
        strengths: (c.strengths || []).join(', '),
        weaknesses: (c.weaknesses || []).join(', ')
      })),
      overallScore: opp.compositeScore,
      verdict: opp.compositeScore >= 70 ? 'STRONG OPPORTUNITY' : opp.compositeScore >= 50 ? 'MODERATE POTENTIAL' : 'HIGH RISK',
      verdictColor: opp.compositeScore >= 70 ? 'var(--success)' : opp.compositeScore >= 50 ? 'var(--warning)' : 'var(--danger)'
    });
  },

  executeSimulationPipeline(ideaText) {
    const term = document.getElementById('terminalLog');
    term.innerHTML = ''; 
    document.getElementById('sysDot').className = 'dot processing';
    document.getElementById('sysStatusText').innerText = 'DECISION_PIPELINE';
    document.getElementById('simulatorHeadline').innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color: var(--accent);"></i> Auditing Startup Gaps: "${ideaText}"`;

    let activeCard = null;
    
    window.agents.runAgentPipelineSimulation({
      ideaText: ideaText,
      founderProfile: this.founderProfile,
      
      onAgentStart: (agent) => {
        const card = document.getElementById(`agent-card-${agent.id}`);
        if (card) {
          card.className = 'agent-progress-card active';
          activeCard = card;
        }
        document.getElementById(`agent-status-${agent.id}`).innerText = 'AUDITING...';
      },
      
      onAgentComplete: (agent, score) => {
        const card = document.getElementById(`agent-card-${agent.id}`);
        if (card) {
          card.className = 'agent-progress-card completed';
        }
        const scoreText = score !== null ? `DONE (${score}/10)` : 'DONE';
        document.getElementById(`agent-status-${agent.id}`).innerText = scoreText;
      },
      
      onLog: (message, type) => {
        const line = document.createElement('div');
        line.className = `log-line ${type || ''}`;
        
        const ts = new Date().toLocaleTimeString();
        line.innerHTML = `<span style="color: var(--text-dim); margin-right: 8px;">[${ts}]</span> ${message}`;
        term.appendChild(line);
        term.scrollTop = term.scrollHeight;

        // Progress tracker adjusted for 24 agents logging
        const totalLogLineExpect = 85;
        const currentLineCount = term.childElementCount;
        const pct = Math.min(99, Math.round((currentLineCount / totalLogLineExpect) * 100));
        document.getElementById('pipelineProgressPercent').innerText = `Progress: ${pct}%`;
      },
      
      onFinished: (report) => {
        report = StartupCore.normalizeReport(report);
        document.getElementById('sysDot').className = 'dot';
        document.getElementById('sysStatusText').innerText = 'SYS_ONLINE';
        document.getElementById('pipelineProgressPercent').innerText = 'Progress: 100%';
        
        const dupIdx = this.reportsLibrary.findIndex(r => r.startupName.toLowerCase() === report.startupName.toLowerCase());
        if (dupIdx !== -1) {
          this.reportsLibrary[dupIdx] = report;
        } else {
          this.reportsLibrary.push(report);
        }
        
        this.updateLibraryListUI();
        this.saveWorkspace();
        
        setTimeout(() => {
          ui.renderReport(report);
          this.switchView('library');
        }, 1200);
      }
    });
  },

  cancelSimulation() {
    if (this.activeAbortController) this.activeAbortController.abort();
    this.activeAbortController = null;
    if (window.ResearchEngine && ResearchEngine.cancelSimulation) ResearchEngine.cancelSimulation();
    if (window.agents && window.agents.cancelPipeline) window.agents.cancelPipeline();
    this.switchView('dashboard');
    document.getElementById('sysDot').className = 'dot';
    document.getElementById('sysStatusText').innerText = 'SYS_ONLINE';
  },

  updateLibraryListUI() {
    const list = document.getElementById('libraryReportsList');
    list.innerHTML = '';
    
    this.reportsLibrary.forEach(rep => {
      const btn = document.createElement('div');
      btn.style.padding = '12px 14px';
      btn.style.borderRadius = '8px';
      btn.style.background = 'rgba(255,255,255,0.02)';
      btn.style.border = '1px solid var(--border-glass)';
      btn.style.cursor = 'pointer';
      btn.style.transition = 'var(--transition)';
      
      if (ui.activeReport && ui.activeReport.startupName === rep.startupName) {
        btn.style.borderColor = 'var(--accent)';
        btn.style.background = 'rgba(161, 140, 209, 0.04)';
      }
      
      btn.onclick = () => {
        ui.renderReport(StartupCore.normalizeReport(rep));
        this.updateLibraryListUI(); 
      };
      
      btn.innerHTML = `
        <div style="font-weight:600; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; color:#fff;">
          <span>${rep.startupName}</span>
          <span style="display:flex; align-items:center; gap:8px;">
            <span style="color:var(--accent); font-family:var(--font-mono); font-size:0.75rem;">${rep.overallScore}/100</span>
            <button class="idea-delete-btn" title="Reject and never suggest again" aria-label="Reject ${rep.startupName}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </span>
        </div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-top:4px;">${rep.theme}</div>
      `;
      btn.querySelector('.idea-delete-btn').onclick = (event) => {
        event.stopPropagation();
        if (confirm(`Reject "${rep.startupName}"? It will not be suggested again for this niche.`)) {
          this.rejectIdea(rep, rep.researchKeyword);
        }
      };
      list.appendChild(btn);
    });
    this.saveWorkspace();
  },

  loadFounderProfileFromSliders() {
    this.founderProfile.coding = parseInt(document.getElementById('profCodingSlider').value);
    this.founderProfile.design = parseInt(document.getElementById('profDesignSlider').value);
    this.founderProfile.marketing = parseInt(document.getElementById('profMarketingSlider').value);
    this.founderProfile.sales = parseInt(document.getElementById('profSalesSlider').value);
    this.founderProfile.hours = parseInt(document.getElementById('profHoursSlider').value);
    this.founderProfile.budget = parseInt(document.getElementById('profBudgetSlider').value);
    
    this.updateFounderProfileUI();
    this.saveWorkspace();
  },

  // Upgraded live recalculated equations when sliders move
  updateFounderProfileFromSliders() {
    this.loadFounderProfileFromSliders();
    
    if (ui.activeReport) {
      const activeRep = ui.activeReport;
      const coding = this.founderProfile.coding;
      
      const reportId = activeRep.id || StartupCore.slugify(activeRep.startupName);
      const devDiff = reportId.includes("repurpose") ? 8 : (reportId.includes("api") ? 6 : 5);
      const skillDiff = Math.max(0, (devDiff >= 7 ? 4 : 2) - coding);
      const newFit = Math.min(10, Math.max(3, 10 - (skillDiff * 2)));
      
      activeRep.founderFitScore = newFit;
      activeRep.founderMarketFit.fitScore = newFit;
      
      // Calculate dynamic risk-adjusted overall score
      const opportunityScore = Math.round((activeRep.painScore + activeRep.demandScore + activeRep.marketGapScore) / 3);
      const positiveAverage = (opportunityScore + activeRep.founderFitScore + activeRep.moatScore + activeRep.monetizationScore + activeRep.unitEconomicsScore + activeRep.survivalScore) / 6;
      const riskAverage = (activeRep.riskScore + activeRep.aiRiskScore + activeRep.platformRiskScore + activeRep.complianceScore + activeRep.distributionScore) / 5;
      
      activeRep.overallScore = Math.max(0, Math.min(100, Math.round((positiveAverage * 12) - (riskAverage * 2.5))));
      
      // Adjust verdicts
      if (activeRep.overallScore >= 95) {
        activeRep.verdict = "EXCEPTIONAL OPPORTUNITY";
      } else if (activeRep.overallScore >= 85) {
        activeRep.verdict = "BUILD IMMEDIATELY";
      } else if (activeRep.overallScore >= 75) {
        activeRep.verdict = "STRONG OPPORTUNITY";
      } else if (activeRep.overallScore >= 65) {
        activeRep.verdict = "VALIDATE FURTHER";
      } else if (activeRep.overallScore >= 50) {
        activeRep.verdict = "HIGH RISK";
      } else {
        activeRep.verdict = "DO NOT BUILD";
      }
      
      ui.renderReport(activeRep);
      this.updateLibraryListUI();
      this.saveWorkspace();
    }
  },

  updateFounderName(val) {
    const name = val.trim() || "Solo Builder";
    this.founderProfile.name = name;
    document.getElementById('profileNameDisplay').innerText = name;
    document.getElementById('profSummaryName').innerText = name;
    document.getElementById('founderAvatar').innerText = name.charAt(0).toUpperCase();
    document.getElementById('profileAvatarBig').innerText = name.substring(0, 2).toUpperCase();
    this.saveWorkspace();
  },

  updateFounderProfileUI() {
    const p = this.founderProfile;
    
    document.getElementById('profCodingVal').innerText = `${p.coding}/5`;
    document.getElementById('profDesignVal').innerText = `${p.design}/5`;
    document.getElementById('profMarketingVal').innerText = `${p.marketing}/5`;
    document.getElementById('profSalesVal').innerText = `${p.sales}/5`;
    document.getElementById('profHoursVal').innerText = `${p.hours} hrs`;
    document.getElementById('profBudgetVal').innerText = `$${p.budget.toLocaleString()}`;
    
    document.getElementById('profSumCoding').innerText = p.coding >= 4 ? `Strong (${p.coding}/5)` : (p.coding >= 3 ? `Moderate (${p.coding}/5)` : `Basic (${p.coding}/5)`);
    document.getElementById('profSumGtm').innerText = p.marketing >= 4 ? `Strong (${p.marketing}/5)` : (p.marketing >= 3 ? `Moderate (${p.marketing}/5)` : `Basic (${p.marketing}/5)`);
    document.getElementById('profSumHours').innerText = `${p.hours} Hours / Week`;
    document.getElementById('profSumBudget').innerText = `$${p.budget.toLocaleString()} Bootstrapping`;
    
    let classification = "Solo Builder";
    if (p.coding >= 4 && p.marketing >= 4) {
      classification = "Unicorn Full-Stack";
    } else if (p.coding >= 4) {
      classification = "Technical Founder";
    } else if (p.marketing >= 4 || p.sales >= 4) {
      classification = "Growth Founder";
    } else if (p.design >= 4) {
      classification = "Product-Led Designer";
    } else {
      classification = "Indie Hacker";
    }
    document.getElementById('profClassification').innerText = classification;
  }
};

window.app = app;

window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
