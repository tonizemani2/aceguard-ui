export interface AceGuardReport {
  executiveSummary: string
  inventory: InventoryItem[]
  riskBucketJustification: RiskJustification[]
  gapAnalysis: GapAnalysis[]
  appendices: {
    unknownAmbiguous: UnknownItem[]
    searchLog: SearchLogEntry[]
    csvExport: CSVExportItem[]
  }
  metadata: {
    scanDate: string
    repository: string
    totalComponents: number
    scanDuration: string
    aiModel: string
  }
}

export interface InventoryItem {
  component: string
  paths: string[]
  lang: string
  personalData: 'Y' | 'N'
  riskBucket: 'Prohibited' | 'High-Risk' | 'Limited' | 'Minimal'
}

export interface RiskJustification {
  component: string
  article: string
  evidence: string
  reasonLowerBucketsRejected: string
}

export interface GapAnalysis {
  component: string
  gap: string
  severity: 'High' | 'Medium' | 'Low'
  fix: string
  deadline: string // ISO date string
}

export interface UnknownItem {
  component: string
  path: string
  reason: string
  recommendation: string
}

export interface SearchLogEntry {
  pattern: string
  matches: number
  context: string
}

export interface CSVExportItem {
  module: string
  riskLevel: string
  personalData: 'Y' | 'N'
  mitigation: string
  nextReview: string // ISO date string
}

