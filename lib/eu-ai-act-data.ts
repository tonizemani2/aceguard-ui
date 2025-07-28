import { AlertTriangle, Ban, ShieldAlert, CheckCircle } from "lucide-react"

export const euAiActRiskTiers = {
  prohibited: {
    title: "Prohibited AI Practices",
    icon: Ban,
    description:
      "These AI systems are considered a clear threat to the safety, livelihoods, and rights of people and are banned under the EU AI Act.",
    fine: "Up to €35 million or 7% of the total worldwide annual turnover, whichever is higher.",
    recommendation:
      "Cease development and deployment of this feature immediately. All related data processing must be halted, and collected data should be securely deleted in accordance with data protection regulations.",
    color: "text-ace-red",
    bgColor: "bg-ace-red/10",
    borderColor: "border-ace-red/50",
  },
  high: {
    title: "High-Risk AI Systems",
    icon: AlertTriangle,
    description:
      "AI systems identified as high-risk are subject to strict obligations before they can be put on the market, including risk assessments, high-quality data sets, and human oversight.",
    fine: "Up to €15 million or 3% of the total worldwide annual turnover, whichever is higher.",
    recommendation:
      "Implement a comprehensive risk management system, ensure data governance and quality, provide clear information to users, and establish robust human oversight mechanisms.",
    color: "text-ace-amber",
    bgColor: "bg-ace-amber/10",
    borderColor: "border-ace-amber/50",
  },
  limited: {
    title: "Limited-Risk AI Systems",
    icon: ShieldAlert,
    description:
      "For AI systems with limited risk, such as chatbots, the Act imposes transparency obligations, ensuring users know they are interacting with a machine.",
    fine: "Fines for non-compliance with transparency obligations can apply.",
    recommendation:
      "Ensure all user-facing AI interactions are clearly labeled as such. Provide options for users to interact with a human agent where applicable.",
    color: "text-ace-accent",
    bgColor: "bg-ace-accent/10",
    borderColor: "border-ace-accent/50",
  },
  minimal: {
    title: "Minimal-Risk AI Systems",
    icon: CheckCircle,
    description:
      "The vast majority of AI systems fall into this category (e.g., spam filters, AI in video games). The Act does not impose obligations for these systems, but encourages voluntary codes of conduct.",
    fine: "No specific fines, but adherence to best practices is recommended to maintain user trust.",
    recommendation:
      "Continue monitoring for any change in risk classification and adhere to voluntary codes of conduct.",
    color: "text-ace-green",
    bgColor: "bg-ace-green/10",
    borderColor: "border-ace-green/50",
  },
}

export const complianceReportData = {
  repository: {
    name: "ecommerce-platform",
    description: "Main customer-facing e-commerce application with AI-powered features",
    lastScan: "2025-01-27T10:30:00Z",
    totalComponents: 24,
    aiComponents: 8,
  },
  complianceScore: {
    overall: 42, // Percentage
    breakdown: {
      prohibited: 0, // 0% is good for prohibited
      high: 35,
      limited: 78,
      minimal: 95,
    },
  },
  riskDistribution: {
    prohibited: 1,
    high: 3,
    limited: 2,
    minimal: 2,
  },
  complianceMetrics: {
    dataGovernance: {
      score: 45,
      status: "Critical",
      issues: ["Unbalanced training datasets", "Missing data validation", "Insufficient bias testing"],
    },
    transparency: {
      score: 60,
      status: "High Risk",
      issues: ["Incomplete user notifications", "Missing AI system labeling"],
    },
    humanOversight: {
      score: 30,
      status: "Critical",
      issues: ["No human review mechanisms", "Automated decision-making without oversight"],
    },
    riskManagement: {
      score: 25,
      status: "Critical",
      issues: ["Missing risk assessments", "No monitoring systems", "Inadequate documentation"],
    },
  },
  financialImpact: {
    potentialFines: {
      prohibited: 35000000, // €35M
      high: 15000000, // €15M
      total: 50000000, // €50M
    },
    complianceCosts: {
      immediate: 250000, // €250K
      annual: 500000, // €500K
    },
  },
  actionItems: [
    {
      id: "AI-001",
      priority: "Critical",
      title: "Discontinue Prohibited Emotion Analysis",
      description: "Remove real-time emotion analysis feature that violates Article 5(1)(a)",
      deadline: "2025-02-01",
      owner: "AI Team Lead",
      status: "Not Started",
      estimatedEffort: "2 weeks",
    },
    {
      id: "AI-002",
      priority: "High",
      title: "Implement Data Governance Framework",
      description: "Establish comprehensive data validation, bias testing, and quality controls",
      deadline: "2025-03-15",
      owner: "Data Science Team",
      status: "Not Started",
      estimatedEffort: "6 weeks",
    },
    {
      id: "AI-003",
      priority: "High",
      title: "Add Human Oversight Mechanisms",
      description: "Implement human review processes for all AI-driven decisions",
      deadline: "2025-04-01",
      owner: "Product Team",
      status: "Not Started",
      estimatedEffort: "4 weeks",
    },
    {
      id: "AI-004",
      priority: "Medium",
      title: "Enhance Transparency Notifications",
      description: "Add clear AI system labeling and user notifications",
      deadline: "2025-05-01",
      owner: "UX Team",
      status: "Not Started",
      estimatedEffort: "3 weeks",
    },
  ],
  timeline: {
    immediate: ["Discontinue prohibited practices", "Begin risk assessment"],
    shortTerm: ["Implement data governance", "Add human oversight"],
    mediumTerm: ["Complete compliance framework", "Conduct external audit"],
    longTerm: ["Maintain compliance monitoring", "Regular compliance reviews"],
  },
}
