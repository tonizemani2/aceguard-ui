// This file contains the initial state and the data for the demo repository.

export const initialRepoList = [
  { name: "aceguard/ai-compliance-scanner", branch: "main", lastScan: "2025-07-16T21:12:01Z", highRisk: 5, isScanning: false },
  { name: "aceguard/fintech-backend", branch: "develop", lastScan: "2025-07-17T02:09:11Z", highRisk: 9, isScanning: false },
  { name: "aceguard/data-pipeline", branch: "main", lastScan: "2025-06-28T10:30:00Z", highRisk: 0, isScanning: false },
]

export const initialFindings = [
  {
    id: "F-342",
    repo: "aceguard/fintech-backend",
    component: "user-model",
    path: "/src/auth/user_model.py",
    bucket: "High-Risk",
    severity: "High",
    status: "Open",
    evidence: {
      article: "Art 10(2)",
      filePath: "src/auth/user_model.py",
      violatingLine: 45,
      codeSnippet: [
        { line: 43, content: "class UserModel(BaseModel):" },
        { line: 44, content: "    # TODO: Add data validation and cleaning" },
        { line: 45, content: "    training_data = load_unverified_data()" },
        { line: 46, content: "    model.fit(training_data)" },
      ],
    },
  },
  {
    id: "F-343",
    repo: "aceguard/fintech-backend",
    component: "risk_matrix.py",
    path: "/src/compliance/",
    bucket: "High-Risk",
    severity: "High",
    status: "In Progress",
    evidence: {
      article: "Art 9",
      filePath: "src/compliance/risk_matrix.py",
      violatingLine: 12,
      codeSnippet: [
        { line: 10, content: "def calculate_risk():" },
        { line: 11, content: "    # FIXME: Risk matrix is not loaded from a versioned source" },
        { line: 12, content: "    risk_params = {'default_rate': 0.05}" },
        { line: 13, content: "    return calculate(risk_params)" },
      ],
    },
  },
]

export const initialGaps = {
  pending: [
    {
      id: "GAP-001",
      repo: "aceguard/fintech-backend",
      component: "loan-scorer",
      gap: "Missing risk_matrix.yaml (Art 9)",
      deadline: "2025-08-18",
      owner: "Kai Ito",
      status: "pending",
      nextSteps: "Create a versioned risk_matrix.yaml file with configurable risk parameters. Implement a configuration management system to load and validate risk parameters at runtime. Add audit logging for parameter changes.",
      implementation: "Consider using a configuration management library like Hydra or Pydantic for type-safe parameter validation. Store the risk matrix in a versioned configuration repository with change tracking.",
    },
  ],
  inProgress: [],
  completed: [],
}

export const highRiskTrend = [
  { week: "2025-05-05", count: 32 },
  { week: "2025-05-12", count: 31 },
  { week: "2025-05-19", count: 34 },
  { week: "2025-05-26", count: 28 },
  { week: "2025-06-02", count: 25 },
  { week: "2025-06-09", count: 26 },
  { week: "2025-06-16", count: 22 },
  { week: "2025-06-23", count: 20 },
  { week: "2025-06-30", count: 19 },
  { week: "2025-07-07", count: 18 },
  { week: "2025-07-14", count: 17 },
]

export const insuranceClaims = [
  { claimId: "CL-9", repo: "aceguard/fintech-backend", fineEUR: 2500000, status: "Open", submitted: "2025-07-15" },
  { claimId: "CL-8", repo: "aceguard/user-auth-service", fineEUR: 1200000, status: "Under Review", submitted: "2025-06-20" },
  { claimId: "CL-7", repo: "aceguard/data-pipeline", fineEUR: 500000, status: "Paid", submitted: "2025-05-10" },
]

// Data for the repository that will be "discovered" during the demo
export const demoRepo = {
  name: "aceguard/ecommerce-platform",
  branch: "main",
  lastScan: "",
  highRisk: 0,
  isScanning: false,
}

