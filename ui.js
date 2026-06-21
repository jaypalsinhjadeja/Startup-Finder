// Startup Intelligence OS - Upgraded UI Management & Rendering

const ui = {
  activeReport: null,
  activeReportTab: "overview",

  switchReportTab(tabId, tabButton) {
    this.activeReportTab = tabId;
    
    const buttons = tabButton.parentNode.querySelectorAll('.report-tab');
    buttons.forEach(btn => btn.classList.remove('active'));
    tabButton.classList.add('active');
    
    const sections = tabButton.parentNode.parentNode.querySelectorAll('.report-section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    const targetSection = document.getElementById(`rep-sec-${tabId}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  },

  // Populates all 24 agent data blocks inside Report Viewer
  renderReport(report) {
    report = StartupCore.normalizeReport(report);
    this.activeReport = report;
    
    document.getElementById('noReportSelectedMsg').style.display = 'none';
    document.getElementById('reportContentContainer').style.display = 'block';
    
    // Set Header Info
    document.getElementById('repStartupName').innerText = report.startupName;
    document.getElementById('repExecutiveSummary').innerText = report.executiveSummary;
    document.getElementById('repProblemStatement').innerText = report.problemBeingSolved;
    document.getElementById('repMarketSize').innerText = report.marketSize || "$100M+ ARR";
    document.getElementById('repTrendDirection').innerText = report.trendScore >= 7 ? "UPWARD" : "STABLE";
    document.getElementById('repMarketDemandExplanation').innerText = report.marketDemandAnalysis;
    document.getElementById('repMarketGapReport').innerText = report.marketGapAnalysis;
    
    // Set Overall Score Circle
    document.getElementById('repOverallScore').innerText = report.overallScore;
    document.getElementById('repVerdictText').innerText = report.verdict;
    
    // Set verdict color thresholds
    const verdictEl = document.getElementById('repVerdictText');
    if (report.overallScore >= 95) {
      verdictEl.className = 'tag-badge tag-success';
    } else if (report.overallScore >= 85) {
      verdictEl.className = 'tag-badge tag-success';
    } else if (report.overallScore >= 75) {
      verdictEl.className = 'tag-badge tag-primary';
    } else if (report.overallScore >= 65) {
      verdictEl.className = 'tag-badge tag-warning';
    } else {
      verdictEl.className = 'tag-badge tag-danger';
    }
    
    document.getElementById('repVerdictDescription').innerText = report.buildRec;
    
    const circle = document.getElementById('overallScoreCircle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (report.overallScore / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = report.overallScore >= 85 ? "var(--success)" : (report.overallScore >= 65 ? "var(--primary)" : "var(--danger)");

    // 1. Overview Tab & Dimensions (11 Core scores)
    const setBar = (idPrefix, val) => {
      document.getElementById(`${idPrefix}Val`).innerText = `${val}/10`;
      const fillBar = document.getElementById(`${idPrefix}Bar`);
      fillBar.style.width = `${val * 10}%`;
      fillBar.style.background = val >= 8 ? "linear-gradient(to right, var(--success), var(--primary))" : (val >= 5 ? "linear-gradient(to right, var(--secondary), var(--primary))" : "linear-gradient(to right, var(--danger), var(--warning))");
    };
    
    const opportunityScore = Math.round((report.painScore + report.demandScore + report.marketGapScore) / 3);
    setBar('scoreOpportunity', opportunityScore);
    setBar('scoreRisk', report.riskScore);
    setBar('scoreFit', report.founderFitScore);
    setBar('scoreMoat', report.moatScore);
    setBar('scoreMonetization', report.monetizationScore);
    setBar('scoreDistribution', report.distributionScore);
    setBar('scoreCompliance', report.complianceScore);
    setBar('scoreUnitEconomics', report.unitEconomicsScore);
    setBar('scoreAiRisk', report.aiRiskScore);
    setBar('scorePlatformRisk', report.platformRiskScore);
    setBar('scoreSurvival', report.survivalScore);

    // Render Investment Committee Personas
    document.getElementById('repCommitteeConsensus').innerText = `Consensus analysis: ${report.committeeReport.consensus}`;
    const committeeGrid = document.getElementById('repCommitteeGrid');
    committeeGrid.innerHTML = '';
    
    const roles = [
      { key: "bootstrap", label: "Bootstrap Founder" },
      { key: "indie", label: "Indie Hacker" },
      { key: "angel", label: "Angel Investor" },
      { key: "vc", label: "Venture Capitalist" },
      { key: "pm", label: "Product Manager" },
      { key: "growth", label: "Growth Marketer" }
    ];
    
    roles.forEach(role => {
      const vote = report.committeeReport.votes[role.key];
      const reason = report.committeeReport.reasons[role.key];
      const badgeClass = vote === "BUILD" ? "tag-success" : "tag-danger";
      
      const card = document.createElement('div');
      card.className = 'committee-card';
      card.style.padding = '12px';
      card.style.background = 'rgba(255,255,255,0.01)';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:0.8rem; color:#fff;">${role.label}</strong>
          <span class="tag-badge ${badgeClass}" style="font-size:0.65rem;">${vote}</span>
        </div>
        <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.4;">${reason}</p>
      `;
      committeeGrid.appendChild(card);
    });

    // Advantages & Risks lists
    const advantagesContainer = document.getElementById('repAdvantagesList');
    advantagesContainer.innerHTML = '';
    report.advantages.forEach(adv => {
      const li = document.createElement('li');
      li.innerText = adv;
      advantagesContainer.appendChild(li);
    });

    const risksContainer = document.getElementById('repRisksList');
    risksContainer.innerHTML = '';
    report.risks.forEach(risk => {
      const li = document.createElement('li');
      li.innerText = risk;
      risksContainer.appendChild(li);
    });

    // 2. Demand Tab Details
    const seoBody = document.getElementById('repSeoKeywordsTableBody');
    seoBody.innerHTML = '';
    report.seoKeywords.forEach(kw => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${kw.keyword}</td>
        <td style="font-family: var(--font-mono);">${kw.volume}</td>
        <td><span class="tag-badge ${kw.kd.includes('Low') ? 'tag-success' : 'tag-warning'}">${kw.kd}</span></td>
      `;
      seoBody.appendChild(tr);
    });

    const compBody = document.querySelector('#repCompetitorsTable tbody');
    if (compBody) {
      compBody.innerHTML = '';
      report.competitorAnalysis.forEach(comp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${comp.name}</strong></td>
          <td style="font-family: var(--font-mono);">${comp.pricing}</td>
          <td>${comp.strengths}</td>
          <td>${comp.weaknesses}</td>
        `;
        compBody.appendChild(tr);
      });
    }

    const evidenceContainer = document.getElementById('repEvidenceList');
    evidenceContainer.innerHTML = '';
    report.evidenceCollected.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'evidence-card';
      
      let sourceHTML = `<i class="fa-solid fa-quote-left"></i> ${ev.source}`;
      if (ev.url) {
        sourceHTML = `<a href="${ev.url}" target="_blank" class="evidence-link"><i class="fa-solid fa-square-share-nodes"></i> ${ev.source} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.6rem; opacity:0.8; margin-left:2px;"></i></a>`;
      }
      
      card.innerHTML = `
        <div class="evidence-source">${sourceHTML}</div>
        <div class="evidence-quote">${ev.quote}</div>
      `;
      evidenceContainer.appendChild(card);
    });
    document.getElementById('repEvidenceSourcesText').innerText = report.evidenceSources || "Reddit, G2 Crowd, Twitter";

    // Audience ICPs
    const personasContainer = document.getElementById('repCustomerPersonasContainer');
    personasContainer.innerHTML = '';
    report.customerPersonas.forEach(p => {
      const div = document.createElement('div');
      div.className = 'persona-card';
      div.innerHTML = `
        <div class="persona-header">
          <div class="persona-avatar">${p.name.charAt(0)}</div>
          <div class="persona-meta">
            <h4>${p.name}</h4>
            <span>${p.role}</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; margin-bottom: 8px;"><strong>Motivation:</strong> ${p.motivation}</p>
        <p style="font-size: 0.85rem; color: var(--warning);"><strong>Pain:</strong> ${p.pain}</p>
      `;
      personasContainer.appendChild(div);
    });

    // 3. Risks & Defensibility Tab
    const killerWarnings = document.getElementById('repKillerWarnings');
    killerWarnings.innerHTML = '';
    report.killerReport.fatalWarnings.forEach(warn => {
      const li = document.createElement('li');
      li.style.color = 'var(--danger)';
      li.style.fontSize = '0.85rem';
      li.style.marginBottom = '6px';
      li.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${warn}`;
      killerWarnings.appendChild(li);
    });

    const killerReasons = document.getElementById('repKillerReasons');
    killerReasons.innerHTML = '';
    report.killerReport.topReasons.forEach(reason => {
      const li = document.createElement('li');
      li.style.marginBottom = '4px';
      li.innerText = reason;
      killerReasons.appendChild(li);
    });

    document.getElementById('repMoatSurvival').innerText = report.moatReport.survivalRating;
    document.getElementById('repMoatSurvival').className = `tag-badge ${report.moatReport.survivalRating.includes('HIGH') ? 'tag-success' : 'tag-warning'}`;
    document.getElementById('repMoatScoreVal').innerText = `${report.moatScore}/10`;
    document.getElementById('repMoatDefScoreVal').innerText = `${report.moatReport.defensibilityScore}/10`;
    document.getElementById('repMoatOpenai').innerText = report.moatReport.openaiThreat;
    document.getElementById('repMoatGoogle').innerText = report.moatReport.googleThreat;
    document.getElementById('repMoatCompetitor').innerText = report.moatReport.competitorClone;

    const repAiObs = document.getElementById('repAiObsolescence');
    repAiObs.innerText = report.aiRiskReport.obsolescenceEstimate;
    repAiObs.className = 'slider-val';
    repAiObs.style.color = report.aiRiskReport.obsolescenceEstimate.includes('1-2') ? 'var(--danger)' : 'var(--success)';
    document.getElementById('repAiRiskScore').innerText = `${report.aiRiskScore}/10`;
    document.getElementById('repAiRiskScore').className = `tag-badge ${report.aiRiskScore >= 7 ? 'tag-danger' : 'tag-primary'}`;
    document.getElementById('repAiSurvivalProb').innerText = report.aiRiskReport.survivalProbability;

    document.getElementById('repPlatformFragility').innerText = report.platformDependency.businessFragility;
    document.getElementById('repPlatformFragility').className = `tag-badge ${report.platformDependency.businessFragility.includes('High') ? 'tag-danger' : 'tag-primary'}`;
    document.getElementById('repPlatformRiskScore').innerText = `${report.platformRiskScore}/10`;
    document.getElementById('repPlatformDependencyAnalysis').innerText = report.platformDependency.dependencyAnalysis;

    // 4. Finance & Economics Tab
    document.getElementById('repWalletPayProb').innerText = `${report.walletScore}/10`;
    document.getElementById('repWalletBudgetVal').innerText = `${report.walletReport.budgetAvailability}/10`;
    document.getElementById('repWalletSpendingAnalysis').innerText = report.walletReport.spendingAnalysis;

    document.getElementById('repCogsMargin').innerText = report.cogsReport.margin;
    document.getElementById('repCogsScoreVal').innerText = `${report.unitEconomicsScore}/10`;
    document.getElementById('repCogsProfitability').innerText = report.cogsReport.profitability;

    // Startup Simulator
    document.getElementById('repSimSurvivalProb').innerText = report.simulatorReport.survivalProb;
    
    const fillSimRow = (prefix, data) => {
      document.getElementById(`repSim${prefix}Growth`).innerText = data.growth;
      document.getElementById(`repSim${prefix}Churn`).innerText = data.churn;
      document.getElementById(`repSim${prefix}Cac`).innerText = data.cac;
      document.getElementById(`repSim${prefix}Revenue`).innerText = data.revenue;
      document.getElementById(`repSim${prefix}Burn`).innerText = data.burn;
    };
    fillSimRow('Best', report.simulatorReport.bestCase);
    fillSimRow('Expected', report.simulatorReport.expectedCase);
    fillSimRow('Worst', report.simulatorReport.worstCase);

    document.getElementById('repPricingSuggestions').innerText = report.pricingRecommendations;

    // 5. MVP & GTM Tab
    document.getElementById('repDistDiffVal').innerText = `${report.distributionScore}/10`;
    document.getElementById('repDistDifficulty').innerText = report.distributionDifficulty.acqDifficulty;
    document.getElementById('repDistDifficulty').className = `tag-badge ${report.distributionDifficulty.acqDifficulty.includes('High') ? 'tag-danger' : 'tag-primary'}`;
    
    const channelsContainer = document.getElementById('repGtmChannelsList');
    channelsContainer.innerHTML = '';
    report.distributionDifficulty.channels.forEach(ch => {
      const li = document.createElement('li');
      li.innerText = ch;
      channelsContainer.appendChild(li);
    });

    const roadmapContainer = document.getElementById('repMvpRoadmapTimeline');
    roadmapContainer.innerHTML = '';
    const steps = [
      { v: 'V1', title: 'MVP Scope', list: report.mvpRoadmap.v1, active: true },
      { v: 'V2', title: 'Version 2 Growth', list: report.mvpRoadmap.v2, active: false },
      { v: 'V3', title: 'Version 3 Platform', list: report.mvpRoadmap.v3, active: false }
    ];
    steps.forEach(s => {
      const stepDiv = document.createElement('div');
      stepDiv.className = `roadmap-step ${s.active ? 'active' : ''}`;
      let itemsList = '';
      s.list.forEach(item => { itemsList += `<li>${item}</li>`; });
      stepDiv.innerHTML = `
        <div class="roadmap-content">
          <h4><span class="badge-v">${s.v}</span> ${s.title}</h4>
          <ul class="feature-list" style="margin-top: 8px;">${itemsList}</ul>
        </div>
      `;
      roadmapContainer.appendChild(stepDiv);
    });

    const reportId = report.id || StartupCore.slugify(report.startupName);
    document.getElementById('repTechStack').innerText = reportId.includes("api") ? "Frontend: React.js (Vite)\nBackend: Node.js / Express\nDatabase: PostgreSQL\nQueue: Redis / BullMQ\nHosting: AWS ECS" : (reportId.includes("repurpose") ? "Frontend: Next.js / React\nMedia Processing: FFmpeg (Serverless)\nDatabase: Supabase / Postgres\nHosting: Vercel + AWS Lambda" : "Frontend: React.js SPA\nIntegration Layer: Python / FastAPI\nDatabase: PostgreSQL\nOAuth: provider developer portal");

    // 6. Fit & Compliance Tab
    document.getElementById('repComplianceScoreVal').innerText = `${report.complianceScore}/10`;
    document.getElementById('repComplianceReadiness').innerText = `${report.complianceReport.readinessScore}/10`;
    document.getElementById('repComplianceAssessment').innerText = report.complianceReport.securityAssessment;

    const fitAdv = document.getElementById('repFounderFitAdvantages');
    fitAdv.innerHTML = '';
    report.founderMarketFit.advantages.forEach(a => {
      const li = document.createElement('li');
      li.innerText = a;
      fitAdv.appendChild(li);
    });

    const fitWeak = document.getElementById('repFounderFitWeaknesses');
    fitWeak.innerHTML = '';
    report.founderMarketFit.weaknesses.forEach(w => {
      const li = document.createElement('li');
      li.innerText = w;
      fitWeak.appendChild(li);
    });

    // Setup revenue sliders defaults
    const isMediumPrice = reportId.includes("revops") ? 199 : (reportId.includes("api") ? 79 : 29);
    document.getElementById('calcPriceSlider').value = isMediumPrice;
    document.getElementById('calcPriceVal').innerText = `$${isMediumPrice}`;
    document.getElementById('calcCustomersSlider').value = 100;
    document.getElementById('calcCustomersVal').innerText = '100';
    this.updateRevenueCalculator();

    // Redraw the 11-spoke Radar chart
    this.renderRadarChart(report);
    this.renderWorkspaceTools(report);
  },

  renderWorkspaceTools(report) {
    const host = document.getElementById('reportContentContainer');
    let panel = document.getElementById('reportWorkspaceTools');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'reportWorkspaceTools';
      panel.className = 'glass-card';
      panel.style.marginBottom = '20px';
      host.insertBefore(panel, host.children[1]);
    }
    panel.innerHTML = `
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
        <button class="btn" id="favoriteReportBtn">${report.favorite ? '★ Favorited' : '☆ Favorite'}</button>
        <button class="btn btn-danger" id="rejectReportBtn"><i class="fa-solid fa-trash"></i> Reject Idea</button>
        <button class="btn" id="validationPlanBtn">Generate Validation Plan</button>
        <button class="btn" id="exportWorkspaceBtn">Export Workspace JSON</button>
        <label class="btn" style="cursor:pointer;">Import Workspace JSON
          <input id="importWorkspaceInput" type="file" accept="application/json" style="display:none;">
        </label>
      </div>
      <textarea id="reportNotesInput" class="search-input" rows="3"
        placeholder="Private notes, interview findings, objections, next actions..."
        style="margin-top:12px; width:100%; border:1px solid var(--border-glass); border-radius:8px; padding:10px;"></textarea>
      <div id="validationPlanOutput" style="margin-top:12px;"></div>
    `;
    document.getElementById('reportNotesInput').value = report.notes || '';
    document.getElementById('favoriteReportBtn').onclick = () => {
      report.favorite = !report.favorite;
      app.saveWorkspace();
      app.updateLibraryListUI();
      this.renderWorkspaceTools(report);
    };
    document.getElementById('rejectReportBtn').onclick = () => {
      if (confirm(`Reject "${report.startupName}"? It will not be suggested again for this niche.`)) {
        app.rejectIdea(report, report.researchKeyword);
      }
    };
    document.getElementById('reportNotesInput').oninput = (event) => {
      report.notes = event.target.value;
      app.saveWorkspace();
    };
    document.getElementById('validationPlanBtn').onclick = () => this.renderValidationPlan(report);
    document.getElementById('exportWorkspaceBtn').onclick = () => this.exportWorkspaceJson();
    document.getElementById('importWorkspaceInput').onchange = (event) => this.importWorkspaceJson(event);
  },

  renderValidationPlan(report) {
    const output = document.getElementById('validationPlanOutput');
    const audience = report.customerPersonas[0] && report.customerPersonas[0].role || 'target customers';
    const price = parseInt((report.pricingRecommendations.match(/\d+/) || ['29'])[0], 10);
    output.innerHTML = `
      <h4 style="margin-bottom:8px;">14-Day Evidence Plan</h4>
      <ol style="padding-left:20px; line-height:1.7;">
        <li>Interview 10 ${audience}; require at least 6 to confirm the same high-frequency pain.</li>
        <li>Publish a landing page with a $${price} paid pilot or refundable deposit.</li>
        <li>Send 100 targeted outreach messages; target 10% replies and 3 paid commitments.</li>
        <li>Prototype only the first V1 workflow and measure time or money saved.</li>
        <li>Stop or reposition if fewer than 3 buyers commit after two iterations.</li>
      </ol>
    `;
  },

  exportWorkspaceJson() {
    const data = StartupCore.Storage.load();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'startup-intelligence-workspace.json';
    link.click();
    URL.revokeObjectURL(link.href);
  },

  importWorkspaceJson(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        StartupCore.Storage.save(data);
        app.restoreWorkspace();
        app.updateLibraryListUI();
        alert('Workspace imported successfully.');
      } catch (error) {
        alert('Invalid workspace JSON file.');
      }
    };
    reader.readAsText(file);
  },

  updateRevenueCalculator() {
    const price = parseInt(document.getElementById('calcPriceSlider').value);
    const customers = parseInt(document.getElementById('calcCustomersSlider').value);
    document.getElementById('calcPriceVal').innerText = `$${price}`;
    document.getElementById('calcCustomersVal').innerText = customers;
    const mrr = price * customers;
    const arr = mrr * 12;
    document.getElementById('calcResultMrr').innerText = `$${mrr.toLocaleString()}`;
    document.getElementById('calcResultArr').innerText = `$${arr.toLocaleString()}`;
  },

  // Drawing an 11-Dimensional Radar chart in standard HTML5 Canvas
  renderRadarChart(report) {
    const canvas = document.getElementById('radarChartCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 280 * dpr;
    canvas.height = 280 * dpr;
    canvas.style.width = '280px';
    canvas.style.height = '280px';
    ctx.scale(dpr, dpr);
    
    const centerX = 140;
    const centerY = 140;
    const maxRadius = 90;
    
    ctx.clearRect(0, 0, 280, 280);
    
    const opportunityScore = Math.round((report.painScore + report.demandScore + report.marketGapScore) / 3);
    
    // 11 Core dimensions
    const dimensions = [
      { name: "Opportunity", val: opportunityScore },
      { name: "Killer Risk", val: report.riskScore },
      { name: "Founder Fit", val: report.founderFitScore },
      { name: "Moat Score", val: report.moatScore },
      { name: "Monetization", val: report.monetizationScore },
      { name: "Distribution", val: report.distributionScore },
      { name: "Compliance", val: report.complianceScore },
      { name: "Unit Econ", val: report.unitEconomicsScore },
      { name: "AI Risk", val: report.aiRiskScore },
      { name: "Platform Dependency", val: report.platformRiskScore },
      { name: "Survival", val: report.survivalScore }
    ];
    
    const count = dimensions.length;
    
    // Draw grid rings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    for (let r = 1; r <= 5; r++) {
      const radius = (r / 5) * maxRadius;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const angle = (i * 2 * Math.PI / count) - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    // Draw spokes & labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillStyle = 'var(--text-muted)';
    ctx.font = '8px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    dimensions.forEach((dim, i) => {
      const angle = (i * 2 * Math.PI / count) - (Math.PI / 2);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      const outerX = centerX + maxRadius * Math.cos(angle);
      const outerY = centerY + maxRadius * Math.sin(angle);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
      
      const labelRadius = maxRadius + 18;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      
      // Split label names by space if they are too long
      const labelText = dim.name.split(' ')[0];
      ctx.fillText(labelText, labelX, labelY);
    });
    
    // Draw report polygon area
    ctx.beginPath();
    dimensions.forEach((dim, i) => {
      const angle = (i * 2 * Math.PI / count) - (Math.PI / 2);
      const valRadius = (dim.val / 10) * maxRadius;
      const x = centerX + valRadius * Math.cos(angle);
      const y = centerY + valRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(161, 140, 209, 0.15)'; // Violet/cyber style fill
    ctx.fill();
    ctx.strokeStyle = 'var(--accent)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Dots
    dimensions.forEach((dim, i) => {
      const angle = (i * 2 * Math.PI / count) - (Math.PI / 2);
      const valRadius = (dim.val / 10) * maxRadius;
      const x = centerX + valRadius * Math.cos(angle);
      const y = centerY + valRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'var(--accent)';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    });
  },

  // Export fully upgraded Markdown Decision Report
  exportMarkdown() {
    if (!this.activeReport) return;
    const r = this.activeReport;
    
    let evidenceText = "";
    r.evidenceCollected.forEach(ev => {
      const urlLine = ev.url ? `  🔗 [View Source](${ev.url})\n` : '';
      evidenceText += `- **Source:** ${ev.source}\n  *Quote:* "${ev.quote.replace(/"/g, '\\"')}"\n${urlLine}\n`;
    });
    
    let competitorsText = "";
    r.competitorAnalysis.forEach(c => {
      competitorsText += `### Competitor: ${c.name}\n- **Pricing:** ${c.pricing}\n- **Strengths:** ${c.strengths}\n- **Weaknesses:** ${c.weaknesses}\n\n`;
    });
    
    let mvpText = "### Must Have (V1 MVP)\n";
    r.mvpRoadmap.v1.forEach(item => { mvpText += `- ${item}\n`; });
    mvpText += "\n### Should Have (V2)\n";
    r.mvpRoadmap.v2.forEach(item => { mvpText += `- ${item}\n`; });
    mvpText += "\n### Nice to Have (V3)\n";
    r.mvpRoadmap.v3.forEach(item => { mvpText += `- ${item}\n`; });

    const opportunityScore = Math.round((r.painScore + r.demandScore + r.marketGapScore) / 3);

    const mdContent = `# Startup Name
${r.startupName}

# Executive Summary
${r.executiveSummary}

# Problem Being Solved
${r.problemBeingSolved}

# Evidence Collected
${evidenceText}

# Target Audience
${r.targetAudience}

# Market Demand Analysis
${r.marketDemandAnalysis}

# Trend Analysis
${r.trendAnalysis}

# Competitor Analysis
${competitorsText}

# Market Gap Analysis
${r.marketGapAnalysis}

# Monetization Strategy
${r.monetizationStrategy || 'Subscription-based SaaS model'}

# Pricing Recommendations
${r.pricingRecommendations}

# MVP Roadmap
${mvpText}

# Build Complexity
${r.buildComplexity}

# Founder Fit Analysis
${r.founderFitAnalysis}

# Customer Acquisition Strategy
${r.customerAcquisitionStrategy}

# SEO Opportunity Analysis
${r.seoOpportunityAnalysis}

# Revenue Forecast
- **Month 24 ARR Target (Expected Case):** ${r.simulatorReport.expectedCase.revenue}
- **Month 24 Churn (Expected Case):** ${r.simulatorReport.expectedCase.churn}
- **Gross Margin:** ${r.cogsReport.margin}

# Risks
- Fatal Risk Warnings: ${r.killerReport.fatalWarnings.join(' | ')}
- Top Failure Vectors:
${r.killerReport.topReasons.map((reason, idx) => `  ${idx + 1}. ${reason}`).join('\n')}

# Advantages
${r.advantages.map(a => `- ${a}`).join('\n')}

# Pain Score
${r.painScore}/10

# Demand Score
${r.demandScore}/10

# Competition Score
${r.competitionScore}/10

# Market Gap Score
${r.marketGapScore}/10

# Monetization Score
${r.monetizationScore}/10

# Solo Founder Score
${r.soloFounderScore}/10

# Founder Fit Score
${r.founderFitScore}/10

# SEO Opportunity Score
${r.seoOpportunityScore}/10

# Trend Score
${r.trendScore}/10

# Acquisition Potential Score
${r.acquisitionPotentialScore}/10

# Opportunity Score
${opportunityScore}/10

# Risk Score
${r.riskScore}/10

# Moat Score
${r.moatScore}/10

# Distribution Score
${r.distributionScore}/10

# Compliance Score
${r.complianceScore}/10

# Unit Economics Score
${r.unitEconomicsScore}/10

# AI Risk Score
${r.aiRiskScore}/10

# Platform Risk Score
${r.platformRiskScore}/10

# Startup Survival Score
${r.survivalScore}/10

# Overall Startup Opportunity Score
${r.overallScore}/100

# Final Verdict
${r.verdict}

# Build Recommendation
${r.buildRec}

# Evidence Sources
${r.evidenceSources || 'Reddit forums, Hacker News'}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement("a");
    const filename = `${r.startupName.toLowerCase().replace(/\s+/g, '_')}_upgraded_report.md`;
    
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },

  // ============================================================
  // RESEARCH DEPTH ENGINE v3.0 — UI RENDERING
  // ============================================================

  // Initialize research view with skeleton structure
  initResearchView(keyword) {
    const kwCap = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    document.getElementById('researchKeywordTitle').innerText = kwCap;
    document.getElementById('researchEcoLabel').innerText = 'Deep market research in progress...';
    document.getElementById('researchCompletenessBadge').innerText = '0%';
    document.getElementById('researchTerminalLog').innerHTML = '';
    document.getElementById('researchProgressPercent').innerText = '0%';
    document.getElementById('viewOpportunitiesBtn').style.display = 'none';
    
    // Clear data areas
    document.getElementById('ecosystemChipsGrid').innerHTML = '';
    document.getElementById('painClustersGrid').innerHTML = '';
    document.getElementById('competitorIntelBody').innerHTML = '';
    document.getElementById('marketGapsList').innerHTML = '';
    document.getElementById('painClusterCount').innerText = '0 clusters';
    document.getElementById('competitorCount').innerText = '0 competitors';
    
    // Init phase cards
    const phases = [
      { icon: 'fa-globe', name: 'Ecosystem Mapper' },
      { icon: 'fa-crosshairs', name: 'Pain Cluster Hunter' },
      { icon: 'fa-comments', name: 'Complaint Collector' },
      { icon: 'fa-binoculars', name: 'Competitor Scanner' },
      { icon: 'fa-star-half-stroke', name: 'Review Analyzer' },
      { icon: 'fa-magnifying-glass-chart', name: 'Gap Discoverer' }
    ];
    
    const phasesGrid = document.getElementById('researchPhasesGrid');
    phasesGrid.innerHTML = '';
    phases.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'research-phase-card';
      card.id = `research-phase-${i}`;
      card.innerHTML = `
        <i class="fa-solid ${p.icon}"></i>
        <span class="phase-name">${p.name}</span>
        <span class="phase-status">PENDING</span>
      `;
      phasesGrid.appendChild(card);
    });
    
    // Init threshold meters
    const thresholdLabels = {
      painClusters: 'Pain Clusters',
      complaints: 'Complaints',
      reviews: 'Reviews',
      competitors: 'Competitors',
      marketGaps: 'Market Gaps',
      userSegments: 'User Segments',
      workflowBottlenecks: 'Bottlenecks',
      featureRequests: 'Feature Requests'
    };
    
    const metersGrid = document.getElementById('thresholdMetersGrid');
    metersGrid.innerHTML = '';
    Object.entries(thresholdLabels).forEach(([key, label]) => {
      const req = ResearchEngine.THRESHOLDS[key] || 5;
      const meter = document.createElement('div');
      meter.className = 'threshold-meter';
      meter.id = `threshold-${key}`;
      meter.innerHTML = `
        <div class="threshold-meter-label">
          <span>${label}</span>
          <span class="count" id="threshold-count-${key}">0/${req}</span>
        </div>
        <div class="threshold-meter-bar">
          <div class="threshold-meter-fill" id="threshold-fill-${key}" style="width: 0%;"></div>
        </div>
      `;
      metersGrid.appendChild(meter);
    });
  },

  // Update a research phase card status
  updateResearchPhase(phase, idx, status) {
    const card = document.getElementById(`research-phase-${idx}`);
    if (!card) return;
    card.className = `research-phase-card ${status}`;
    const statusEl = card.querySelector('.phase-status');
    if (status === 'active') {
      statusEl.innerText = 'PROCESSING...';
    } else if (status === 'completed') {
      statusEl.innerText = '✓ COMPLETE';
    }
  },

  // Update threshold meter progress
  updateResearchThresholds(thresholds) {
    let metCount = 0;
    let totalCount = 0;
    
    Object.entries(thresholds).forEach(([key, data]) => {
      totalCount++;
      const fill = document.getElementById(`threshold-fill-${key}`);
      const count = document.getElementById(`threshold-count-${key}`);
      const meter = document.getElementById(`threshold-${key}`);
      if (!fill || !count || !meter) return;
      
      const pct = Math.min(100, Math.round((data.current / data.required) * 100));
      fill.style.width = `${pct}%`;
      count.innerText = `${data.current}/${data.required}`;
      
      if (data.current >= data.required) {
        meter.classList.add('met');
        metCount++;
      } else {
        meter.classList.remove('met');
      }
    });
    
    // Update completeness badge
    const completeness = Math.round((metCount / totalCount) * 100);
    document.getElementById('researchCompletenessBadge').innerText = `${completeness}%`;
  },

  // Render the full research dashboard with all discovered data
  renderResearchDashboard(result, instant) {
    document.getElementById('researchKeywordTitle').innerText = 
      result.keyword.charAt(0).toUpperCase() + result.keyword.slice(1);
    document.getElementById('researchEcoLabel').innerText = 
      `${result.ecosystemLabel} — Market Size: ${result.marketSize} (${result.marketSizeConfidence})`;
    document.getElementById('researchCompletenessBadge').innerText = 
      `${result.researchCompletenessScore}%`;
    
    // Update thresholds to final values
    this.updateResearchThresholds(result.thresholds);
    
    // Mark all phases complete if instant
    if (instant) {
      for (let i = 0; i < 6; i++) {
        const card = document.getElementById(`research-phase-${i}`);
        if (card) {
          card.className = 'research-phase-card completed';
          const statusEl = card.querySelector('.phase-status');
          if (statusEl) statusEl.innerText = '✓ COMPLETE';
        }
      }
      document.getElementById('researchPhaseHeadline').innerHTML = 
        `<i class="fa-solid fa-circle-check" style="color: var(--success);"></i> Research Complete — ${result.opportunities.length} opportunities generated`;
      document.getElementById('researchProgressPercent').innerText = '100%';
      document.getElementById('viewOpportunitiesBtn').style.display = 'inline-flex';
    }
    
    // Render ecosystem chips
    this._renderEcosystemChips(result.segments);
    
    // Render pain clusters
    this._renderPainClusters(result.painClusters);
    
    // Render competitor table
    this._renderCompetitorIntel(result.competitors);
    
    // Render market gaps
    this._renderMarketGaps(result.marketGaps);
  },

  _renderEcosystemChips(segments) {
    const grid = document.getElementById('ecosystemChipsGrid');
    grid.innerHTML = '';
    segments.forEach((seg, i) => {
      const chip = document.createElement('div');
      chip.className = 'eco-chip';
      chip.style.animationDelay = `${i * 0.05}s`;
      chip.innerHTML = `
        <i class="fa-solid ${seg.icon}"></i>
        ${seg.name}
        <span class="chip-count">${seg.userCount}</span>
      `;
      grid.appendChild(chip);
    });
  },

  _renderPainClusters(clusters) {
    const grid = document.getElementById('painClustersGrid');
    grid.innerHTML = '';
    document.getElementById('painClusterCount').innerText = `${clusters.length} clusters`;
    
    clusters.forEach((cluster, i) => {
      const card = document.createElement('div');
      card.className = 'pain-cluster-card';
      card.innerHTML = `
        <div class="pain-cluster-header">
          <div>
            <div class="pain-cluster-name">${cluster.name}</div>
            <div class="pain-cluster-segment">${cluster.segment}</div>
          </div>
          <span class="pain-cluster-rank">#${i + 1}</span>
        </div>
        <div class="pain-cluster-scores">
          <span class="pain-score-badge freq">Freq: ${cluster.frequency}/10</span>
          <span class="pain-score-badge sev">Sev: ${cluster.severity}/10</span>
          <span class="pain-score-badge val">Value: ${cluster.commercialValue}/10</span>
        </div>
        <div class="pain-cluster-desc">${cluster.description}</div>
      `;
      grid.appendChild(card);
    });
  },

  _renderCompetitorIntel(competitors) {
    const body = document.getElementById('competitorIntelBody');
    body.innerHTML = '';
    document.getElementById('competitorCount').innerText = `${competitors.length} competitors`;
    
    competitors.forEach(comp => {
      const sentimentClass = comp.reviewSentiment.toLowerCase().includes('positive') ? 'positive' :
                              comp.reviewSentiment.toLowerCase().includes('mixed') ? 'mixed' :
                              comp.reviewSentiment.toLowerCase().includes('negative') ? 'negative' : 'neutral';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="comp-name">${comp.url ? `<a href="${comp.url}" target="_blank" style="color:var(--text-main); text-decoration:none;">${comp.name} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.55rem; opacity:0.5;"></i></a>` : comp.name}</td>
        <td><span class="comp-type">${comp.type}</span></td>
        <td class="comp-pricing">${comp.pricing}</td>
        <td>${comp.strengths.slice(0, 2).join(', ')}</td>
        <td>${comp.weaknesses.slice(0, 2).join(', ')}</td>
        <td class="comp-sentiment-${sentimentClass}">${comp.reviewSentiment}</td>
        <td>${comp.reviewCount}</td>
      `;
      body.appendChild(row);
    });
  },

  _renderMarketGaps(gaps) {
    const list = document.getElementById('marketGapsList');
    list.innerHTML = '';
    
    gaps.forEach(gap => {
      const card = document.createElement('div');
      card.className = 'market-gap-card';
      card.innerHTML = `
        <div class="market-gap-title"><i class="fa-solid fa-triangle-exclamation" style="margin-right:6px;"></i> ${gap.title}</div>
        <div class="market-gap-desc">${gap.description}</div>
        <div class="market-gap-evidence"><i class="fa-solid fa-quote-left" style="margin-right:4px;"></i> ${gap.evidence}</div>
      `;
      list.appendChild(card);
    });
  },

  // Render the comparison matrix view
  renderComparisonMatrix(result) {
    this.activeComparisonResult = result;
    this.renderScoringControls(result);
    // Top Picks
    const picksGrid = document.getElementById('topPicksGrid');
    picksGrid.innerHTML = '';
    
    const pickEntries = [
      { key: 'topOverall', label: 'Top Overall', icon: '🏆', css: 'pick-overall' },
      { key: 'topLowRisk', label: 'Top Low-Risk', icon: '🛡️', css: 'pick-lowrisk' },
      { key: 'topSoloFounder', label: 'Top Solo Founder', icon: '👤', css: 'pick-solo' },
      { key: 'topFastest', label: 'Top Fastest', icon: '⚡', css: 'pick-fastest' },
      { key: 'topLongTerm', label: 'Top Long-Term', icon: '📈', css: 'pick-longterm' }
    ];
    
    pickEntries.forEach(pe => {
      const opp = result.topPicks[pe.key];
      if (!opp) return;
      const card = document.createElement('div');
      card.className = `top-pick-card ${pe.css}`;
      card.innerHTML = `
        <div class="top-pick-icon">${pe.icon}</div>
        <div class="top-pick-label">${pe.label}</div>
        <div class="top-pick-name">${opp.startupName}</div>
        <div class="top-pick-score">Composite: ${opp.compositeScore}%</div>
      `;
      picksGrid.appendChild(card);
    });
    
    // Matrix Table
    const body = document.getElementById('comparisonMatrixBody');
    body.innerHTML = '';
    
    result.opportunities.forEach((opp, i) => {
      const row = document.createElement('tr');
      row.style.cursor = 'pointer';
      row.onclick = () => {
        const report = app._convertOpportunityToReport(opp, result);
        ui.renderReport(report);
        app.switchView('library');
      };
      
      const scoreClass = (val, invert) => {
        if (invert) return val <= 3 ? 'score-high' : val <= 6 ? 'score-mid' : 'score-low';
        return val >= 7 ? 'score-high' : val >= 4 ? 'score-mid' : 'score-low';
      };
      
      const compClass = opp.compositeScore >= 70 ? 'comp-high' : opp.compositeScore >= 50 ? 'comp-mid' : 'comp-low';
      
      row.innerHTML = `
        <td><span class="matrix-rank">#${i + 1}</span></td>
        <td><span class="matrix-startup-name">${opp.startupName}</span></td>
        <td><span class="matrix-model">${opp.businessModel}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.painScore)}">${opp.painScore}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.demandScore)}">${opp.demandScore}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.competitionScore, true)}">${opp.competitionScore}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.marketGapScore)}">${opp.marketGapScore}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.moatStrength)}">${opp.moatStrength}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.founderFitScore)}">${opp.founderFitScore}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.aiRisk, true)}">${opp.aiRisk}</span></td>
        <td><span class="matrix-score-cell ${scoreClass(opp.platformRisk, true)}">${opp.platformRisk}</span></td>
        <td><span class="matrix-composite ${compClass}">${opp.compositeScore}%</span></td>
        <td>
          <div style="display:flex; gap:6px; align-items:center;">
            <button class="matrix-dive-btn" onclick="event.stopPropagation();">Deep Dive →</button>
            <button class="idea-delete-btn matrix-delete-btn" title="Reject and never suggest again">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      
      // Wire up deep dive button
      const btn = row.querySelector('.matrix-dive-btn');
      btn.onclick = (e) => {
        e.stopPropagation();
        const report = app._convertOpportunityToReport(opp, result);
        ui.renderReport(report);
        app.switchView('library');
      };
      row.querySelector('.matrix-delete-btn').onclick = (e) => {
        e.stopPropagation();
        if (confirm(`Reject "${opp.startupName}"? It will not be suggested again for "${result.keyword}".`)) {
          app.rejectIdea(opp, result.keyword);
        }
      };
      
      body.appendChild(row);
    });
    
    // Metadata
    document.getElementById('compareDataConfidence').innerText = result.dataConfidenceLevel;
    document.getElementById('compareResearchScore').innerText = `${result.researchCompletenessScore}%`;
    document.getElementById('compareOppCount').innerText = `${result.opportunities.length} opportunities`;
    document.getElementById('comparePainCount').innerText = `${result.painClusters.length} clusters`;
  },

  renderScoringControls(result) {
    const table = document.getElementById('comparisonMatrixTable');
    const host = table && table.parentNode;
    if (!host) return;
    let controls = document.getElementById('scoringControls');
    if (!controls) {
      controls = document.createElement('div');
      controls.id = 'scoringControls';
      controls.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:16px;';
      host.insertBefore(controls, table);
    }
    controls.innerHTML = `
      <span style="font-size:0.75rem;color:var(--text-dim);">SCORING MODE</span>
      <button class="btn" data-mode="balanced">Balanced</button>
      <button class="btn" data-mode="bootstrap">Bootstrap</button>
      <button class="btn" data-mode="venture">Venture Scale</button>
      <button class="btn" data-mode="lowRisk">Low Risk</button>
      <label style="font-size:0.75rem;color:var(--text-dim);">Risk stress
        <input id="riskStressSlider" type="range" min="75" max="200" value="100" style="vertical-align:middle;">
      </label>
    `;
    controls.querySelectorAll('[data-mode]').forEach(button => {
      button.onclick = () => this.applyScoringMode(button.dataset.mode);
    });
    document.getElementById('riskStressSlider').oninput = (event) => {
      this.applyScoringMode(this.activeScoringMode || 'balanced', Number(event.target.value) / 100);
    };
  },

  applyScoringMode(mode, riskStress) {
    const result = this.activeComparisonResult;
    if (!result) return;
    this.activeScoringMode = mode;
    const stress = riskStress || Number(document.getElementById('riskStressSlider').value) / 100;
    const presets = {
      balanced: { pain:.20,demand:.15,gap:.15,monetization:.10,moat:.10,founderFit:.10,competition:.05,distribution:.05,aiRisk:.05,platformRisk:.05 },
      bootstrap: { pain:.20,demand:.10,gap:.15,monetization:.15,moat:.05,founderFit:.20,competition:.03,distribution:.06,aiRisk:.03,platformRisk:.03 },
      venture: { pain:.15,demand:.20,gap:.15,monetization:.10,moat:.20,founderFit:.05,competition:.03,distribution:.04,aiRisk:.04,platformRisk:.04 },
      lowRisk: { pain:.12,demand:.10,gap:.12,monetization:.10,moat:.15,founderFit:.11,competition:.08,distribution:.08,aiRisk:.07,platformRisk:.07 }
    };
    const weights = { ...presets[mode] };
    ['competition', 'distribution', 'aiRisk', 'platformRisk'].forEach(key => weights[key] *= stress);
    result.opportunities.forEach(opp => {
      opp.compositeScore = StartupCore.calculateScore({
        ...opp,
        moatScore: opp.moatStrength,
        aiRiskScore: opp.aiRisk,
        platformRiskScore: opp.platformRisk,
        distributionScore: opp.distributionDifficulty
      }, weights);
    });
    result.opportunities.sort((a, b) => b.compositeScore - a.compositeScore);
    result.topPicks = ResearchEngine._identifyTopPicks(result.opportunities);
    this.renderComparisonMatrix(result);
  },

  // Export full research report as Markdown
  exportResearchMarkdown() {
    const r = app.activeResearchResult;
    if (!r) {
      alert('No research data available. Run a research cycle first.');
      return;
    }
    
    let painClustersMd = '';
    r.painClusters.forEach((c, i) => {
      painClustersMd += `${i+1}. **${c.name}** (Segment: ${c.segment}) — Freq: ${c.frequency}/10, Sev: ${c.severity}/10, Value: ${c.commercialValue}/10\n   ${c.description}\n\n`;
    });
    
    let competitorsMd = '| Name | Type | Pricing | Sentiment | Reviews |\n|------|------|---------|-----------|--------|\n';
    r.competitors.forEach(c => {
      competitorsMd += `| ${c.name} | ${c.type} | ${c.pricing} | ${c.reviewSentiment} | ${c.reviewCount} |\n`;
    });
    
    let gapsMd = '';
    r.marketGaps.forEach((g, i) => {
      gapsMd += `${i+1}. **${g.title}**\n   ${g.description}\n   *Evidence: ${g.evidence}*\n\n`;
    });
    
    let oppMd = '| Rank | Startup | Model | Pain | Demand | Gap | Moat | Composite |\n|------|---------|-------|------|--------|-----|------|-----------|\n';
    r.opportunities.forEach((o, i) => {
      oppMd += `| #${i+1} | ${o.startupName} | ${o.businessModel} | ${o.painScore} | ${o.demandScore} | ${o.marketGapScore} | ${o.moatStrength} | ${o.compositeScore}% |\n`;
    });
    
    let topPicksMd = '';
    if (r.topPicks.topOverall) topPicksMd += `- 🏆 **Top Overall:** ${r.topPicks.topOverall.startupName} (${r.topPicks.topOverall.compositeScore}%)\n`;
    if (r.topPicks.topLowRisk) topPicksMd += `- 🛡️ **Top Low-Risk:** ${r.topPicks.topLowRisk.startupName} (${r.topPicks.topLowRisk.compositeScore}%)\n`;
    if (r.topPicks.topSoloFounder) topPicksMd += `- 👤 **Top Solo Founder:** ${r.topPicks.topSoloFounder.startupName} (${r.topPicks.topSoloFounder.compositeScore}%)\n`;
    if (r.topPicks.topFastest) topPicksMd += `- ⚡ **Top Fastest:** ${r.topPicks.topFastest.startupName} (${r.topPicks.topFastest.compositeScore}%)\n`;
    if (r.topPicks.topLongTerm) topPicksMd += `- 📈 **Top Long-Term:** ${r.topPicks.topLongTerm.startupName} (${r.topPicks.topLongTerm.compositeScore}%)\n`;
    
    const mdContent = `# Research Depth Engine v3.0 — Full Market Report
## ${r.ecosystemLabel}

**Keyword:** ${r.keyword}
**Market Size:** ${r.marketSize} (${r.marketSizeConfidence})
**Research Completeness:** ${r.researchCompletenessScore}%
**Data Confidence:** ${r.dataConfidenceLevel}
**Generated:** ${r.generatedAt}

---

## Ecosystem Segments (${r.segments.length})

${r.segments.map(s => `- **${s.name}** — ${s.userCount} users (${s.confidence})`).join('\n')}

---

## Top 25 Pain Clusters

${painClustersMd}

---

## Competitor Intelligence (${r.competitors.length})

${competitorsMd}

---

## Market Gaps (${r.marketGaps.length})

${gapsMd}

---

## Startup Opportunities (${r.opportunities.length})

${oppMd}

---

## Top Picks

${topPicksMd}

---

## Research Quality

- Pain Clusters: ${r.thresholds.painClusters.current}/${r.thresholds.painClusters.required}
- Complaints: ${r.thresholds.complaints.current}/${r.thresholds.complaints.required}
- Reviews: ${r.thresholds.reviews.current}/${r.thresholds.reviews.required}
- Competitors: ${r.thresholds.competitors.current}/${r.thresholds.competitors.required}
- Market Gaps: ${r.thresholds.marketGaps.current}/${r.thresholds.marketGaps.required}
- User Segments: ${r.thresholds.userSegments.current}/${r.thresholds.userSegments.required}
- Bottlenecks: ${r.thresholds.workflowBottlenecks.current}/${r.thresholds.workflowBottlenecks.required}
- Feature Requests: ${r.thresholds.featureRequests.current}/${r.thresholds.featureRequests.required}

---

*Generated by Startup Intelligence OS v3.0 — Research Depth Engine*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement("a");
    const filename = `${r.keyword.toLowerCase().replace(/\s+/g, '_')}_research_report.md`;
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

window.ui = ui;
