import { complianceReportData, euAiActRiskTiers } from './eu-ai-act-data'

export interface PDFExportOptions {
  includeExecutiveSummary?: boolean
  includeDetailedFindings?: boolean
  includeActionItems?: boolean
  includeFinancialImpact?: boolean
  includeTimeline?: boolean
}

export const generateComplianceReport = (options: PDFExportOptions = {}) => {
  const {
    includeExecutiveSummary = true,
    includeDetailedFindings = true,
    includeActionItems = true,
    includeFinancialImpact = true,
    includeTimeline = true,
  } = options

  const report = {
    title: "EU AI Act Compliance Report",
    repository: complianceReportData.repository,
    generatedAt: new Date().toISOString(),
    complianceScore: complianceReportData.complianceScore,
    riskDistribution: complianceReportData.riskDistribution,
    sections: [] as any[],
  }

  if (includeExecutiveSummary) {
    report.sections.push({
      type: 'executive_summary',
      title: 'Executive Summary',
      content: {
        overallScore: complianceReportData.complianceScore.overall,
        riskLevel: complianceReportData.complianceScore.overall < 50 ? 'Critical' : 
                  complianceReportData.complianceScore.overall < 70 ? 'High Risk' : 'Moderate Risk',
        totalFindings: Object.values(complianceReportData.riskDistribution).reduce((a, b) => a + b, 0),
        prohibitedFindings: complianceReportData.riskDistribution.prohibited,
        highRiskFindings: complianceReportData.riskDistribution.high,
        potentialFines: complianceReportData.financialImpact.potentialFines.total,
        immediateActions: complianceReportData.actionItems.filter(item => item.priority === 'Critical').length,
      }
    })
  }

  if (includeDetailedFindings) {
    report.sections.push({
      type: 'compliance_metrics',
      title: 'Compliance Metrics',
      content: complianceReportData.complianceMetrics,
    })
  }

  if (includeFinancialImpact) {
    report.sections.push({
      type: 'financial_impact',
      title: 'Financial Impact Analysis',
      content: complianceReportData.financialImpact,
    })
  }

  if (includeActionItems) {
    report.sections.push({
      type: 'action_items',
      title: 'Action Items & Recommendations',
      content: complianceReportData.actionItems,
    })
  }

  if (includeTimeline) {
    report.sections.push({
      type: 'timeline',
      title: 'Compliance Roadmap',
      content: complianceReportData.timeline,
    })
  }

  return report
}

export const downloadPDF = async (reportData: any) => {
  // In a real implementation, this would use a library like jsPDF or react-pdf
  // For demo purposes, we'll simulate the PDF generation process
  
  const blob = new Blob([
    JSON.stringify(reportData, null, 2)
  ], { type: 'application/pdf' })
  
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `eu-ai-act-compliance-report-${reportData.repository.name}-${new Date().toISOString().split('T')[0]}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const getRiskLevelColor = (score: number) => {
  if (score < 30) return 'text-ace-red'
  if (score < 50) return 'text-ace-amber'
  if (score < 70) return 'text-ace-accent'
  return 'text-ace-green'
}

export const getRiskLevelText = (score: number) => {
  if (score < 30) return 'Critical'
  if (score < 50) return 'High Risk'
  if (score < 70) return 'Moderate Risk'
  return 'Low Risk'
} 