// Sample data for the ecommerce-platform repository
export const sampleAceGuardReport: AceGuardReport = {
  executiveSummary: `EU AI Act compliance scan of aceguard/ecommerce-platform reveals CRITICAL violations requiring immediate action. 
  
  **Top Risk**: Prohibited AI practice detected in real-time emotion analysis (Art 5(1)(a)) - potential €35M fine. 
  
  **72h Actions Required**: 
  - Discontinue emotion analysis feature immediately
  - Halt all data processing for user profiling engine
  - Initiate data deletion procedures for collected biometric data
  
  **Financial Exposure**: €50M total potential fines (€35M prohibited + €15M high-risk violations). 
  
  **Compliance Score**: 42% - Critical risk level requiring immediate remediation. 
  
  **Key Findings**: 8 AI components identified, 1 prohibited practice, 3 high-risk systems, 4 limited-risk components. 
  
  **Immediate Priority**: Address prohibited emotion analysis within 72 hours to avoid regulatory action.`,
  
  inventory: [
    {
      component: "realtime_emotion_analysis",
      paths: ["src/features/realtime_emotion_analysis.py", "src/models/emotion_detection.py"],
      lang: "Python",
      personalData: "Y",
      riskBucket: "Prohibited"
    },
    {
      component: "user_profiling_engine",
      paths: ["src/analytics/user_profiling_engine.js", "src/models/user_classifier.py"],
      lang: "JavaScript/Python",
      personalData: "Y",
      riskBucket: "High-Risk"
    },
    {
      component: "recommendation_system",
      paths: ["src/recommendations/engine.py", "src/ml/recommendation_model.py"],
      lang: "Python",
      personalData: "Y",
      riskBucket: "High-Risk"
    },
    {
      component: "fraud_detection",
      paths: ["src/security/fraud_detection.py", "src/ml/fraud_model.pkl"],
      lang: "Python",
      personalData: "Y",
      riskBucket: "High-Risk"
    },
    {
      component: "chatbot_support",
      paths: ["src/support/chatbot.py", "src/nlp/chatbot_model.py"],
      lang: "Python",
      personalData: "N",
      riskBucket: "Limited"
    },
    {
      component: "search_optimization",
      paths: ["src/search/optimizer.py"],
      lang: "Python",
      personalData: "N",
      riskBucket: "Limited"
    },
    {
      component: "spam_filter",
      paths: ["src/security/spam_filter.py"],
      lang: "Python",
      personalData: "N",
      riskBucket: "Minimal"
    },
    {
      component: "image_compression",
      paths: ["src/utils/image_compression.py"],
      lang: "Python",
      personalData: "N",
      riskBucket: "Minimal"
    }
  ],
  
  riskBucketJustification: [
    {
      component: "realtime_emotion_analysis",
      article: "Art 5(1)(a)",
      evidence: "emotion_detection_model.predict(stream)\nif emotion in ['angry', 'sad']:\n    trigger_retention_offer(stream.user_id)",
      reasonLowerBucketsRejected: "Uses biometric data to manipulate behavior - clear prohibited practice under Art 5(1)(a)"
    },
    {
      component: "user_profiling_engine",
      article: "Art 10(2)",
      evidence: "return users.map(u => ({ features: u.profile, label: u.purchaseCategory }));\n// WARNING: Unbalanced dataset, potential for bias",
      reasonLowerBucketsRejected: "Influences user decisions with known biased data - high-risk under Art 10"
    },
    {
      component: "recommendation_system",
      article: "Art 10(1)",
      evidence: "def generate_recommendations(user_data):\n    predictions = model.predict(user_data)\n    return apply_business_rules(predictions)",
      reasonLowerBucketsRejected: "Influences user purchasing decisions with personal data - high-risk under Art 10"
    },
    {
      component: "fraud_detection",
      article: "Art 10(3)",
      evidence: "fraud_score = model.predict(transaction_features)\nif fraud_score > threshold:\n    block_transaction(user_id)",
      reasonLowerBucketsRejected: "Automated decision-making affecting user access to services - high-risk under Art 10"
    },
    {
      component: "chatbot_support",
      article: "Art 52",
      evidence: "def respond_to_user(message):\n    response = chatbot_model.generate(message)\n    return f'AI Assistant: {response}'",
      reasonLowerBucketsRejected: "User-facing AI system requiring transparency - limited risk under Art 52"
    },
    {
      component: "search_optimization",
      article: "Art 52",
      evidence: "def optimize_search_results(query):\n    enhanced_query = nlp_model.enhance(query)\n    return search_engine.query(enhanced_query)",
      reasonLowerBucketsRejected: "AI-enhanced search requiring transparency - limited risk under Art 52"
    },
    {
      component: "spam_filter",
      article: "Voluntary",
      evidence: "def classify_email(email_content):\n    return spam_model.predict(email_content) > 0.8",
      reasonLowerBucketsRejected: "Standard spam filtering - minimal risk, voluntary compliance recommended"
    },
    {
      component: "image_compression",
      article: "Voluntary",
      evidence: "def compress_image(image):\n    return compression_model.process(image)",
      reasonLowerBucketsRejected: "Utility function with no user impact - minimal risk, voluntary compliance recommended"
    }
  ],
  
  gapAnalysis: [
    {
      component: "realtime_emotion_analysis",
      gap: "Prohibited biometric behavior manipulation",
      severity: "High",
      fix: "Remove emotion analysis feature and delete all collected data",
      deadline: "2025-02-01"
    },
    {
      component: "user_profiling_engine",
      gap: "Unbalanced training dataset causing bias",
      severity: "High",
      fix: "Implement data balancing and bias testing framework",
      deadline: "2025-03-15"
    },
    {
      component: "recommendation_system",
      gap: "Missing human oversight for automated decisions",
      severity: "High",
      fix: "Add human review mechanism for high-value recommendations",
      deadline: "2025-04-01"
    },
    {
      component: "fraud_detection",
      gap: "No appeal mechanism for blocked transactions",
      severity: "Medium",
      fix: "Implement user appeal process and human review queue",
      deadline: "2025-04-15"
    },
    {
      component: "chatbot_support",
      gap: "Insufficient AI system labeling",
      severity: "Medium",
      fix: "Add clear AI identification and human agent option",
      deadline: "2025-05-01"
    },
    {
      component: "search_optimization",
      gap: "Missing transparency about AI enhancement",
      severity: "Low",
      fix: "Add disclosure about AI-enhanced search results",
      deadline: "2025-05-15"
    }
  ],
  
  appendices: {
    unknownAmbiguous: [
      {
        component: "mystery_ml_module",
        path: "src/legacy/ml_utils.py",
        reason: "Unclear purpose, no documentation, potential AI usage",
        recommendation: "Code review required to determine if AI system and risk classification"
      },
      {
        component: "data_processor",
        path: "src/data/processor.py",
        reason: "Complex data transformation logic, may involve ML",
        recommendation: "Static analysis needed to identify ML components"
      }
    ],
    searchLog: [
      {
        pattern: "torch",
        matches: 3,
        context: "PyTorch imports found in emotion analysis and recommendation modules"
      },
      {
        pattern: ".onnx",
        matches: 1,
        context: "ONNX model file in fraud detection component"
      },
      {
        pattern: "manual_override",
        matches: 0,
        context: "No manual override mechanisms found - compliance gap"
      },
      {
        pattern: "predict",
        matches: 8,
        context: "ML prediction calls across multiple components"
      },
      {
        pattern: "model.fit",
        matches: 2,
        context: "Model training code in profiling and recommendation engines"
      },
      {
        pattern: "personal_data",
        matches: 5,
        context: "Personal data processing identified in multiple components"
      }
    ],
    csvExport: [
      {
        module: "realtime_emotion_analysis",
        riskLevel: "Prohibited",
        personalData: "Y",
        mitigation: "Remove feature and delete data",
        nextReview: "2025-02-01"
      },
      {
        module: "user_profiling_engine",
        riskLevel: "High-Risk",
        personalData: "Y",
        mitigation: "Implement bias testing and data governance",
        nextReview: "2025-03-15"
      },
      {
        module: "recommendation_system",
        riskLevel: "High-Risk",
        personalData: "Y",
        mitigation: "Add human oversight and appeal mechanism",
        nextReview: "2025-04-01"
      },
      {
        module: "fraud_detection",
        riskLevel: "High-Risk",
        personalData: "Y",
        mitigation: "Implement appeal process and human review",
        nextReview: "2025-04-15"
      },
      {
        module: "chatbot_support",
        riskLevel: "Limited",
        personalData: "N",
        mitigation: "Add AI labeling and human agent option",
        nextReview: "2025-05-01"
      },
      {
        module: "search_optimization",
        riskLevel: "Limited",
        personalData: "N",
        mitigation: "Add transparency disclosure",
        nextReview: "2025-05-15"
      },
      {
        module: "spam_filter",
        riskLevel: "Minimal",
        personalData: "N",
        mitigation: "Voluntary compliance monitoring",
        nextReview: "2025-06-01"
      },
      {
        module: "image_compression",
        riskLevel: "Minimal",
        personalData: "N",
        mitigation: "Voluntary compliance monitoring",
        nextReview: "2025-06-01"
      }
    ]
  },
  
  metadata: {
    scanDate: "2025-01-27T10:30:00Z",
    repository: "aceguard/ecommerce-platform",
    totalComponents: 8,
    scanDuration: "00:15:32",
    aiModel: "AceGuard-Scan-v2.1"
  }
}

