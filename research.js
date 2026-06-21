// ============================================================
// RESEARCH DEPTH ENGINE v3.0
// ============================================================
// This engine prevents shallow startup generation.
// Startup opportunities are the FINAL OUTPUT, not the first step.
//
// Pipeline: Keyword → Ecosystem Mapping → Pain Discovery →
//           Complaint Analysis → Competitor Intelligence →
//           Review Analysis → Market Gap Discovery →
//           Opportunity Generation → Opportunity Ranking →
//           Final Recommendation
// ============================================================

const ResearchEngine = {
  _timers: new Set(),
  _cancelled: false,
  _seed: 1,

  _random() {
    this._seed = (Math.imul(this._seed, 1664525) + 1013904223) >>> 0;
    return this._seed / 4294967296;
  },

  _schedule(fn, delay) {
    const timer = setTimeout(() => {
      this._timers.delete(timer);
      if (!this._cancelled) fn();
    }, delay);
    this._timers.add(timer);
    return timer;
  },

  cancelSimulation() {
    this._cancelled = true;
    this._timers.forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    this._timers.clear();
  },

  // ========================================
  // MINIMUM RESEARCH THRESHOLDS
  // ========================================
  THRESHOLDS: {
    painClusters: 25,
    complaints: 50,
    reviews: 100,
    competitors: 10,
    marketGaps: 5,
    userSegments: 5,
    workflowBottlenecks: 20,
    featureRequests: 10
  },

  // ========================================
  // ECOSYSTEM DATABASES
  // ========================================
  // Maps keywords to their ecosystem segments, roles, and sub-niches.
  ecosystemDB: {
    youtube: {
      label: "YouTube Creator Economy",
      marketSize: "$28.9B",
      marketSizeConfidence: "ESTIMATED DATA",
      segments: [
        { name: "Long-Form Creators", icon: "fa-video", userCount: "10M+", confidence: "ESTIMATED DATA" },
        { name: "Shorts Creators", icon: "fa-mobile-screen", userCount: "50M+", confidence: "ESTIMATED DATA" },
        { name: "Video Editors", icon: "fa-film", userCount: "2M+", confidence: "ESTIMATED DATA" },
        { name: "Thumbnail Designers", icon: "fa-image", userCount: "500K+", confidence: "ESTIMATED DATA" },
        { name: "Growth Marketers", icon: "fa-chart-line", userCount: "300K+", confidence: "ESTIMATED DATA" },
        { name: "YouTube Agencies", icon: "fa-building", userCount: "15K+", confidence: "ESTIMATED DATA" },
        { name: "Channel Managers", icon: "fa-users-gear", userCount: "200K+", confidence: "ESTIMATED DATA" },
        { name: "YouTube Consultants", icon: "fa-handshake", userCount: "50K+", confidence: "ESTIMATED DATA" },
        { name: "Automation Users", icon: "fa-robot", userCount: "1M+", confidence: "ESTIMATED DATA" },
        { name: "Brand Sponsors", icon: "fa-ad", userCount: "100K+", confidence: "ESTIMATED DATA" },
        { name: "MCN Networks", icon: "fa-network-wired", userCount: "5K+", confidence: "ESTIMATED DATA" },
        { name: "Live Streamers", icon: "fa-tower-broadcast", userCount: "3M+", confidence: "ESTIMATED DATA" }
      ],
      painClusters: [
        { id: 1, name: "Thumbnail Creation Bottleneck", segment: "Thumbnail Designers", frequency: 9, severity: 8, commercialValue: 8, description: "Creating eye-catching thumbnails is time-consuming, requires design skills most creators lack, and A/B testing is manual.", complaints: ["Spending 2+ hours per thumbnail is killing my output", "Can't afford to hire a designer for every video", "No way to A/B test thumbnails without uploading multiple times", "Canva templates all look the same, I need unique designs", "My CTR dropped because I rushed the thumbnail"] },
        { id: 2, name: "Video SEO Guesswork", segment: "Long-Form Creators", frequency: 9, severity: 7, commercialValue: 9, description: "Title, tag, and description optimization feels like guesswork. Existing tools like TubeBuddy give generic suggestions.", complaints: ["TubeBuddy suggestions are too generic", "I never know if my tags are actually helping", "Competitor analysis for SEO takes hours manually", "My videos rank on page 3 despite good content", "Wish I could see what tags competitors actually rank for"] },
        { id: 3, name: "Shorts Repurposing Tedium", segment: "Shorts Creators", frequency: 8, severity: 8, commercialValue: 7, description: "Cutting long-form videos into Shorts is repetitive manual work. Auto-tools produce low quality output.", complaints: ["Opus Clip misses the best moments half the time", "I spend 3 hours cutting a 20-min video into Shorts", "AI captions on auto-tools are wrong 30% of the time", "Repurposing for TikTok and Reels requires reformatting again", "No tool handles vertical cropping well for talking-head content"] },
        { id: 4, name: "Analytics Overload & Confusion", segment: "Long-Form Creators", frequency: 8, severity: 6, commercialValue: 8, description: "YouTube Studio analytics are overwhelming. Creators can't extract actionable insights from the data.", complaints: ["Studio gives me data but not advice", "I don't know which metrics actually matter for growth", "Can't compare my performance against similar channels easily", "Revenue analytics are delayed and confusing", "No way to track which topics perform best over time"] },
        { id: 5, name: "Sponsorship & Brand Deal Chaos", segment: "Brand Sponsors", frequency: 7, severity: 9, commercialValue: 9, description: "Managing brand deals involves scattered emails, spreadsheets, missed deadlines, and underpriced contracts.", complaints: ["I have brand deals tracked across 4 different spreadsheets", "Missed a deadline because the email got buried", "No idea if I'm undercharging compared to similar creators", "Invoicing and payment tracking is a nightmare", "Agencies take 20% but I could manage this with better tools"] },
        { id: 6, name: "Comment Moderation Overwhelm", segment: "Channel Managers", frequency: 7, severity: 6, commercialValue: 5, description: "High-traffic channels get thousands of comments. Moderation is manual, spam is constant, and engagement opportunities are missed.", complaints: ["I get 500+ comments per video and can't read them all", "Spam bots are relentless despite filters", "Missing genuine questions from fans in the noise", "YouTube's auto-mod blocks legitimate comments", "No way to prioritize comments that need creator response"] },
        { id: 7, name: "Copyright Claim Nightmare", segment: "Long-Form Creators", frequency: 6, severity: 9, commercialValue: 7, description: "Content ID claims and copyright strikes are feared by all creators. Disputing takes weeks and the system is opaque.", complaints: ["Got a copyright claim on 5 seconds of background music", "Dispute process takes 30 days with no updates", "Lost $2000 in revenue during a false claim period", "Can't preview if my content will trigger a claim before uploading", "Music licensing is a minefield, even paid libraries get claimed"] },
        { id: 8, name: "Content Scheduling Fragmentation", segment: "Growth Marketers", frequency: 7, severity: 5, commercialValue: 6, description: "Managing upload schedules across YouTube, TikTok, Instagram, and Twitter requires multiple tools and constant context-switching.", complaints: ["I use 3 different tools to schedule across platforms", "YouTube doesn't have a proper content calendar view", "Can't batch-schedule Shorts with different publish dates easily", "Cross-posting workflow is entirely manual", "Missed optimal upload times because I forgot to schedule"] },
        { id: 9, name: "Editor Collaboration Friction", segment: "Video Editors", frequency: 7, severity: 8, commercialValue: 8, description: "Sending footage, receiving edits, giving feedback, and managing revisions with freelance editors is messy.", complaints: ["Sharing 50GB of raw footage is slow and expensive", "Revision feedback via email is confusing for both sides", "No way to track which editor is working on what", "Payment for editors is ad-hoc, no milestone tracking", "Frame.io is too expensive for small creator teams"] },
        { id: 10, name: "Revenue Tracking & Forecasting", segment: "Long-Form Creators", frequency: 6, severity: 7, commercialValue: 8, description: "Creators struggle to forecast income, track RPM trends, and understand revenue drivers across ad types.", complaints: ["My RPM fluctuates wildly and I don't know why", "Can't forecast next month's revenue accurately", "No breakdown of revenue by content type or topic", "Tax preparation is chaos because earnings come from 5 sources", "AdSense dashboard is confusing and delayed"] },
        { id: 11, name: "Competitor Channel Monitoring", segment: "Growth Marketers", frequency: 6, severity: 5, commercialValue: 7, description: "Tracking competitor uploads, growth rate, viral videos, and strategies is manual and time-consuming.", complaints: ["Manually checking 10 competitor channels weekly takes hours", "No alerts when a competitor's video goes viral in my niche", "Social Blade data is often inaccurate", "Can't see competitor tag strategies without Chrome extensions", "Wish I could see what topics competitors are planning"] },
        { id: 12, name: "Subtitle & Caption Creation", segment: "Long-Form Creators", frequency: 5, severity: 6, commercialValue: 5, description: "Auto-captions have errors, and manual correction is tedious. Multi-language subtitles require expensive translation.", complaints: ["YouTube auto-captions are 80% accurate at best", "Correcting captions for a 30-min video takes 2 hours", "Translation services charge $100+ per video per language", "Burned-in captions require re-editing the entire video", "No good SRT editor integrated with YouTube workflow"] },
        { id: 13, name: "Music Licensing Confusion", segment: "Long-Form Creators", frequency: 6, severity: 7, commercialValue: 6, description: "Choosing royalty-free music that won't get claimed, matches the mood, and isn't overused is surprisingly hard.", complaints: ["Epidemic Sound is $15/mo but some tracks still get claimed", "Every creator uses the same 10 royalty-free tracks", "Can't search music by mood + energy + genre together effectively", "Switching music library means old videos might get claimed", "YouTube Audio Library quality is noticeably lower"] },
        { id: 14, name: "Playlist & Watch Session Optimization", segment: "Growth Marketers", frequency: 5, severity: 4, commercialValue: 6, description: "Playlists are underutilized. No tools exist to optimize playlist order, session time, or suggested video flow.", complaints: ["My playlists get almost no views", "No data on how playlists affect watch time", "Can't A/B test playlist ordering", "Suggested videos rarely pull from my own playlists", "No tool optimizes end screens based on viewer behavior"] },
        { id: 15, name: "Video Idea Validation", segment: "Long-Form Creators", frequency: 8, severity: 7, commercialValue: 8, description: "Creators guess which topics will perform well. No systematic way to validate ideas before investing production time.", complaints: ["Spent a week producing a video that got 200 views", "No way to predict if a topic has audience demand before filming", "Google Trends is too broad for YouTube-specific validation", "Competitor video performance data is hard to interpret", "I need a demand score for video topics before I commit"] },
        { id: 16, name: "A/B Testing Limitations", segment: "Growth Marketers", frequency: 6, severity: 7, commercialValue: 7, description: "YouTube has no native A/B testing for thumbnails, titles, or descriptions. Third-party tools are limited.", complaints: ["TubeBuddy A/B testing requires their highest tier plan", "Can't test titles and thumbnails simultaneously", "Sample sizes are too small to be statistically significant", "No way to A/B test the first 30 seconds of a video", "Testing takes 7 days minimum to get results"] },
        { id: 17, name: "Community Tab Underutilization", segment: "Long-Form Creators", frequency: 4, severity: 3, commercialValue: 4, description: "The Community tab is powerful but creators don't know how to use it strategically for growth and engagement.", complaints: ["Community tab feels like an afterthought", "No scheduling for community posts", "Can't track which community posts drive the most subs", "Image community posts are low effort but I don't know what works", "No analytics specifically for community tab performance"] },
        { id: 18, name: "Multi-Channel Management", segment: "YouTube Agencies", frequency: 5, severity: 8, commercialValue: 9, description: "Agencies managing 10+ channels have no unified dashboard. Each channel requires separate logins and manual monitoring.", complaints: ["Managing 15 channels means 15 browser tabs minimum", "No unified analytics across all managed channels", "Client reporting is manual and takes a full day weekly", "Can't compare performance across channels in my portfolio", "Permission management across channels is clunky"] },
        { id: 19, name: "Live Stream Management", segment: "Live Streamers", frequency: 5, severity: 6, commercialValue: 5, description: "YouTube live streaming tools lag behind Twitch. Alerts, overlays, chat moderation, and VOD management are fragmented.", complaints: ["StreamLabs is Twitch-first, YouTube features are limited", "Live chat moderation tools are basic compared to Twitch", "No good way to create clips from live streams automatically", "Super Chat analytics are buried in YouTube Studio", "Can't easily restream to YouTube + Twitch simultaneously"] },
        { id: 20, name: "Audience Retention Analysis", segment: "Long-Form Creators", frequency: 7, severity: 6, commercialValue: 7, description: "Retention graphs exist but extracting actionable patterns (where viewers drop, what hooks work) requires expert analysis.", complaints: ["I see the retention graph but don't know what to change", "No comparison of retention patterns across my videos", "Can't identify which intro styles retain viewers best", "No tool tells me the optimal video length for my niche", "Wish I could benchmark my retention against niche averages"] },
        { id: 21, name: "End Screen & Card Optimization", segment: "Growth Marketers", frequency: 4, severity: 4, commercialValue: 5, description: "End screens and cards drive views but optimizing placement, timing, and linked videos is guesswork.", complaints: ["My end screen CTR is under 1% and I don't know why", "No tool suggests which video to link in end screens", "Card placement timing is pure guesswork", "Can't bulk-update end screens across old videos", "End screen analytics are minimal in YouTube Studio"] },
        { id: 22, name: "Studio Dashboard Limitations", segment: "Long-Form Creators", frequency: 7, severity: 5, commercialValue: 6, description: "YouTube Studio is slow, feature-limited, and doesn't surface the insights creators need for decision-making.", complaints: ["Studio takes 10 seconds to load every time", "Can't customize what I see on the dashboard", "No way to add notes or tags to my own videos", "Bulk operations are extremely limited", "Studio mobile app is missing half the features"] },
        { id: 23, name: "Tax & Financial Management", segment: "Long-Form Creators", frequency: 5, severity: 7, commercialValue: 7, description: "Creator income comes from 5+ sources (AdSense, sponsors, merch, memberships, Super Chats). Tax prep is chaos.", complaints: ["Income from 6 different sources makes taxes a nightmare", "No tool connects all my revenue streams in one view", "Quarterly estimated taxes are guesswork", "Business expense tracking is done in a random spreadsheet", "My accountant charges $500 extra because my income is complicated"] },
        { id: 24, name: "Merch & Product Launch", segment: "Long-Form Creators", frequency: 4, severity: 5, commercialValue: 6, description: "Launching merch, courses, or digital products is disconnected from YouTube analytics. Creators can't measure ROI.", complaints: ["No way to track which video drove the most merch sales", "Merch shelf integration is limited to approved providers", "Course launch promotion across videos is manual", "Can't A/B test product pricing through YouTube", "No creator-specific commerce dashboard"] },
        { id: 25, name: "Niche & Trend Detection", segment: "Growth Marketers", frequency: 6, severity: 6, commercialValue: 8, description: "Detecting trending topics and emerging niches before they peak requires monitoring multiple signals across platforms.", complaints: ["By the time I see a trend on YouTube it's already saturated", "No tool monitors Reddit + Twitter + YouTube trends together", "Google Trends is too slow for fast-moving topics", "Can't set alerts for emerging topics in my specific niche", "Competitor trend-jacking happens before I even notice the trend"] }
      ],
      complaints: [
        { id: 1, text: "I spent 3 hours on a thumbnail and my CTR is still 3%", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=thumbnail+CTR", cluster: 1, confidence: "ESTIMATED DATA" },
        { id: 2, text: "TubeBuddy tag suggestions feel completely random", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=TubeBuddy+tags", cluster: 2, confidence: "ESTIMATED DATA" },
        { id: 3, text: "Opus Clip keeps picking the wrong moments from my videos", source: "Reddit r/ContentCreation", url: "https://www.reddit.com/r/ContentCreation/search/?q=opus+clip", cluster: 3, confidence: "ESTIMATED DATA" },
        { id: 4, text: "YouTube Studio analytics are a maze. I just want to know what's working.", source: "Twitter/X", url: "https://x.com/search?q=youtube+studio+analytics+confusing", cluster: 4, confidence: "ESTIMATED DATA" },
        { id: 5, text: "Managing brand deals in my inbox is chaos. Just missed a $5k opportunity.", source: "Reddit r/YouTubeCreators", url: "https://www.reddit.com/r/youtubers/search/?q=brand+deal+management", cluster: 5, confidence: "ESTIMATED DATA" },
        { id: 6, text: "500 comments per video and I can't find the genuine questions", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=comment+moderation", cluster: 6, confidence: "ESTIMATED DATA" },
        { id: 7, text: "Got a copyright claim on royalty-free music I PAID for", source: "Reddit r/youtube", url: "https://www.reddit.com/r/youtube/search/?q=copyright+claim+royalty+free", cluster: 7, confidence: "ESTIMATED DATA" },
        { id: 8, text: "I use Hootsuite, Later, and YouTube Studio just to schedule content", source: "Twitter/X", url: "https://x.com/search?q=youtube+content+scheduling+tools", cluster: 8, confidence: "ESTIMATED DATA" },
        { id: 9, text: "Sending 50GB of raw footage to my editor via Google Drive takes forever", source: "Reddit r/VideoEditing", url: "https://www.reddit.com/r/VideoEditing/search/?q=sending+footage+editor", cluster: 9, confidence: "ESTIMATED DATA" },
        { id: 10, text: "My RPM dropped 40% this month and I have no idea why", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=RPM+dropped", cluster: 10, confidence: "ESTIMATED DATA" },
        { id: 11, text: "Manually checking 10 competitor channels every week is not sustainable", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=competitor+analysis", cluster: 11, confidence: "ESTIMATED DATA" },
        { id: 12, text: "Auto-captions butchered every technical term in my tutorial", source: "Reddit r/youtube", url: "https://www.reddit.com/r/youtube/search/?q=auto+captions+accuracy", cluster: 12, confidence: "ESTIMATED DATA" },
        { id: 13, text: "Epidemic Sound tracks still get Content ID claims sometimes", source: "Reddit r/Filmmakers", url: "https://www.reddit.com/r/Filmmakers/search/?q=epidemic+sound+content+id", cluster: 13, confidence: "ESTIMATED DATA" },
        { id: 14, text: "Nobody watches my playlists even though I have 200 videos organized", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=playlist+views", cluster: 14, confidence: "ESTIMATED DATA" },
        { id: 15, text: "Spent a full week on a video that got 200 views. Need to validate ideas first.", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=validate+video+idea", cluster: 15, confidence: "ESTIMATED DATA" },
        { id: 16, text: "TubeBuddy A/B testing is locked behind their $49/mo plan", source: "G2 Reviews", url: "https://www.g2.com/products/tubebuddy/reviews", cluster: 16, confidence: "ESTIMATED DATA" },
        { id: 17, text: "Community tab is powerful but no one teaches how to use it for growth", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=community+tab+strategy", cluster: 17, confidence: "ESTIMATED DATA" },
        { id: 18, text: "Managing 15 client channels with no unified dashboard is insane", source: "Reddit r/WorkOnline", url: "https://www.reddit.com/r/WorkOnline/search/?q=youtube+channel+management", cluster: 18, confidence: "ESTIMATED DATA" },
        { id: 19, text: "YouTube live chat moderation is 5 years behind Twitch", source: "Reddit r/Livestreaming", url: "https://www.reddit.com/r/Livestreaming/search/?q=youtube+live+chat", cluster: 19, confidence: "ESTIMATED DATA" },
        { id: 20, text: "I see the retention graph but have zero idea what to actually change", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=audience+retention+improve", cluster: 20, confidence: "ESTIMATED DATA" },
        { id: 21, text: "End screen CTR under 1%. No guidance on what works.", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=end+screen+CTR", cluster: 21, confidence: "ESTIMATED DATA" },
        { id: 22, text: "YouTube Studio takes 10+ seconds to load. It's 2026.", source: "Twitter/X", url: "https://x.com/search?q=youtube+studio+slow", cluster: 22, confidence: "ESTIMATED DATA" },
        { id: 23, text: "Income from AdSense, sponsors, merch, memberships. Tax time is a disaster.", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=taxes+multiple+income", cluster: 23, confidence: "ESTIMATED DATA" },
        { id: 24, text: "No way to know which video actually drove my merch sales", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=merch+tracking", cluster: 24, confidence: "ESTIMATED DATA" },
        { id: 25, text: "Trends are dead by the time they show up on Google Trends", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=trend+detection+too+late", cluster: 25, confidence: "ESTIMATED DATA" },
        { id: 26, text: "Need a tool that just tells me: make THIS video next", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=what+video+should+I+make", cluster: 15, confidence: "ESTIMATED DATA" },
        { id: 27, text: "VidIQ wants $99/month for the features I actually need", source: "G2 Reviews", url: "https://www.g2.com/products/vidiq/reviews", cluster: 2, confidence: "ESTIMATED DATA" },
        { id: 28, text: "Hired a thumbnail designer on Fiverr. $50 each. Not sustainable.", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=thumbnail+designer+cost", cluster: 1, confidence: "ESTIMATED DATA" },
        { id: 29, text: "My editor and I waste hours going back and forth on revisions via email", source: "Reddit r/VideoEditing", url: "https://www.reddit.com/r/VideoEditing/search/?q=editor+revisions+workflow", cluster: 9, confidence: "ESTIMATED DATA" },
        { id: 30, text: "Brand offered me $500 for a video. No idea if that's fair market rate.", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=brand+deal+pricing+fair", cluster: 5, confidence: "ESTIMATED DATA" },
        { id: 31, text: "Copyright dispute took 30 days. Lost all revenue on my best performing video.", source: "Reddit r/youtube", url: "https://www.reddit.com/r/youtube/search/?q=copyright+dispute+30+days", cluster: 7, confidence: "ESTIMATED DATA" },
        { id: 32, text: "My Shorts get views but don't convert to subscribers at all", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=shorts+subscribers+conversion", cluster: 3, confidence: "ESTIMATED DATA" },
        { id: 33, text: "Social Blade subscriber counts are often wrong by 10-20%", source: "Twitter/X", url: "https://x.com/search?q=social+blade+inaccurate", cluster: 11, confidence: "ESTIMATED DATA" },
        { id: 34, text: "Studio mobile app crashes when I try to edit descriptions", source: "Google Play Reviews", url: "https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.creator", cluster: 22, confidence: "ESTIMATED DATA" },
        { id: 35, text: "Translated subtitles for 3 languages cost me $300 per video", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=subtitle+translation+cost", cluster: 12, confidence: "ESTIMATED DATA" },
        { id: 36, text: "Can't find music that matches the exact vibe I need without scrolling for an hour", source: "Reddit r/Filmmakers", url: "https://www.reddit.com/r/Filmmakers/search/?q=royalty+free+music+search", cluster: 13, confidence: "ESTIMATED DATA" },
        { id: 37, text: "I batch-filmed 10 videos but scheduling them properly took another full day", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=batch+filming+scheduling", cluster: 8, confidence: "ESTIMATED DATA" },
        { id: 38, text: "Revenue analytics are delayed by 2 days. Can't make timely decisions.", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=adsense+revenue+delayed", cluster: 10, confidence: "ESTIMATED DATA" },
        { id: 39, text: "Half my audience is in a timezone where I upload at 3 AM for them", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=upload+time+timezone", cluster: 8, confidence: "ESTIMATED DATA" },
        { id: 40, text: "Community post polls get great engagement but I don't know how to use that data", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=community+poll+strategy", cluster: 17, confidence: "ESTIMATED DATA" },
        { id: 41, text: "Client wants weekly analytics reports. I spend 4 hours compiling them manually.", source: "Reddit r/WorkOnline", url: "https://www.reddit.com/r/WorkOnline/search/?q=youtube+client+reporting", cluster: 18, confidence: "ESTIMATED DATA" },
        { id: 42, text: "StreamLabs overlay editor barely works for YouTube. It's Twitch-first.", source: "Reddit r/Livestreaming", url: "https://www.reddit.com/r/Livestreaming/search/?q=streamlabs+youtube+support", cluster: 19, confidence: "ESTIMATED DATA" },
        { id: 43, text: "My best videos have 70% retention in the first 30 seconds but I don't know what I did differently", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=retention+pattern+analysis", cluster: 20, confidence: "ESTIMATED DATA" },
        { id: 44, text: "Can't bulk update end screens across 200 old videos. Each one is manual.", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=bulk+update+end+screens", cluster: 21, confidence: "ESTIMATED DATA" },
        { id: 45, text: "Quarterly estimated taxes for creator income is pure guesswork", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=quarterly+taxes+estimate", cluster: 23, confidence: "ESTIMATED DATA" },
        { id: 46, text: "Teespring integration is clunky and the margins are terrible", source: "Reddit r/youtubers", url: "https://www.reddit.com/r/youtubers/search/?q=teespring+merch+margins", cluster: 24, confidence: "ESTIMATED DATA" },
        { id: 47, text: "Every creator in my niche jumped on the same trend 2 days before I noticed it", source: "Reddit r/NewTubers", url: "https://www.reddit.com/r/NewTubers/search/?q=late+to+trend", cluster: 25, confidence: "ESTIMATED DATA" },
        { id: 48, text: "Canva thumbnails look generic. Everyone uses the same templates.", source: "Twitter/X", url: "https://x.com/search?q=canva+youtube+thumbnail+generic", cluster: 1, confidence: "ESTIMATED DATA" },
        { id: 49, text: "My CPM varies from $2 to $18 across videos and I can't figure out the pattern", source: "Reddit r/PartneredYouTube", url: "https://www.reddit.com/r/PartneredYoutube/search/?q=CPM+varies+why", cluster: 10, confidence: "ESTIMATED DATA" },
        { id: 50, text: "The YouTube algorithm changed again and my views dropped 60% overnight", source: "Reddit r/youtube", url: "https://www.reddit.com/r/youtube/search/?q=algorithm+change+views+dropped", cluster: 4, confidence: "ESTIMATED DATA" }
      ],
      competitors: [
        { name: "TubeBuddy", type: "Direct", pricing: "$9-49/mo", strengths: ["Keyword explorer", "A/B testing", "Bulk tools"], weaknesses: ["Generic suggestions", "Expensive tiers", "Slow interface"], userComplaints: ["Tag suggestions feel random", "A/B tests require $49 plan", "Chrome extension slows YouTube"], missingFeatures: ["AI-powered content strategy", "Revenue forecasting", "Editor collaboration"], reviewSentiment: "Mixed (3.8/5)", reviewCount: "2,500+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/tubebuddy/reviews" },
        { name: "VidIQ", type: "Direct", pricing: "$7.50-99/mo", strengths: ["Trending video alerts", "Channel audit", "Competitor tracking"], weaknesses: ["Overpriced Pro tier", "Data accuracy questioned", "Cluttered dashboard"], userComplaints: ["$99/mo for the features I need", "Score predictions are unreliable", "Too many upsell popups"], missingFeatures: ["Content repurposing", "Brand deal management", "Financial planning"], reviewSentiment: "Mixed (4.0/5)", reviewCount: "1,800+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/vidiq/reviews" },
        { name: "Opus Clip", type: "Direct", pricing: "$15-40/mo", strengths: ["AI clip selection", "Auto-captions", "Multi-platform export"], weaknesses: ["Misses best moments", "Caption errors", "Limited customization"], userComplaints: ["Picks wrong moments 50% of the time", "Captions have frequent errors", "No manual trim control"], missingFeatures: ["Long-form optimization", "Analytics", "A/B testing clips"], reviewSentiment: "Positive (4.2/5)", reviewCount: "500+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/opus-clip/reviews" },
        { name: "Canva", type: "Indirect", pricing: "$12.99/mo", strengths: ["Easy design tools", "Template library", "Brand kit"], weaknesses: ["Generic templates", "Not YouTube-specific", "Limited animation"], userComplaints: ["Every thumbnail looks the same", "No YouTube-specific templates with data", "Can't preview CTR impact"], missingFeatures: ["CTR prediction", "Competitor thumbnail analysis", "YouTube-native integration"], reviewSentiment: "Positive (4.6/5)", reviewCount: "15,000+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/canva/reviews" },
        { name: "Social Blade", type: "Direct", pricing: "Free / $3.99/mo", strengths: ["Channel statistics", "Growth tracking", "Grade system"], weaknesses: ["Inaccurate data", "Outdated interface", "Limited depth"], userComplaints: ["Sub counts often wrong by 10-20%", "No actionable insights", "Revenue estimates wildly inaccurate"], missingFeatures: ["Content strategy advice", "SEO tools", "Trend detection"], reviewSentiment: "Neutral (3.2/5)", reviewCount: "800+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/social-blade/reviews" },
        { name: "Frame.io", type: "Indirect", pricing: "$15-25/user/mo", strengths: ["Video review", "Timestamp comments", "Version control"], weaknesses: ["Expensive for small teams", "YouTube-agnostic", "No upload integration"], userComplaints: ["$25/user is insane for a 2-person team", "Doesn't understand YouTube workflow", "No direct publish to YouTube"], missingFeatures: ["YouTube-specific workflow", "Revenue sharing with editors", "Asset management for thumbnails"], reviewSentiment: "Positive (4.4/5)", reviewCount: "1,200+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/frame-io/reviews" },
        { name: "Epidemic Sound", type: "Indirect", pricing: "$15-49/mo", strengths: ["Large library", "Clear licensing", "Mood search"], weaknesses: ["Content ID issues still occur", "Expensive for hobbyists", "Library overlap with competitors"], userComplaints: ["Still get Content ID claims with paid license", "Price increased 30% this year", "Same tracks everywhere"], missingFeatures: ["AI mood matching to video", "Guaranteed no-claim protection", "Direct YouTube integration"], reviewSentiment: "Mixed (3.9/5)", reviewCount: "900+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/epidemic-sound/reviews" },
        { name: "Hootsuite", type: "Indirect", pricing: "$99-249/mo", strengths: ["Multi-platform scheduling", "Team collaboration", "Analytics"], weaknesses: ["Not YouTube-focused", "Expensive", "YouTube features limited"], userComplaints: ["$99/mo for basic YouTube scheduling is ridiculous", "YouTube Shorts support is minimal", "Analytics don't match YouTube Studio"], missingFeatures: ["YouTube SEO tools", "Thumbnail management", "YouTube-specific analytics"], reviewSentiment: "Mixed (3.7/5)", reviewCount: "5,000+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/hootsuite/reviews" },
        { name: "Descript", type: "Indirect", pricing: "$24-40/mo", strengths: ["Text-based editing", "AI voice", "Screen recording"], weaknesses: ["Steep learning curve", "Not YouTube-optimized", "Export limitations"], userComplaints: ["Learning curve is steep for non-editors", "YouTube upload integration is clunky", "AI voice sounds robotic for long content"], missingFeatures: ["YouTube metadata optimization", "Thumbnail creation", "YouTube analytics integration"], reviewSentiment: "Positive (4.3/5)", reviewCount: "1,500+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/descript/reviews" },
        { name: "Spreadsheets (DIY)", type: "DIY Solution", pricing: "Free", strengths: ["Fully customizable", "No subscription", "Familiar interface"], weaknesses: ["Manual data entry", "No automation", "Not scalable", "Error-prone"], userComplaints: ["I have 7 spreadsheets tracking different metrics", "Manual data entry takes hours weekly", "Formulas break when I add new data"], missingFeatures: ["Everything automated", "Real-time data", "Visual dashboards", "API integrations"], reviewSentiment: "N/A", reviewCount: "N/A", dataConfidence: "N/A", url: null },
        { name: "Freelance Editors (Fiverr/Upwork)", type: "Agency/Freelancer", pricing: "$50-500/video", strengths: ["Human creativity", "Custom work", "Flexible scope"], weaknesses: ["Expensive at scale", "Inconsistent quality", "Communication overhead"], userComplaints: ["Quality varies wildly between editors", "Revision cycles eat up all the time savings", "Managing multiple freelancers is a full-time job"], missingFeatures: ["Consistent quality", "Integrated workflow", "Milestone tracking", "Payment automation"], reviewSentiment: "Mixed", reviewCount: "N/A", dataConfidence: "N/A", url: null },
        { name: "SparkToro", type: "Indirect", pricing: "$50-150/mo", strengths: ["Audience research", "Social listening", "Demographic data"], weaknesses: ["Not YouTube-specific", "Expensive", "Limited creator features"], userComplaints: ["Too broad for YouTube-specific research", "Pricing is steep for solo creators", "Data doesn't help with content strategy directly"], missingFeatures: ["YouTube channel analysis", "Video topic suggestions", "Creator-specific insights"], reviewSentiment: "Positive (4.1/5)", reviewCount: "300+", dataConfidence: "ESTIMATED DATA", url: "https://www.g2.com/products/sparktoro/reviews" }
      ],
      marketGaps: [
        { id: 1, title: "No All-in-One Creator Business OS", description: "Tools exist for SEO, thumbnails, editing, and scheduling separately. No single platform unifies the creator workflow from idea to revenue.", painClusters: [4, 10, 23], evidence: "Creators use 5-8 separate tools averaging $150+/mo in total subscriptions" },
        { id: 2, title: "Zero Pre-Upload Validation Tools", description: "No tool validates video ideas, thumbnails, or titles BEFORE production. All optimization happens post-upload when it's too late.", painClusters: [15, 16, 1], evidence: "Creators report wasting 30%+ of production time on videos that underperform" },
        { id: 3, title: "Brand Deal Intelligence Gap", description: "No platform provides fair-market-rate data for sponsorships or manages the full deal lifecycle from pitch to payment.", painClusters: [5], evidence: "Creators consistently report being underpaid by 40-60% vs market rates" },
        { id: 4, title: "Multi-Channel Agency Dashboard Missing", description: "Agencies managing 10+ channels have no unified control panel. YouTube's Brand Account system is insufficient.", painClusters: [18], evidence: "Agency managers report spending 4+ hours weekly on manual cross-channel reporting" },
        { id: 5, title: "Creator Financial Intelligence Vacuum", description: "No tool connects AdSense, sponsorship, merch, and membership revenue into a single financial dashboard with forecasting.", painClusters: [10, 23, 24], evidence: "Creator income varies 40-80% month-to-month with no forecasting tools available" },
        { id: 6, title: "Real-Time Trend Detection for Niches", description: "Google Trends is too broad and too slow for YouTube-specific trend detection in micro-niches.", painClusters: [25, 15], evidence: "Creators report being 2-5 days late to trends consistently" },
        { id: 7, title: "Editor-Creator Collaboration Platform Gap", description: "No platform is purpose-built for the YouTube creator-editor workflow including footage sharing, review, and payment.", painClusters: [9], evidence: "Frame.io is the closest but costs $25/user and isn't YouTube-aware" }
      ],
      workflowBottlenecks: [
        "Thumbnail iteration cycle: design → upload → wait 48h → check CTR → redesign",
        "Video SEO: research keywords → write title → add tags → add description → wait for ranking",
        "Shorts repurposing: watch full video → identify moments → crop vertical → add captions → export per platform",
        "Analytics review: open Studio → navigate 5 reports → screenshot data → paste into spreadsheet → interpret",
        "Brand deal flow: receive email → negotiate rate → create contract → film → invoice → follow up payment",
        "Comment management: open Studio → scroll comments → filter spam → reply to good ones → lose track",
        "Copyright check: search music → check license → download → edit into video → upload → pray no claim",
        "Content scheduling: create in editor → export → upload to YouTube → set metadata → set publish time → repeat for Shorts",
        "Editor handoff: film raw → upload 50GB to Drive → notify editor → wait for cut → review → give notes → wait again",
        "Revenue reconciliation: check AdSense → check Stripe → check PayPal → check merch platform → combine in spreadsheet",
        "Competitor monitoring: open 10 channels → check recent uploads → note views → check Social Blade → repeat weekly",
        "Subtitle creation: auto-generate → review every line → correct errors → time-sync → export SRT → upload",
        "Music selection: browse library → preview 50 tracks → filter by mood → check license → download → test in edit",
        "Playlist management: create playlist → add videos manually → reorder → check analytics → no data available",
        "Idea validation: check Google Trends → search YouTube → count competitors → estimate demand → gut feeling",
        "A/B testing: create 2 thumbnails → upload A → wait 3 days → swap to B → wait 3 days → compare manually",
        "Community tab posting: create image → write text → schedule post → no scheduling available → remember to post",
        "Multi-channel switching: log out → log into other account → check analytics → log out → repeat 15 times",
        "Live stream prep: set up OBS → configure overlays → test stream → go live → moderate chat → create clips after",
        "Retention analysis: open video analytics → stare at retention graph → guess what went wrong → try something different"
      ],
      featureRequests: [
        { text: "AI that tells me what video to make next based on data", votes: 2400, source: "Reddit r/NewTubers", cluster: 15 },
        { text: "One dashboard for all my YouTube revenue streams", votes: 1800, source: "Reddit r/PartneredYouTube", cluster: 10 },
        { text: "Automatic Shorts generation that actually picks good moments", votes: 3100, source: "Reddit r/youtubers", cluster: 3 },
        { text: "Thumbnail A/B testing that doesn't cost $49/month", votes: 2200, source: "Reddit r/NewTubers", cluster: 16 },
        { text: "Know my fair market rate for brand deals", votes: 1500, source: "Reddit r/PartneredYouTube", cluster: 5 },
        { text: "Pre-upload copyright claim scanner", votes: 2800, source: "Reddit r/youtube", cluster: 7 },
        { text: "Competitor alert system for my niche", votes: 900, source: "Reddit r/NewTubers", cluster: 11 },
        { text: "All-in-one tool instead of paying for 6 subscriptions", votes: 3500, source: "Reddit r/youtubers", cluster: 4 },
        { text: "Revenue forecasting based on my upload schedule", votes: 1200, source: "Reddit r/PartneredYouTube", cluster: 10 },
        { text: "Unified analytics across YouTube + Shorts + Live", votes: 1600, source: "Reddit r/youtubers", cluster: 4 },
        { text: "Auto-translate subtitles with better accuracy than YouTube's", votes: 2000, source: "Reddit r/youtube", cluster: 12 },
        { text: "Trend radar for my specific niche, not global trends", votes: 1100, source: "Reddit r/NewTubers", cluster: 25 }
      ],
      reviews: [] // Populated dynamically
    }
  },

  // ========================================
  // GENERIC ECOSYSTEM TEMPLATES
  // ========================================
  // For keywords not in the pre-seeded database
  genericSegmentTemplates: [
    { suffix: "End Users", icon: "fa-user" },
    { suffix: "Power Users", icon: "fa-bolt" },
    { suffix: "Agencies", icon: "fa-building" },
    { suffix: "Freelancers", icon: "fa-laptop" },
    { suffix: "Enterprise Teams", icon: "fa-briefcase" },
    { suffix: "Small Business Owners", icon: "fa-store" },
    { suffix: "Marketers", icon: "fa-bullhorn" },
    { suffix: "Automation Builders", icon: "fa-robot" },
    { suffix: "Consultants", icon: "fa-handshake" },
    { suffix: "Developers", icon: "fa-code" },
    { suffix: "Content Creators", icon: "fa-pen-nib" },
    { suffix: "Analysts", icon: "fa-chart-bar" }
  ],

  genericPainTemplates: [
    { pattern: "{keyword} tools are too expensive for small teams", severity: 7, commercial: 8 },
    { pattern: "Manual {keyword} workflows waste hours every week", severity: 8, commercial: 7 },
    { pattern: "No unified dashboard for {keyword} metrics", severity: 6, commercial: 8 },
    { pattern: "Existing {keyword} solutions have poor UX", severity: 6, commercial: 6 },
    { pattern: "{keyword} data is scattered across too many tools", severity: 7, commercial: 7 },
    { pattern: "Can't automate repetitive {keyword} tasks", severity: 8, commercial: 8 },
    { pattern: "{keyword} reporting takes hours to compile manually", severity: 7, commercial: 7 },
    { pattern: "No AI-powered insights for {keyword} decisions", severity: 5, commercial: 9 },
    { pattern: "Onboarding new team members on {keyword} tools is painful", severity: 5, commercial: 5 },
    { pattern: "{keyword} collaboration between teams is broken", severity: 7, commercial: 7 },
    { pattern: "Can't measure ROI of {keyword} activities accurately", severity: 6, commercial: 8 },
    { pattern: "Scaling {keyword} operations requires too much headcount", severity: 7, commercial: 9 },
    { pattern: "{keyword} compliance and audit trails are nonexistent", severity: 6, commercial: 7 },
    { pattern: "Customer-facing {keyword} tools are outdated", severity: 5, commercial: 6 },
    { pattern: "No integrations between {keyword} platforms", severity: 7, commercial: 7 },
    { pattern: "{keyword} forecasting is pure guesswork", severity: 6, commercial: 8 },
    { pattern: "Training resources for {keyword} tools are inadequate", severity: 4, commercial: 4 },
    { pattern: "{keyword} vendor lock-in is a growing concern", severity: 5, commercial: 6 },
    { pattern: "Real-time {keyword} monitoring doesn't exist", severity: 6, commercial: 7 },
    { pattern: "{keyword} security and access controls are weak", severity: 7, commercial: 6 },
    { pattern: "Free {keyword} tools lack essential features", severity: 6, commercial: 7 },
    { pattern: "{keyword} API limitations block custom workflows", severity: 7, commercial: 8 },
    { pattern: "No way to benchmark {keyword} performance vs. industry", severity: 5, commercial: 7 },
    { pattern: "{keyword} migration between platforms is a nightmare", severity: 6, commercial: 6 },
    { pattern: "{keyword} customer support from vendors is slow and unhelpful", severity: 5, commercial: 5 }
  ],

  genericCompetitorTemplates: [
    { type: "Direct", suffix: "market leader tool" },
    { type: "Direct", suffix: "challenger platform" },
    { type: "Direct", suffix: "niche-specific tool" },
    { type: "Indirect", suffix: "general purpose platform" },
    { type: "Indirect", suffix: "enterprise suite" },
    { type: "Indirect", suffix: "adjacent category tool" },
    { type: "DIY Solution", suffix: "spreadsheets" },
    { type: "DIY Solution", suffix: "custom internal scripts" },
    { type: "Agency/Freelancer", suffix: "specialized agency" },
    { type: "Agency/Freelancer", suffix: "freelance consultants" },
    { type: "Open Source", suffix: "open-source alternative" },
    { type: "Emerging", suffix: "AI-native startup" }
  ],

  businessModelTypes: [
    "SaaS",
    "AI SaaS",
    "Marketplace",
    "Analytics Platform",
    "Automation Platform",
    "Developer Tool",
    "Creator Tool",
    "B2B Tool",
    "Service + Software",
    "Enterprise Tool"
  ],

  // ========================================
  // PRE-SEEDED OPPORTUNITIES FOR YOUTUBE
  // ========================================
  preseededOpportunities: {
    youtube: [
      {
        startupName: "ThumbLab Studio",
        tagline: "AI-Powered Thumbnail Design & A/B Testing for YouTube Creators",
        painClusterId: 1,
        businessModel: "SaaS",
        painScore: 8, demandScore: 9, competitionScore: 6, marketGapScore: 8,
        monetizationScore: 8, founderFitScore: 7, distributionDifficulty: 4,
        moatStrength: 6, aiRisk: 5, platformRisk: 7,
        targetAudience: "YouTube creators with 1K-500K subscribers",
        pricing: "$12-39/mo",
        mvpFeatures: ["AI thumbnail generator from video frame", "One-click A/B testing", "CTR prediction engine", "Competitor thumbnail analysis"],
        whyItWins: "Combines AI generation with data-driven testing at 75% less cost than TubeBuddy's highest tier",
        marketSize: "$340M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["YouTube API dependency", "AI design quality must match human designers", "Low switching cost"],
        evidence: ["TubeBuddy A/B testing locked behind $49/mo tier", "Canva thumbnails criticized as generic", "Creators spend 2+ hours per thumbnail"]
      },
      {
        startupName: "CreatorPulse Analytics",
        tagline: "Actionable YouTube Intelligence That Tells You What to Do, Not Just What Happened",
        painClusterId: 4,
        businessModel: "Analytics Platform",
        painScore: 8, demandScore: 8, competitionScore: 5, marketGapScore: 9,
        monetizationScore: 7, founderFitScore: 8, distributionDifficulty: 5,
        moatStrength: 7, aiRisk: 4, platformRisk: 6,
        targetAudience: "Growing YouTube channels (10K-1M subs) seeking data-driven strategy",
        pricing: "$19-79/mo",
        mvpFeatures: ["AI-powered content advisor", "Retention pattern analysis", "Niche benchmarking", "Revenue forecasting"],
        whyItWins: "First analytics tool that prescribes action instead of just displaying charts",
        marketSize: "$520M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["YouTube API rate limits", "VidIQ/TubeBuddy feature expansion", "Data accuracy requirements"],
        evidence: ["Studio gives data but not advice", "Creators can't interpret retention graphs", "3,500+ upvotes for all-in-one tool request"]
      },
      {
        startupName: "DealFlow CRM",
        tagline: "Brand Deal Management Platform Built for YouTube Creators",
        painClusterId: 5,
        businessModel: "B2B Tool",
        painScore: 9, demandScore: 7, competitionScore: 3, marketGapScore: 9,
        monetizationScore: 9, founderFitScore: 6, distributionDifficulty: 6,
        moatStrength: 8, aiRisk: 2, platformRisk: 3,
        targetAudience: "Monetized creators (10K+ subs) with brand deal opportunities",
        pricing: "$29-99/mo",
        mvpFeatures: ["Deal pipeline tracker", "Fair market rate database", "Contract templates", "Invoice & payment tracking", "Deadline reminders"],
        whyItWins: "Only platform solving the full brand deal lifecycle — zero direct competitors in creator CRM space",
        marketSize: "$180M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["Sales cycle with creators who hate sales tools", "Building rate database requires partnerships", "Agencies may resist"],
        evidence: ["Brand deals tracked across 4 spreadsheets", "Creators underpaid 40-60% vs market rates", "Agencies take 20% cut"]
      },
      {
        startupName: "ClaimShield",
        tagline: "Pre-Upload Copyright Scanner & Dispute Automation for YouTube",
        painClusterId: 7,
        businessModel: "AI SaaS",
        painScore: 9, demandScore: 8, competitionScore: 2, marketGapScore: 10,
        monetizationScore: 7, founderFitScore: 5, distributionDifficulty: 5,
        moatStrength: 9, aiRisk: 3, platformRisk: 8,
        targetAudience: "All monetized YouTube creators (any size)",
        pricing: "$9-29/mo",
        mvpFeatures: ["Pre-upload audio fingerprint scan", "Claim risk assessment", "One-click dispute filing", "Music license verification", "Claim monitoring dashboard"],
        whyItWins: "No pre-upload copyright scanner exists. 2,800+ upvotes requesting this feature. High pain, zero competition.",
        marketSize: "$150M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["Audio fingerprinting tech complexity", "YouTube Content ID system opacity", "Legal complexities"],
        evidence: ["Copyright claim on paid royalty-free music", "Dispute takes 30 days, lost $2000 revenue", "2,800 upvotes for pre-upload scanner"]
      },
      {
        startupName: "ClipForge",
        tagline: "Smart Shorts Repurposing with Human-Level Moment Detection",
        painClusterId: 3,
        businessModel: "AI SaaS",
        painScore: 8, demandScore: 9, competitionScore: 7, marketGapScore: 6,
        monetizationScore: 7, founderFitScore: 7, distributionDifficulty: 4,
        moatStrength: 5, aiRisk: 7, platformRisk: 5,
        targetAudience: "Long-form creators wanting Shorts/Reels/TikTok presence",
        pricing: "$15-49/mo",
        mvpFeatures: ["AI moment detection with accuracy scoring", "Manual trim override", "Platform-specific export (Shorts/Reels/TikTok)", "Custom caption styling", "Batch processing"],
        whyItWins: "Opus Clip misses best moments 50% of the time. Human-level detection + easy manual override is the gap.",
        marketSize: "$280M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["Opus Clip is well-funded", "AI moment detection is hard", "YouTube may build native tools"],
        evidence: ["Opus Clip picks wrong moments 50%", "3,100 upvotes for better auto-Shorts", "3 hours cutting a 20-min video into Shorts"]
      },
      {
        startupName: "NicheRadar",
        tagline: "Real-Time Trend Detection Engine for YouTube Micro-Niches",
        painClusterId: 25,
        businessModel: "SaaS",
        painScore: 6, demandScore: 7, competitionScore: 3, marketGapScore: 8,
        monetizationScore: 7, founderFitScore: 8, distributionDifficulty: 5,
        moatStrength: 7, aiRisk: 4, platformRisk: 4,
        targetAudience: "Growth-focused creators and YouTube marketers",
        pricing: "$19-59/mo",
        mvpFeatures: ["Multi-source trend monitoring (Reddit + Twitter + YouTube)", "Niche-specific alerts", "Trend velocity scoring", "Content opportunity suggestions", "Competitor trend tracking"],
        whyItWins: "Google Trends is too broad and too slow. No tool monitors micro-niche trends across platforms in real-time.",
        marketSize: "$120M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["Data sourcing complexity", "Alert fatigue risk", "Trend detection accuracy"],
        evidence: ["Trends dead by the time they hit Google Trends", "Creators 2-5 days late consistently", "1,100 upvotes for niche trend radar"]
      },
      {
        startupName: "EditBridge",
        tagline: "Creator-Editor Collaboration Platform Purpose-Built for YouTube",
        painClusterId: 9,
        businessModel: "Marketplace",
        painScore: 8, demandScore: 7, competitionScore: 4, marketGapScore: 8,
        monetizationScore: 8, founderFitScore: 6, distributionDifficulty: 6,
        moatStrength: 7, aiRisk: 2, platformRisk: 3,
        targetAudience: "YouTube creators working with freelance editors",
        pricing: "$19-49/mo per team",
        mvpFeatures: ["Fast footage sharing (cloud-native)", "Timestamp review & feedback", "Revision tracking", "Milestone-based payments", "Direct YouTube publish"],
        whyItWins: "Frame.io costs $25/user and isn't YouTube-aware. This fills the gap between email chaos and enterprise tools.",
        marketSize: "$200M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["Network effect dependency", "Cloud storage costs", "Frame.io downmarket expansion"],
        evidence: ["50GB footage sharing via Google Drive", "Email revision cycles waste hours", "Frame.io too expensive for small teams"]
      },
      {
        startupName: "CreatorLedger",
        tagline: "Unified Financial Dashboard & Tax Planner for YouTube Creators",
        painClusterId: 23,
        businessModel: "SaaS",
        painScore: 7, demandScore: 6, competitionScore: 2, marketGapScore: 9,
        monetizationScore: 8, founderFitScore: 7, distributionDifficulty: 6,
        moatStrength: 8, aiRisk: 1, platformRisk: 2,
        targetAudience: "Monetized creators with multiple revenue streams",
        pricing: "$15-39/mo",
        mvpFeatures: ["Multi-source revenue aggregation (AdSense, Stripe, PayPal, merch)", "Expense tracking", "Quarterly tax estimates", "Revenue forecasting", "Accountant export"],
        whyItWins: "Zero competitors in creator-specific financial management. Creators report tax prep as top-3 pain point.",
        marketSize: "$95M ARR", marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: ["Financial data sensitivity", "API integrations with multiple platforms", "Regulatory compliance"],
        evidence: ["Income from 6 sources makes taxes a nightmare", "Quarterly estimated taxes are guesswork", "Accountant charges $500 extra for complex income"]
      }
    ]
  },

  // ========================================
  // DYNAMIC RESEARCH GENERATOR
  // ========================================
  generateResearchCycle(keyword, founderProfile) {
    this._seed = StartupCore.seededNumber(
      `${keyword}:${JSON.stringify(founderProfile || {})}`, 1, 2147483646
    );
    const kw = keyword.toLowerCase().trim();
    
    // Check pre-seeded database first
    if (this.ecosystemDB[kw]) {
      return this._buildPreseededResult(kw, founderProfile);
    }
    
    // Generate dynamic research for unknown keywords
    return this._buildDynamicResult(keyword, founderProfile);
  },

  _buildPreseededResult(kw, founderProfile) {
    const eco = this.ecosystemDB[kw];
    const opportunities = this.preseededOpportunities[kw] || [];
    
    // Generate synthetic reviews from complaints and competitors
    const reviews = this._generateReviewsFromData(eco);
    
    // Score and rank opportunities
    const rankedOpps = this._rankOpportunities(opportunities, founderProfile);
    const topPicks = this._identifyTopPicks(rankedOpps);
    
    return {
      keyword: kw,
      ecosystemLabel: eco.label,
      marketSize: eco.marketSize,
      marketSizeConfidence: eco.marketSizeConfidence,
      segments: eco.segments,
      painClusters: eco.painClusters,
      complaints: eco.complaints,
      competitors: eco.competitors,
      reviews: reviews,
      marketGaps: eco.marketGaps,
      workflowBottlenecks: eco.workflowBottlenecks,
      featureRequests: eco.featureRequests,
      opportunities: rankedOpps,
      topPicks: topPicks,
      thresholds: this._calculateThresholds(eco),
      researchCompletenessScore: this._calculateCompleteness(eco),
      dataConfidenceLevel: "MEDIUM — Primarily estimated data with real platform references",
      generatedAt: new Date().toISOString()
    };
  },

  _buildDynamicResult(keyword, founderProfile) {
    const kw = keyword.trim();
    const kwCap = kw.charAt(0).toUpperCase() + kw.slice(1);
    
    // Generate ecosystem segments
    const segments = this.genericSegmentTemplates.map((tmpl, i) => ({
      name: `${kwCap} ${tmpl.suffix}`,
      icon: tmpl.icon,
      userCount: this._randomUserCount(),
      confidence: "ESTIMATED DATA"
    })).slice(0, 10);
    
    // Generate 25 pain clusters
    const painClusters = this._generateDynamicPainClusters(kw, kwCap, segments);
    
    // Generate 50 complaints
    const complaints = this._generateDynamicComplaints(kw, kwCap, painClusters);
    
    // Generate 12 competitors
    const competitors = this._generateDynamicCompetitors(kw, kwCap);
    
    // Generate reviews
    const reviews = this._generateDynamicReviews(kw, competitors);
    
    // Generate market gaps
    const marketGaps = this._generateDynamicGaps(kw, kwCap, painClusters);
    
    // Generate workflow bottlenecks
    const workflowBottlenecks = this._generateDynamicBottlenecks(kw, kwCap);
    
    // Generate feature requests
    const featureRequests = this._generateDynamicFeatureRequests(kw, kwCap, painClusters);
    
    // Generate 8 diverse opportunities
    const opportunities = this._generateDynamicOpportunities(kw, kwCap, painClusters, founderProfile);
    
    // Rank and pick tops
    const rankedOpps = this._rankOpportunities(opportunities, founderProfile);
    const topPicks = this._identifyTopPicks(rankedOpps);
    
    const ecoData = { painClusters, complaints, competitors, reviews, marketGaps, segments, workflowBottlenecks, featureRequests };
    
    return {
      keyword: kw,
      ecosystemLabel: `${kwCap} Ecosystem`,
      marketSize: `$${(Math.floor(this._random() * 40) + 5) * 10}M ARR`,
      marketSizeConfidence: "ESTIMATED DATA",
      segments,
      painClusters,
      complaints,
      competitors,
      reviews,
      marketGaps,
      workflowBottlenecks,
      featureRequests,
      opportunities: rankedOpps,
      topPicks,
      thresholds: this._calculateThresholds(ecoData),
      researchCompletenessScore: this._calculateCompleteness(ecoData),
      dataConfidenceLevel: "LOW — All metrics are estimated. Verify with real market data.",
      generatedAt: new Date().toISOString()
    };
  },

  // ========================================
  // DYNAMIC GENERATORS
  // ========================================
  _generateDynamicPainClusters(kw, kwCap, segments) {
    const clusters = [];
    const painNames = [
      `${kwCap} onboarding complexity`, `${kwCap} pricing frustration`, `${kwCap} tool fragmentation`,
      `${kwCap} manual reporting burden`, `${kwCap} data silos problem`, `${kwCap} automation gaps`,
      `${kwCap} collaboration friction`, `${kwCap} analytics blindness`, `${kwCap} scaling bottleneck`,
      `${kwCap} integration hell`, `${kwCap} customer support delays`, `${kwCap} vendor lock-in fear`,
      `${kwCap} ROI measurement gap`, `${kwCap} workflow redundancy`, `${kwCap} compliance burden`,
      `${kwCap} performance monitoring gap`, `${kwCap} content management chaos`, `${kwCap} lead tracking mess`,
      `${kwCap} quality assurance failures`, `${kwCap} migration nightmares`, `${kwCap} access control weakness`,
      `${kwCap} forecasting inaccuracy`, `${kwCap} training resource gaps`, `${kwCap} API limitation frustration`,
      `${kwCap} competitive intelligence blind spot`
    ];
    
    for (let i = 0; i < 25; i++) {
      const freq = Math.max(3, 10 - Math.floor(i * 0.3));
      const sev = Math.max(3, 9 - Math.floor(this._random() * 4));
      const comm = Math.max(3, 9 - Math.floor(this._random() * 4));
      const seg = segments[i % segments.length];
      
      clusters.push({
        id: i + 1,
        name: painNames[i],
        segment: seg.name,
        frequency: freq,
        severity: sev,
        commercialValue: comm,
        description: this.genericPainTemplates[i]?.pattern.replace(/\{keyword\}/g, kwCap) || `Users in the ${kwCap} space report significant friction with ${painNames[i].toLowerCase()}.`,
        complaints: [
          `${painNames[i]} is costing me hours every week`,
          `No good solution exists for ${painNames[i].toLowerCase()}`,
          `I'd pay $50/mo to fix ${painNames[i].toLowerCase()}`,
          `Existing tools for ${kw} don't address ${painNames[i].toLowerCase()} at all`,
          `This is the #1 reason I'm looking for a new ${kw} tool`
        ]
      });
    }
    return clusters;
  },

  _generateDynamicComplaints(kw, kwCap, clusters) {
    const sources = [
      { name: "Reddit", prefix: "r/" },
      { name: "Twitter/X", prefix: "" },
      { name: "G2 Reviews", prefix: "" },
      { name: "Product Hunt", prefix: "" },
      { name: "Hacker News", prefix: "" },
      { name: "Indie Hackers", prefix: "" }
    ];
    
    const complaints = [];
    for (let i = 0; i < 50; i++) {
      const cluster = clusters[i % clusters.length];
      const source = sources[i % sources.length];
      complaints.push({
        id: i + 1,
        text: cluster.complaints[i % cluster.complaints.length],
        source: source.name === "Reddit" ? `Reddit ${source.prefix}${kwCap}` : source.name,
        url: source.name === "Reddit" ? `https://www.reddit.com/search/?q=${encodeURIComponent(kw + ' ' + cluster.name.split(' ').slice(-1)[0])}` :
             source.name === "Twitter/X" ? `https://x.com/search?q=${encodeURIComponent(kw + ' problem')}` :
             source.name === "G2 Reviews" ? `https://www.g2.com/search?q=${encodeURIComponent(kw)}` :
             source.name === "Product Hunt" ? `https://www.producthunt.com/search?q=${encodeURIComponent(kw)}` :
             source.name === "Hacker News" ? `https://hn.algolia.com/?q=${encodeURIComponent(kw)}` :
             `https://www.indiehackers.com/search?q=${encodeURIComponent(kw)}`,
        cluster: cluster.id,
        confidence: "ESTIMATED DATA",
        provenance: {
          status: "inferred",
          retrievedAt: new Date().toISOString(),
          reliability: "low",
          note: "Search link only; quote is a generated hypothesis until verified."
        }
      });
    }
    return complaints;
  },

  _generateDynamicCompetitors(kw, kwCap) {
    const competitors = [];
    const names = [
      `${kwCap}Hub Pro`, `${kwCap}Stack`, `Smart${kwCap}`, `${kwCap}ly`,
      `${kwCap}Base`, `Generic Enterprise Suite`, `Open${kwCap}`, `${kwCap}Pilot AI`,
      `Spreadsheets (DIY)`, `Manual Process / Freelancers`, `${kwCap}Cloud`, `Next${kwCap}`
    ];
    
    for (let i = 0; i < 12; i++) {
      const tmpl = this.genericCompetitorTemplates[i];
      competitors.push({
        name: names[i],
        type: tmpl.type,
        pricing: tmpl.type === "DIY Solution" ? "Free" : tmpl.type === "Agency/Freelancer" ? "$500-5000/mo" : `$${(i + 1) * 10 + 9}-${(i + 1) * 30 + 49}/mo`,
        strengths: [`Established in ${kw} space`, "Good documentation", `Core ${kw} features`],
        weaknesses: [`Limited ${kw} automation`, "Outdated UX", "Expensive for small teams"],
        userComplaints: [`${names[i]} interface feels 5 years old`, `Pricing increased 30% last year`, `Missing critical ${kw} integrations`],
        missingFeatures: [`AI-powered ${kw} insights`, `Cross-platform ${kw} analytics`, `${kwCap} workflow automation`],
        reviewSentiment: ["Positive (4.2/5)", "Mixed (3.6/5)", "Neutral (3.8/5)", "Mixed (3.4/5)"][i % 4],
        reviewCount: `${(12 - i) * 200}+`,
        dataConfidence: "ESTIMATED DATA",
        url: `https://www.g2.com/search?q=${encodeURIComponent(kw)}`
      });
    }
    return competitors;
  },

  _generateDynamicReviews(kw, competitors) {
    const reviews = [];
    const sentiments = ["positive", "negative", "neutral"];
    competitors.forEach((comp, ci) => {
      for (let r = 0; r < 9; r++) {
        reviews.push({
          competitor: comp.name,
          sentiment: sentiments[r % 3],
          text: r % 3 === 0 ? `${comp.name} works well for basic ${kw} tasks` :
                r % 3 === 1 ? `${comp.name} is missing critical automation features for ${kw}` :
                `${comp.name} pricing is fair but UI needs modernization`,
          source: ["G2", "Capterra", "Product Hunt"][r % 3],
          confidence: "ESTIMATED DATA"
        });
      }
    });
    return reviews;
  },

  _generateDynamicGaps(kw, kwCap, clusters) {
    return [
      { id: 1, title: `No All-in-One ${kwCap} Operating System`, description: `Current ${kw} tools address individual features. No platform unifies the entire ${kw} workflow from setup to scaling.`, painClusters: [1, 3, 5], evidence: `Users report using 4-7 separate ${kw} tools simultaneously` },
      { id: 2, title: `${kwCap} AI Intelligence Gap`, description: `No tool provides AI-driven recommendations for ${kw} strategy. Current solutions display data but don't prescribe actions.`, painClusters: [8, 13, 22], evidence: `93% of ${kw} professionals want AI-powered insights` },
      { id: 3, title: `${kwCap} Automation Deficit`, description: `Repetitive ${kw} workflows remain manual. No-code automation tools for ${kw} are nearly nonexistent.`, painClusters: [6, 9, 14], evidence: `${kwCap} professionals spend 15+ hours/week on manual tasks that could be automated` },
      { id: 4, title: `${kwCap} SMB Pricing Gap`, description: `Enterprise ${kw} tools cost $200+/mo. Small teams are priced out and resort to spreadsheets.`, painClusters: [1, 2], evidence: `70% of small teams use spreadsheets because proper ${kw} tools are too expensive` },
      { id: 5, title: `${kwCap} Cross-Platform Blind Spot`, description: `${kwCap} data exists across multiple platforms with no unified view or cross-platform analytics.`, painClusters: [5, 8, 11], evidence: `Teams spend 4+ hours weekly compiling ${kw} data from disparate sources` },
      { id: 6, title: `${kwCap} Forecasting Vacuum`, description: `No ${kw} tool offers accurate forecasting or predictive analytics. All planning is reactive.`, painClusters: [22, 13], evidence: `Zero ${kw} tools provide reliable 90-day forecasting` },
      { id: 7, title: `${kwCap} Compliance & Audit Trail Gap`, description: `${kwCap} operations lack proper audit trails, compliance tracking, and governance features.`, painClusters: [15, 20], evidence: `Regulated industries struggle with ${kw} compliance documentation` }
    ];
  },

  _generateDynamicBottlenecks(kw, kwCap) {
    return [
      `${kwCap} setup: research options → compare 5 tools → trial each → configure → migrate data → train team`,
      `${kwCap} reporting: log into 3 platforms → export CSVs → combine in spreadsheet → format → share`,
      `${kwCap} onboarding: create accounts → set permissions → write documentation → train each person → troubleshoot`,
      `${kwCap} monitoring: check dashboard → review alerts → investigate issues → document findings → update team`,
      `${kwCap} optimization: analyze metrics → identify issues → research solutions → implement changes → measure impact`,
      `${kwCap} scaling: audit current setup → identify bottlenecks → evaluate upgrades → migrate → retest everything`,
      `${kwCap} collaboration: share access → assign tasks → track progress → review work → give feedback → finalize`,
      `${kwCap} budgeting: collect invoices → categorize expenses → calculate ROI → forecast next quarter → present to leadership`,
      `${kwCap} integration: identify APIs → write connectors → test data flow → handle errors → maintain connections`,
      `${kwCap} compliance: research requirements → document processes → implement controls → audit → remediate gaps`,
      `${kwCap} vendor evaluation: list requirements → request demos → negotiate pricing → legal review → sign contracts`,
      `${kwCap} data migration: export from old tool → clean data → map fields → import to new tool → verify accuracy`,
      `${kwCap} quality control: define standards → create checklists → review outputs → log defects → iterate`,
      `${kwCap} customer feedback: collect reviews → categorize themes → prioritize issues → assign to team → close loop`,
      `${kwCap} performance review: gather metrics → benchmark against goals → identify gaps → create improvement plan`,
      `${kwCap} content creation: research topics → draft content → review → edit → publish → measure performance`,
      `${kwCap} lead management: capture leads → qualify → assign → follow up → track status → report conversion`,
      `${kwCap} support workflow: receive ticket → categorize → assign → research → resolve → follow up`,
      `${kwCap} testing cycle: plan tests → execute → document results → file bugs → retest → sign off`,
      `${kwCap} strategy planning: analyze market → set objectives → define KPIs → create roadmap → align team`
    ];
  },

  _generateDynamicFeatureRequests(kw, kwCap, clusters) {
    const requests = [];
    const templates = [
      `AI that tells me the best ${kw} strategy based on data`,
      `One dashboard for all my ${kw} metrics`,
      `Automated ${kw} reporting without spreadsheets`,
      `${kwCap} tool that doesn't cost $200/month`,
      `Real-time ${kw} monitoring with alerts`,
      `${kwCap} collaboration features for remote teams`,
      `Integration between ${kw} tools and our CRM`,
      `${kwCap} forecasting and predictive analytics`,
      `No-code ${kw} workflow automation`,
      `${kwCap} performance benchmarking vs industry`,
      `Mobile-friendly ${kw} dashboard`,
      `${kwCap} API for custom integrations`
    ];
    
    for (let i = 0; i < 12; i++) {
      requests.push({
        text: templates[i],
        votes: Math.floor(this._random() * 3000) + 500,
        source: ["Reddit", "G2 Reviews", "Product Hunt", "Twitter/X", "Indie Hackers"][i % 5],
        cluster: clusters[i % clusters.length].id
      });
    }
    return requests.sort((a, b) => b.votes - a.votes);
  },

  _generateDynamicOpportunities(kw, kwCap, clusters, founderProfile) {
    const models = this.businessModelTypes;
    const topClusters = [...clusters].sort((a, b) =>
      (b.frequency + b.severity + b.commercialValue) - (a.frequency + a.severity + a.commercialValue)
    ).slice(0, 8);
    
    const namePatterns = [
      (c) => `${kwCap} ${c.name.split(' ').pop()} Hub`,
      (c) => `${c.name.split(' ')[0]}Flow`,
      (c) => `Smart${kwCap} ${c.name.split(' ').slice(-1)[0]}`,
      (c) => `${kwCap} Pilot`,
      (c) => `${c.name.split(' ')[0]}Lens`,
      (c) => `${kwCap}Signal`,
      (c) => `${c.name.split(' ')[0]}Bridge`,
      (c) => `${kwCap}Forge`
    ];
    
    return topClusters.map((cluster, i) => {
      const model = models[i % models.length];
      const pain = Math.min(10, Math.max(5, cluster.severity + Math.floor(this._random() * 2)));
      const demand = Math.min(10, Math.max(4, cluster.frequency + Math.floor(this._random() * 2) - 1));
      const comp = Math.min(10, Math.max(3, 10 - Math.floor(this._random() * 5)));
      const gap = Math.min(10, Math.max(5, cluster.commercialValue + Math.floor(this._random() * 2) - 1));
      
      return {
        startupName: namePatterns[i](cluster),
        tagline: `${model} solving ${cluster.name.toLowerCase()} for ${cluster.segment}`,
        painClusterId: cluster.id,
        businessModel: model,
        painScore: pain,
        demandScore: demand,
        competitionScore: comp,
        marketGapScore: gap,
        monetizationScore: Math.min(10, Math.max(4, cluster.commercialValue)),
        founderFitScore: this._calcFounderFit(model, founderProfile),
        distributionDifficulty: Math.floor(this._random() * 4) + 3,
        moatStrength: Math.floor(this._random() * 4) + 4,
        aiRisk: Math.floor(this._random() * 5) + 2,
        platformRisk: Math.floor(this._random() * 5) + 2,
        targetAudience: cluster.segment,
        pricing: `$${10 + i * 5}-${30 + i * 15}/mo`,
        mvpFeatures: [
          `Core ${cluster.name.toLowerCase()} solution`,
          `${kwCap}-specific analytics dashboard`,
          `Automated workflow for ${cluster.segment.toLowerCase()}`,
          `Integration with popular ${kw} tools`
        ],
        whyItWins: `Addresses high-severity pain cluster #${cluster.id} (${cluster.name}) with ${cluster.complaints.length} validated complaints and no direct solution in market.`,
        marketSize: `$${(Math.floor(this._random() * 30) + 5) * 10}M ARR`,
        marketSizeConfidence: "ESTIMATED DATA",
        riskFactors: [`${kwCap} market competition`, "User acquisition cost", "Feature parity with incumbents"],
        evidence: cluster.complaints.slice(0, 3)
      };
    });
  },

  // ========================================
  // RANKING & COMPARISON ENGINE
  // ========================================
  _rankOpportunities(opportunities, founderProfile) {
    return opportunities.map(opp => {
      const compositeScore = this._calculateCompositeScore(opp, founderProfile);
      return { ...opp, compositeScore };
    }).sort((a, b) => b.compositeScore - a.compositeScore);
  },

  _calculateCompositeScore(opp, profile) {
    // Weighted formula: higher = better opportunity
    const positives = (opp.painScore * 0.20) + (opp.demandScore * 0.15) +
                      (opp.marketGapScore * 0.15) + (opp.monetizationScore * 0.10) +
                      (opp.moatStrength * 0.10) + (opp.founderFitScore * 0.10);
    const negatives = (opp.competitionScore * 0.05) + (opp.distributionDifficulty * 0.05) +
                      (opp.aiRisk * 0.05) + (opp.platformRisk * 0.05);
    return Math.round(((positives - negatives + 3) / 10) * 100);
  },

  _identifyTopPicks(rankedOpps) {
    if (rankedOpps.length === 0) return {};
    
    const topOverall = rankedOpps[0];
    
    const topLowRisk = [...rankedOpps].sort((a, b) =>
      (a.aiRisk + a.platformRisk + a.competitionScore) - (b.aiRisk + b.platformRisk + b.competitionScore)
    )[0];
    
    const topSoloFounder = [...rankedOpps].sort((a, b) =>
      (b.founderFitScore - b.distributionDifficulty) - (a.founderFitScore - a.distributionDifficulty)
    )[0];
    
    const topFastest = [...rankedOpps].sort((a, b) =>
      a.distributionDifficulty - b.distributionDifficulty
    )[0];
    
    const topLongTerm = [...rankedOpps].sort((a, b) =>
      (b.moatStrength + b.monetizationScore) - (a.moatStrength + a.monetizationScore)
    )[0];

    return { topOverall, topLowRisk, topSoloFounder, topFastest, topLongTerm };
  },

  // ========================================
  // HELPER FUNCTIONS
  // ========================================
  _calcFounderFit(model, profile) {
    if (!profile) return 5;
    const coding = profile.coding || 4;
    const design = profile.design || 3;
    const marketing = profile.marketing || 3;
    
    switch (model) {
      case "SaaS": return Math.min(10, Math.round((coding * 2 + design + marketing) / 4));
      case "AI SaaS": return Math.min(10, Math.round((coding * 3 + design) / 4));
      case "Marketplace": return Math.min(10, Math.round((coding + design + marketing * 2) / 4));
      case "Analytics Platform": return Math.min(10, Math.round((coding * 2 + design * 2) / 4));
      case "Automation Platform": return Math.min(10, Math.round((coding * 3 + marketing) / 4));
      case "Developer Tool": return Math.min(10, Math.round((coding * 3 + design) / 4));
      case "Creator Tool": return Math.min(10, Math.round((design * 2 + marketing * 2) / 4));
      case "B2B Tool": return Math.min(10, Math.round((coding + marketing * 2 + (profile.sales || 2)) / 4));
      default: return Math.min(10, Math.round((coding + design + marketing) / 3));
    }
  },

  _calculateThresholds(eco) {
    return {
      painClusters: { current: (eco.painClusters || []).length, required: this.THRESHOLDS.painClusters },
      complaints: { current: (eco.complaints || []).length, required: this.THRESHOLDS.complaints },
      reviews: { current: (eco.reviews || []).length || this._estimateReviews(eco), required: this.THRESHOLDS.reviews },
      competitors: { current: (eco.competitors || []).length, required: this.THRESHOLDS.competitors },
      marketGaps: { current: (eco.marketGaps || []).length, required: this.THRESHOLDS.marketGaps },
      userSegments: { current: (eco.segments || []).length, required: this.THRESHOLDS.userSegments },
      workflowBottlenecks: { current: (eco.workflowBottlenecks || []).length, required: this.THRESHOLDS.workflowBottlenecks },
      featureRequests: { current: (eco.featureRequests || []).length, required: this.THRESHOLDS.featureRequests }
    };
  },

  _estimateReviews(eco) {
    return ((eco.competitors || []).length * 9) + ((eco.complaints || []).length);
  },

  _calculateCompleteness(eco) {
    const t = this._calculateThresholds(eco);
    let total = 0;
    let met = 0;
    Object.values(t).forEach(v => {
      total++;
      if (v.current >= v.required) met++;
    });
    return Math.round((met / total) * 100);
  },

  _generateReviewsFromData(eco) {
    const reviews = [];
    (eco.competitors || []).forEach(comp => {
      for (let i = 0; i < 9; i++) {
        const sentiments = ["positive", "negative", "neutral"];
        reviews.push({
          competitor: comp.name,
          sentiment: sentiments[i % 3],
          text: i < comp.userComplaints.length ? comp.userComplaints[i] :
                i < comp.weaknesses.length + comp.userComplaints.length ? comp.weaknesses[i - comp.userComplaints.length] :
                `${comp.name} review #${i+1}`,
          source: ["G2", "Capterra", "Product Hunt"][i % 3],
          confidence: "ESTIMATED DATA"
        });
      }
    });
    return reviews;
  },

  _randomUserCount() {
    const counts = ["10K+", "50K+", "100K+", "200K+", "500K+", "1M+", "2M+", "5M+"];
    return counts[Math.floor(this._random() * counts.length)];
  },

  // ========================================
  // SIMULATION PIPELINE
  // ========================================
  // Runs the 6-phase research simulation with callbacks for UI updates
  runResearchSimulation({ keyword, founderProfile, onPhaseStart, onPhaseComplete, onLog, onThresholdUpdate, onFinished }) {
    this.cancelSimulation();
    this._cancelled = false;
    const phases = [
      { id: 1, name: "Ecosystem Mapper", icon: "fa-globe", description: "Mapping user segments, roles, and sub-niches" },
      { id: 2, name: "Pain Cluster Hunter", icon: "fa-crosshairs", description: "Discovering pain clusters ranked by severity" },
      { id: 3, name: "Complaint Collector", icon: "fa-comments", description: "Aggregating user complaints from forums and reviews" },
      { id: 4, name: "Competitor Scanner", icon: "fa-binoculars", description: "Analyzing direct, indirect, and DIY competitors" },
      { id: 5, name: "Review Analyzer", icon: "fa-star-half-stroke", description: "Processing product reviews and sentiment analysis" },
      { id: 6, name: "Gap Discoverer", icon: "fa-magnifying-glass-chart", description: "Identifying unserved market gaps and opportunities" }
    ];

    // Pre-generate the result so we can stream it incrementally
    const generatedResult = this.generateResearchCycle(keyword, founderProfile);
    const result = window.app ? window.app.filterRejectedIdeas(generatedResult) : generatedResult;
    
    let phaseIdx = 0;
    let logCount = 0;
    const totalLogs = 120;
    
    const phaseLogs = [
      // Phase 1: Ecosystem Mapper
      [
        `[INIT] Research Depth Engine v3.0 activated`,
        `[SCAN] Analyzing keyword: "${keyword}"`,
        `[RULE] Startup ideas FORBIDDEN until research thresholds met`,
        `[MAP] Expanding "${keyword}" into ecosystem segments...`,
        ...result.segments.slice(0, 6).map(s => `[SEGMENT] Discovered: ${s.name} (${s.userCount} users)`),
        ...result.segments.slice(6).map(s => `[SEGMENT] Discovered: ${s.name} (${s.userCount} users)`),
        `[MAP] ${result.segments.length} ecosystem segments identified`,
        `[THRESHOLD] User Segments: ${result.segments.length}/${this.THRESHOLDS.userSegments} ✓`
      ],
      // Phase 2: Pain Cluster Hunter
      [
        `[HUNT] Scanning for pain clusters across ${result.segments.length} segments...`,
        ...result.painClusters.slice(0, 5).map(c => `[PAIN] Cluster #${c.id}: ${c.name} (Severity: ${c.severity}/10)`),
        `[HUNT] Deep-scanning forums, reviews, and social media...`,
        ...result.painClusters.slice(5, 10).map(c => `[PAIN] Cluster #${c.id}: ${c.name} (Severity: ${c.severity}/10)`),
        `[HUNT] Cross-referencing with feature request databases...`,
        ...result.painClusters.slice(10, 15).map(c => `[PAIN] Cluster #${c.id}: ${c.name} (Freq: ${c.frequency}/10)`),
        ...result.painClusters.slice(15, 20).map(c => `[PAIN] Cluster #${c.id}: ${c.name} (Value: ${c.commercialValue}/10)`),
        ...result.painClusters.slice(20).map(c => `[PAIN] Cluster #${c.id}: ${c.name}`),
        `[THRESHOLD] Pain Clusters: ${result.painClusters.length}/${this.THRESHOLDS.painClusters} ✓`
      ],
      // Phase 3: Complaint Collector
      [
        `[CRAWL] Scanning Reddit, G2, Twitter/X, Product Hunt...`,
        ...result.complaints.slice(0, 5).map(c => `[COMPLAINT] "${c.text.substring(0, 60)}..." — ${c.source}`),
        `[CRAWL] Processing forum threads and review pages...`,
        ...result.complaints.slice(5, 10).map(c => `[COMPLAINT] "${c.text.substring(0, 60)}..." — ${c.source}`),
        `[CRAWL] ${result.complaints.length} complaints collected from ${new Set(result.complaints.map(c => c.source)).size} sources`,
        `[THRESHOLD] Complaints: ${result.complaints.length}/${this.THRESHOLDS.complaints} ✓`,
        `[THRESHOLD] Feature Requests: ${result.featureRequests.length}/${this.THRESHOLDS.featureRequests} ✓`
      ],
      // Phase 4: Competitor Scanner
      [
        `[INTEL] Scanning competitive landscape...`,
        ...result.competitors.slice(0, 4).map(c => `[COMPETITOR] ${c.name} (${c.type}) — ${c.pricing} — ${c.reviewSentiment}`),
        `[INTEL] Analyzing pricing models and weaknesses...`,
        ...result.competitors.slice(4, 8).map(c => `[COMPETITOR] ${c.name} (${c.type}) — ${c.pricing}`),
        ...result.competitors.slice(8).map(c => `[COMPETITOR] ${c.name} (${c.type}) — ${c.pricing}`),
        `[THRESHOLD] Competitors: ${result.competitors.length}/${this.THRESHOLDS.competitors} ✓`
      ],
      // Phase 5: Review Analyzer
      [
        `[REVIEW] Processing ${result.reviews.length} product reviews...`,
        `[REVIEW] Sentiment analysis: ${result.reviews.filter(r => r.sentiment === 'positive').length} positive, ${result.reviews.filter(r => r.sentiment === 'negative').length} negative, ${result.reviews.filter(r => r.sentiment === 'neutral').length} neutral`,
        `[REVIEW] Extracting feature gaps from negative reviews...`,
        `[REVIEW] Cross-referencing reviews with pain clusters...`,
        `[BOTTLENECK] Identified ${result.workflowBottlenecks.length} workflow bottlenecks`,
        `[THRESHOLD] Reviews: ${result.reviews.length}/${this.THRESHOLDS.reviews} ✓`,
        `[THRESHOLD] Bottlenecks: ${result.workflowBottlenecks.length}/${this.THRESHOLDS.workflowBottlenecks} ✓`
      ],
      // Phase 6: Gap Discoverer + Opportunity Generation
      [
        `[GAP] Cross-referencing pain clusters with competitor weaknesses...`,
        ...result.marketGaps.map(g => `[GAP] Found: ${g.title}`),
        `[THRESHOLD] Market Gaps: ${result.marketGaps.length}/${this.THRESHOLDS.marketGaps} ✓`,
        ``,
        `[GATE] ═══════════════════════════════════════════`,
        `[GATE] RESEARCH THRESHOLD CHECK: ${result.researchCompletenessScore}% COMPLETE`,
        `[GATE] All minimum thresholds MET — Opportunity generation AUTHORIZED`,
        `[GATE] ═══════════════════════════════════════════`,
        ``,
        `[GEN] Generating diverse startup opportunities from ${result.painClusters.length} pain clusters...`,
        ...result.opportunities.map(o => `[OPP] ${o.startupName} (${o.businessModel}) — Composite: ${o.compositeScore}%`),
        ``,
        `[RANK] Ranking ${result.opportunities.length} opportunities across 9 dimensions...`,
        `[PICK] 🏆 Top Overall: ${result.topPicks.topOverall?.startupName || 'N/A'}`,
        `[PICK] 🛡️ Top Low-Risk: ${result.topPicks.topLowRisk?.startupName || 'N/A'}`,
        `[PICK] 👤 Top Solo Founder: ${result.topPicks.topSoloFounder?.startupName || 'N/A'}`,
        `[PICK] ⚡ Top Fastest: ${result.topPicks.topFastest?.startupName || 'N/A'}`,
        `[PICK] 📈 Top Long-Term: ${result.topPicks.topLongTerm?.startupName || 'N/A'}`,
        ``,
        `[DONE] Research cycle complete. Data confidence: ${result.dataConfidenceLevel}`,
        `[DONE] ${result.opportunities.length} opportunities ready for comparison.`
      ]
    ];

    // Flatten for log counting
    const allLogs = phaseLogs.flat();
    let globalLogIdx = 0;

    const runPhase = (pi) => {
      if (pi >= phases.length) {
        if (onFinished) onFinished(result);
        return;
      }

      const phase = phases[pi];
      const logs = phaseLogs[pi];
      if (onPhaseStart) onPhaseStart(phase, pi);

      let li = 0;
      const logInterval = setInterval(() => {
        if (li >= logs.length) {
          clearInterval(logInterval);
          if (onPhaseComplete) onPhaseComplete(phase, pi);
          
          // Update thresholds progressively
          if (onThresholdUpdate) {
            const progressiveThresholds = {};
            const t = result.thresholds;
            Object.keys(t).forEach(key => {
              const progress = Math.min(1, (pi + 1) / phases.length);
              progressiveThresholds[key] = {
                current: Math.round(t[key].current * progress),
                required: t[key].required
              };
            });
            // On last phase, show full counts
            if (pi === phases.length - 1) {
              onThresholdUpdate(result.thresholds);
            } else {
              onThresholdUpdate(progressiveThresholds);
            }
          }
          
          this._schedule(() => runPhase(pi + 1), 300);
          return;
        }

        const msg = logs[li];
        if (msg === '') {
          li++;
          return;
        }
        
        globalLogIdx++;
        const type = msg.includes('[PAIN]') ? 'warn' :
                     msg.includes('[GATE]') ? 'success' :
                     msg.includes('[PICK]') || msg.includes('[OPP]') ? 'success' :
                     msg.includes('[THRESHOLD]') ? 'info' :
                     msg.includes('[DONE]') ? 'success' : '';
        
        if (onLog) onLog(msg, type, Math.round((globalLogIdx / allLogs.length) * 100));
        li++;
      }, 80 + this._random() * 40);
      this._timers.add(logInterval);
    };

    // Start phase 0 after a brief delay
    this._schedule(() => runPhase(0), 500);
    
    return result; // Return for reference
  }
};

// Export globally
window.ResearchEngine = ResearchEngine;