export const connectableRepos = [
  {
    name: "aceguard/ecommerce-platform",
    description: "Main customer-facing e-commerce application.",
    isConnectable: true,
  },
  {
    name: "aceguard/legacy-monolith",
    description: "Older monolithic system, scheduled for decommission.",
    isConnectable: true,
  },
  {
    name: "aceguard/internal-tools-api",
    description: "APIs for internal administrative tools.",
    isConnectable: true,
  },
  {
    name: "aceguard/mobile-app-backend",
    description: "Backend services for the iOS and Android apps.",
    isConnectable: true,
  },
]

export const demoRepoFindings = [
  {
    id: "F-401",
    repo: "aceguard/ecommerce-platform",
    component: "realtime_emotion_analysis.py",
    path: "/src/features/",
    bucket: "Prohibited",
    severity: "Critical",
    status: "Open",
    evidence: {
      article: "Art 5(1)(a)",
      filePath: "src/features/realtime_emotion_analysis.py",
      violatingLine: 112,
      codeSnippet: [
        { line: 110, content: "def analyze_customer_emotion(stream):" },
        { line: 111, content: "    # Use pre-trained model for emotion detection" },
        { line: 112, content: "    emotion = emotion_detection_model.predict(stream)" },
        { line: 113, content: "    if emotion in ['angry', 'sad']:" },
        { line: 114, content: "        trigger_retention_offer(stream.user_id)" },
      ],
    },
    analysis:
      "This system uses biometric data to infer a user's emotional state in real-time. The output of this analysis is then used to trigger a 'retention_offer', which constitutes manipulating a person's behavior. This is a direct violation of the ban on AI systems that deploy subliminal techniques to materially distort a person's behavior in a manner that causes or is likely to cause physical or psychological harm.",
    remediation:
      "This feature must be removed immediately and permanently from the codebase. All associated models, training data, and user-collected emotional state data must be securely and verifiably deleted. Alternative, non-invasive methods for customer retention that do not rely on prohibited AI practices should be explored.",
  },
  {
    id: "F-402",
    repo: "aceguard/ecommerce-platform",
    component: "user_profiling_engine.js",
    path: "/src/analytics/",
    bucket: "High-Risk",
    severity: "High",
    status: "Open",
    evidence: {
      article: "Art 10",
      filePath: "src/analytics/user_profiling_engine.js",
      violatingLine: 88,
      codeSnippet: [
        { line: 86, content: "const buildTrainingData = (users) => {" },
        { line: 87, content: "  // WARNING: Unbalanced dataset, potential for bias" },
        { line: 88, content: "  return users.map(u => ({ features: u.profile, label: u.purchaseCategory }));" },
        { line: 89, content: "};" },
      ],
    },
    analysis:
      "The user profiling engine is used to categorize customers, which likely influences marketing, pricing, or product recommendations. The code comment explicitly warns of an unbalanced dataset, which is a major compliance failure under Article 10. This article mandates that high-risk AI systems be trained on data that is relevant, representative, and free of errors and biases to the best extent possible. Using a known unbalanced dataset can lead to discriminatory outcomes.",
    remediation:
      "A comprehensive data governance and management process must be established. Before training, the dataset must be analyzed for biases and imbalances. Implement techniques such as oversampling underrepresented categories, undersampling overrepresented ones, or using synthetic data generation (e.g., SMOTE). The data selection and balancing process must be documented and auditable.",
  },
  {
    id: "F-403",
    repo: "aceguard/ecommerce-platform",
    component: "recommendation_model.py",
    path: "/src/ml/",
    bucket: "High-Risk",
    severity: "High",
    status: "Open",
    evidence: {
      article: "Art 10(1)",
      filePath: "src/ml/recommendation_model.py",
      violatingLine: 45,
      codeSnippet: [
        { line: 43, content: "def generate_recommendations(user_data):" },
        { line: 44, content: "    # No human oversight mechanism" },
        { line: 45, content: "    predictions = model.predict(user_data)" },
        { line: 46, content: "    return apply_business_rules(predictions)" },
      ],
    },
    analysis:
      "The recommendation system influences user purchasing decisions without any human oversight mechanism. High-risk AI systems under Article 10 require human oversight for decisions that significantly impact users.",
    remediation:
      "Implement a human review queue for high-value recommendations and add explainability features to show why recommendations are made.",
  },
  {
    id: "F-404",
    repo: "aceguard/ecommerce-platform",
    component: "fraud_detection.py",
    path: "/src/ml/",
    bucket: "High-Risk",
    severity: "High",
    status: "Open",
    evidence: {
      article: "Art 10(3)",
      filePath: "src/ml/fraud_detection.py",
      violatingLine: 67,
      codeSnippet: [
        { line: 65, content: "fraud_score = model.predict(transaction_features)" },
        { line: 66, content: "if fraud_score > threshold:" },
        { line: 67, content: "    block_transaction(user_id)  # No appeal process" },
        { line: 68, content: "    return {'status': 'blocked'}" },
      ],
    },
    analysis:
      "The fraud detection system blocks transactions without providing users an appeal mechanism. This violates Article 10 requirements for high-risk AI systems affecting user access to services.",
    remediation:
      "Implement a user appeal process and human review queue for fraud decisions with transparency about detection criteria.",
  },
  {
    id: "F-405",
    repo: "aceguard/ecommerce-platform",
    component: "chatbot_model.py",
    path: "/src/nlp/",
    bucket: "Limited",
    severity: "Medium",
    status: "Open",
    evidence: {
      article: "Art 52",
      filePath: "src/nlp/chatbot_model.py",
      violatingLine: 23,
      codeSnippet: [
        { line: 21, content: "def respond_to_user(message):" },
        { line: 22, content: "    response = chatbot_model.generate(message)" },
        { line: 23, content: "    return response  # No AI identification" },
        { line: 24, content: "}" },
      ],
    },
    analysis:
      "The chatbot lacks clear AI identification as required by Article 52 for limited-risk AI systems.",
    remediation:
      "Add clear AI identification to the chatbot interface and provide option to speak with human agent.",
  },
  {
    id: "F-406",
    repo: "aceguard/ecommerce-platform",
    component: "search_optimizer.py",
    path: "/src/search/",
    bucket: "Limited",
    severity: "Low",
    status: "Open",
    evidence: {
      article: "Art 52",
      filePath: "src/search/search_optimizer.py",
      violatingLine: 34,
      codeSnippet: [
        { line: 32, content: "def optimize_search_results(query):" },
        { line: 33, content: "    enhanced_query = nlp_model.enhance(query)" },
        { line: 34, content: "    return search_engine.query(enhanced_query)  # No disclosure" },
        { line: 35, content: "}" },
      ],
    },
    analysis:
      "The search optimization lacks transparency about AI enhancements as required by Article 52.",
    remediation:
      "Add disclosure about AI-enhanced search results and implement user preference settings.",
  },
]

