"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sampleAceGuardReport, generateMarkdownReport } from "@/lib/aceguard-report-format"
import { FileText, Download, Euro, AlertTriangle, CheckCircle, Clock, XCircle, TrendingUp, Users, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const AceGuardReportView = ({ report }: { report: any }) => {
  const { toast } = useToast()

  const handleDownloadMarkdown = async () => {
    try {
      const markdownReport = generateMarkdownReport(sampleAceGuardReport)
      const blob = new Blob([markdownReport], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `AceGuard_Report_${sampleAceGuardReport.metadata.repository}_${new Date().toISOString().split('T')[0]}.md`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Markdown Report Downloaded",
        description: "Your AceGuard report has been saved as Markdown.",
        className: "bg-ace-green/10 border-ace-green text-ace-green",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating the Markdown report.",
        variant: "destructive",
      })
    }
  }

  const downloadCSV = () => {
    const csvContent = `module,risk_level,personal_data,mitigation,next_review\n${report.appendices.csvExport.map((item: any) =>
      `${item.module},${item.riskLevel},${item.personalData},${item.mitigation},${item.nextReview}`
    ).join('\n')}`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `aceguard_mitigation_plan_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "CSV Downloaded",
      description: "Mitigation plan CSV has been saved.",
      className: "bg-ace-green/10 border-ace-green text-ace-green",
    })
  }

  // Calculate summary statistics
  const totalFindings = report.inventory.length
  const prohibitedCount = report.inventory.filter((item: any) => item.riskBucket === 'Prohibited').length
  const highRiskCount = report.inventory.filter((item: any) => item.riskBucket === 'High-Risk').length
  const criticalGaps = report.gapAnalysis.filter((gap: any) => gap.severity === 'High').length

  return (
    <div className="space-y-6">
      {/* Executive Summary & Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Exposure */}
        <Card className="bg-ace-red/10 border-ace-red/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-ace-red text-lg">
              <Euro className="h-5 w-5" />
              Financial Exposure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ace-red mb-2">€35,000,000</p>
            <p className="text-sm text-ace-text-muted">
              Potential fines from prohibited and high-risk violations
            </p>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="bg-ace-bg-surface border-ace-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5" />
              Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Prohibited</span>
                <Badge variant="destructive">{prohibitedCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">High-Risk</span>
                <Badge variant="secondary">{highRiskCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Findings</span>
                <Badge variant="outline">{totalFindings}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Actions */}
        <Card className="bg-ace-bg-surface border-ace-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Critical Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ace-amber mb-2">{criticalGaps}</p>
            <p className="text-sm text-ace-text-muted">
              High-priority gaps requiring immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Problems & Solutions */}
      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader>
          <CardTitle className="text-xl">Critical Compliance Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {report.gapAnalysis.slice(0, 5).map((gap: any, index: number) => {
              // Find the corresponding EU AI Act citation
              const citation = report.riskBucketJustification.find((justification: any) => 
                justification.component === gap.component
              )
              
              return (
                <div key={index} className="border border-ace-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        gap.severity === 'High' ? 'destructive' :
                        gap.severity === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {gap.severity}
                      </Badge>
                      <h3 className="font-semibold">{gap.component}</h3>
                      {citation && (
                        <Badge variant="outline" className="text-xs font-mono bg-ace-bg-primary">
                          {citation.article}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-ace-text-muted">
                      Due: {new Date(gap.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* What's the problem */}
                    <div>
                      <h4 className="font-medium text-ace-red mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        What's the problem?
                      </h4>
                      <p className="text-sm text-ace-text-muted">{gap.gap}</p>
                      {citation && (
                        <div className="mt-2 p-2 bg-ace-red/10 border border-ace-red/20 rounded text-xs">
                          <p className="font-medium text-ace-red mb-1">EU AI Act Violation: {citation.article}</p>
                          <p className="text-ace-text-muted">{citation.reasonLowerBucketsRejected}</p>
                        </div>
                      )}
                    </div>

                    {/* How to fix it */}
                    <div>
                      <h4 className="font-medium text-ace-green mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        How to fix it
                      </h4>
                      <p className="text-sm text-ace-text-muted">{gap.fix}</p>
                    </div>
                  </div>

                  {/* Why it matters */}
                  <div className="mt-4 p-3 bg-ace-bg-primary rounded border-l-4 border-ace-accent">
                    <h4 className="font-medium text-ace-accent mb-1">Why this matters</h4>
                    <p className="text-sm text-ace-text-muted">
                      {gap.severity === 'High' ? 
                        'This is a critical compliance violation that could result in significant fines and legal action.' :
                        gap.severity === 'Medium' ? 
                        'This compliance gap needs attention to avoid potential regulatory issues.' :
                        'This should be addressed to maintain best practices and avoid future complications.'
                      }
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleDownloadMarkdown}>
              <FileText className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
            <Button variant="outline" onClick={downloadCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export Action Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Inventory (Collapsible) */}
      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader>
          <CardTitle className="text-xl">Detailed Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ace-border">
                  <th className="text-left p-2 font-semibold">Component</th>
                  <th className="text-left p-2 font-semibold">Risk Level</th>
                  <th className="text-left p-2 font-semibold">Personal Data</th>
                  <th className="text-left p-2 font-semibold">Review Status</th>
                </tr>
              </thead>
              <tbody>
                {report.inventory.slice(0, 10).map((item: any, index: number) => (
                  <tr key={index} className="border-b border-ace-border/50">
                    <td className="p-2 font-medium">{item.component}</td>
                    <td className="p-2">
                      <Badge variant={
                        item.riskBucket === 'Prohibited' ? 'destructive' :
                        item.riskBucket === 'High-Risk' ? 'secondary' : 'outline'
                      }>
                        {item.riskBucket}
                      </Badge>
                    </td>
                    <td className="p-2">{item.personalData}</td>
                    <td className="p-2">
                      {index % 3 === 0 ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-ace-green" />
                          <span className="text-xs text-ace-green">Reviewed</span>
                        </div>
                      ) : index % 3 === 1 ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-ace-amber" />
                          <span className="text-xs text-ace-amber">Pending</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-ace-red" />
                          <span className="text-xs text-ace-red">Failed</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ReportsPage() {
  const { toast } = useToast()

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">AceGuard AI Scan Report</h1>
            <p className="text-ace-text-muted mt-2">
              EU AI Act Compliance Analysis for <span className="font-semibold text-ace-text-default">{sampleAceGuardReport.metadata.repository}</span>
            </p>
          </div>
        </div>
      </header>

      <AceGuardReportView report={sampleAceGuardReport} />
    </div>
  )
}