export const generateMarkdownReport = (report: AceGuardReport): string => {
  return `# AceGuard EU AI Act Compliance Report

## 1. EXECUTIVE SUMMARY

${report.executiveSummary}

## 2. INVENTORY TABLE

| component | path(s) | lang | personal_data(Y/N) | risk_bucket |
|-----------|---------|------|-------------------|-------------|
${report.inventory.map(item => 
  `| ${item.component} | ${item.paths.join(', ')} | ${item.lang} | ${item.personalData} | ${item.riskBucket} |`
).join('\n')}

## 3. RISK-BUCKET JUSTIFICATION

${report.riskBucketJustification.map(justification => 
  `- **${justification.component}**: ${justification.article} - \`\`\`\n${justification.evidence}\n\`\`\` - ${justification.reasonLowerBucketsRejected}`
).join('\n\n')}

## 4. GAP ANALYSIS & MITIGATION PLAN

${report.gapAnalysis.map(gap => 
  `- **${gap.component}**: ${gap.gap} (${gap.severity}) - ${gap.fix} - Deadline: ${new Date(gap.deadline).toLocaleDateString()}`
).join('\n')}

## 5. APPENDICES

### A. UNKNOWN / AMBIGUOUS

${report.appendices.unknownAmbiguous.map(item => 
  `- **${item.component}** (${item.path}): ${item.reason} - ${item.recommendation}`
).join('\n')}

### B. SEARCH LOG

${report.appendices.searchLog.map(log => 
  `- \`${log.pattern}\`: ${log.matches} matches - ${log.context}`
).join('\n')}

### C. Ready-to-paste CSV

\`\`\`csv
module,risk_level,personal_data,mitigation,next_review
${report.appendices.csvExport.map(item => 
  `${item.module},${item.riskLevel},${item.personalData},${item.mitigation},${item.nextReview}`
).join('\n')}
\`\`\`

---
*Report generated by ${report.metadata.aiModel} on ${new Date(report.metadata.scanDate).toLocaleString()}*
*Scan duration: ${report.metadata.scanDuration}*
`
} 