export const demoRepoGaps = [
  {
    id: "GAP-005",
    repo: "aceguard/ecommerce-platform",
    component: "realtime_emotion_analysis.py",
    gap: "Discontinue prohibited AI practice (Art 5)",
    deadline: "2025-08-01",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Immediately remove the emotion analysis feature from production. Delete all collected biometric data and associated ML models. Implement alternative customer retention strategies that don't rely on prohibited AI practices.",
    implementation: "Use feature flags to disable the emotion analysis component. Implement data deletion scripts with audit trails. Consider A/B testing alternative retention methods like personalized recommendations based on purchase history.",
  },
  {
    id: "GAP-006",
    repo: "aceguard/ecommerce-platform",
    component: "user_profiling_engine.js",
    gap: "Implement data bias mitigation (Art 10)",
    deadline: "2025-09-15",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Analyze training dataset for demographic imbalances. Implement data balancing techniques and bias testing framework. Add fairness metrics monitoring to the ML pipeline.",
    implementation: "Use tools like Fairlearn or AIF360 for bias detection. Implement SMOTE or similar techniques for data balancing. Add fairness metrics to model evaluation pipeline.",
  },
  {
    id: "GAP-007",
    repo: "aceguard/ecommerce-platform",
    component: "recommendation_system",
    gap: "Add human oversight mechanism (Art 10)",
    deadline: "2025-10-01",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Implement human review queue for high-value recommendations. Add explainability features to show why recommendations are made. Create appeal process for users.",
    implementation: "Build a dashboard for human reviewers to approve/reject recommendations. Implement SHAP or LIME for model explainability. Add user feedback collection system.",
  },
  {
    id: "GAP-008",
    repo: "aceguard/ecommerce-platform",
    component: "fraud_detection",
    gap: "Implement appeal mechanism (Art 10)",
    deadline: "2025-09-30",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Create user appeal process for blocked transactions. Implement human review queue for fraud decisions. Add transparency about fraud detection criteria.",
    implementation: "Build appeal submission form in user interface. Create admin dashboard for reviewing appeals. Implement automated notifications for appeal status updates.",
  },
  {
    id: "GAP-009",
    repo: "aceguard/ecommerce-platform",
    component: "chatbot_support",
    gap: "Enhance AI transparency (Art 52)",
    deadline: "2025-11-15",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Add clear AI identification to chatbot interface. Provide option to speak with human agent. Implement transparency about AI capabilities and limitations.",
    implementation: "Add 'AI Assistant' badge to chatbot interface. Implement seamless handoff to human agents. Add disclosure about AI capabilities in terms of service.",
  },
  {
    id: "GAP-010",
    repo: "aceguard/ecommerce-platform",
    component: "search_optimization",
    gap: "Add AI enhancement disclosure (Art 52)",
    deadline: "2025-12-01",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Add disclosure about AI-enhanced search results. Implement toggle for users to opt out of AI enhancements. Add transparency about how search is optimized.",
    implementation: "Add small disclosure text below search results. Implement user preference settings for AI features. Create help page explaining AI search enhancements.",
  },
  {
    id: "GAP-011",
    repo: "aceguard/ecommerce-platform",
    component: "dynamic_pricing",
    gap: "Implement price change notifications (Art 10)",
    deadline: "2025-10-15",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Add notifications when prices change due to AI algorithms. Implement price change history tracking. Add transparency about pricing factors.",
    implementation: "Build notification system for price changes. Create price history visualization for users. Add explanatory text about pricing factors.",
  },
  {
    id: "GAP-012",
    repo: "aceguard/ecommerce-platform",
    component: "inventory_optimization",
    gap: "Add human oversight for stock decisions (Art 10)",
    deadline: "2025-11-01",
    owner: "Kai Ito",
    status: "pending",
    nextSteps: "Implement human approval for major inventory changes. Add explainability for inventory recommendations. Create audit trail for inventory decisions.",
    implementation: "Build approval workflow for inventory changes. Add SHAP explanations for inventory recommendations. Implement comprehensive logging for all inventory decisions.",
  }
]

// Added back from the old mock-data file
export const scanLogs = [
  {
    id: 1,
    repo: "fintech-backend",
    timestamp: "2025-07-18T01:12:42Z",
    status: "OK",
    duration: "00:11:32",
    diffHash: "2ae...",
  },
  {
    id: 2,
    repo: "openai/embedding",
    timestamp: "2025-07-17T14:01:10Z",
    status: "OK",
    duration: "00:10:58",
    diffHash: "f8c...",
  },
  {
    id: 3,
    repo: "data-science-pipeline",
    timestamp: "2025-07-17T02:09:11Z",
    status: "OK",
    duration: "00:02:15",
    diffHash: "d3a...",
  },
]

export const mockApiPayloads = {
  weekly_diff: {
    new_gaps: [{ id: "GAP-005", component: "new-feature", gap: "Missing DPIA (GDPR Art 35)" }],
    resolved_gaps: [{ id: "GAP-001", component: "loan-scorer" }],
  },
}
