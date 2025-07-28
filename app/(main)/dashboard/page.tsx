"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GitFork,
  ShieldCheck,
  ClipboardCheck,
  Scan,
  UserCheck,
  AlertTriangle,
  ShieldAlert,
  FileText,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useDemo } from "@/context/demo-context"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"

const formatFineExposure = (amount: number) => {
  if (amount < 100000) {
    return `€${(amount / 1000).toFixed(0)}k`
  }
  return `€${(amount / 1000000).toFixed(1)}M`
}

const getPaddedChartData = (data: any[]) => {
  const paddedData = [...data]
  while (paddedData.length < 12) {
    const lastDate = new Date(paddedData[paddedData.length - 1].week)
    lastDate.setDate(lastDate.getDate() + 7)
    paddedData.push({ week: lastDate.toISOString().split("T")[0], count: 0 })
  }
  return paddedData
    .slice(-12)
    .map((d) => ({ ...d, name: new Date(d.week).toLocaleDateString("en-US", { month: "short", day: "numeric" }) }))
}

const OnboardingWizard = () => {
  const { addRepo } = useDemo()
  const { toast } = useToast()

  const handleAddRepo = () => {
    addRepo()
    toast({
      title: "Repository Connected",
      description: "The 'ecommerce-platform' is now ready to be scanned.",
      className: "bg-ace-bg-surface border-ace-accent text-ace-text-default",
    })
  }

  return (
    <Card className="bg-ace-bg-surface border-ace-border border-l-4 border-l-ace-accent animate-fade-in">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="font-semibold">Welcome to AceGuard!</h3>
          <p className="text-ace-text-muted text-sm">
            Your dashboard is ready. Connect your first repository to begin your compliance scan.
          </p>
        </div>
        <Button onClick={handleAddRepo} className="bg-ace-accent text-white flex-shrink-0">
          <GitFork className="mr-2 h-4 w-4" /> Add Repository
        </Button>
      </CardContent>
    </Card>
  )
}

const CompliancePosture = ({ repos }: { repos: any[] }) => {
  const posture = React.useMemo(() => {
    const total = repos.length
    if (total === 0) return { compliant: 0, highRisk: 0, unscanned: 0, total: 0 }
    const compliant = repos.filter((r) => r.highRisk === 0 && r.lastScan).length
    const highRisk = repos.filter((r) => r.highRisk > 0).length
    const unscanned = repos.filter((r) => !r.lastScan).length
    return { compliant, highRisk, unscanned, total }
  }, [repos])

  const data = [
    { name: "Compliant", value: posture.compliant, color: "#10B981" },
    { name: "High Risk", value: posture.highRisk, color: "#EF4444" },
    { name: "Unscanned", value: posture.unscanned, color: "#A6A6A6" },
  ].filter((d) => d.value > 0)

  return (
    <Card className="bg-ace-bg-surface border-ace-border">
      <CardHeader>
        <CardTitle>Compliance Posture</CardTitle>
      </CardHeader>
      <CardContent className="h-[260px] w-full p-4 flex flex-col justify-between">
        <div className="h-[160px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B0B0B",
                  border: "1px solid #2A2A2A",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-ace-text-default">{posture.total}</span>
            <span className="text-sm text-ace-text-muted">Repos</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-ace-text-muted">{item.name}:</span>
              <span className="font-semibold text-ace-text-default">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  href,
  colorClass,
}: {
  title: string
  value: string | number
  icon: React.ElementType
  href?: string
  colorClass?: string
}) => {
  const cardContent = (
    <Card
      className={cn(
        "bg-ace-bg-surface border-ace-border",
        href && "transition-all hover:border-ace-accent/50 hover:-translate-y-1",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-ace-text-muted">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-ace-text-muted", colorClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", colorClass)}>{value}</div>
      </CardContent>
    </Card>
  )

  return href ? <Link href={href}>{cardContent}</Link> : cardContent
}

export default function DashboardPage() {
  const { findings, repos, trendData, gaps, claims } = useDemo()
  const paddedChartData = getPaddedChartData(trendData)

  const metrics = React.useMemo(() => {
    const highRiskOpen = findings.filter(
      (f) => (f.severity === "High" || f.severity === "Critical") && f.status === "Open",
    ).length
    const lastScanDate = repos.reduce(
      (latest, repo) => {
        if (!repo.lastScan) return latest
        const repoDate = new Date(repo.lastScan)
        return latest === null || repoDate > latest ? repoDate : latest
      },
      null as Date | null,
    )
    const openGaps = gaps.pending.length + gaps.inProgress.length
    const claimsInReview = claims.filter((c) => c.status === "Under Review" || c.status === "Open").length

    return {
      highRiskOpen,
      openGaps,
      monitoredRepos: repos.length,
      claimsInReview,
      fineExposureEUR: 12500000 + highRiskOpen * 500000,
      lastScan: lastScanDate ? formatDistanceToNow(lastScanDate, { addSuffix: true }) : "—",
    }
  }, [findings, repos, gaps, claims])

  if (repos.length === 0) {
    return <OnboardingWizard />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Compliance Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Open High-Risk Findings"
          value={metrics.highRiskOpen}
          icon={AlertTriangle}
          href="/findings"
          colorClass="text-ace-red"
        />
        <MetricCard
          title="Open Compliance Gaps"
          value={metrics.openGaps}
          icon={ClipboardCheck}
          href="/gaps"
          colorClass="text-ace-amber"
        />
        <MetricCard title="Fine Exposure" value={formatFineExposure(metrics.fineExposureEUR)} icon={FileText} />
        <MetricCard title="Repositories Monitored" value={metrics.monitoredRepos} icon={GitFork} href="/repositories" />
        <MetricCard
          title="Claims in Review"
          value={metrics.claimsInReview}
          icon={ShieldAlert}
          href="/claims"
          colorClass="text-ace-accent"
        />
        <MetricCard title="Last Scan" value={metrics.lastScan} icon={Scan} href="/scans" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-ace-bg-surface border-ace-border">
          <CardHeader>
            <CardTitle>High-Risk Findings Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px] w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paddedChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="name" stroke="#A6A6A6" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A6A6A6" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B0B0B",
                    border: "1px solid #2A2A2A",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "#F1F1F1" }}
                />
                <Line type="monotone" dataKey="count" stroke="#3D8BF7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <CompliancePosture repos={repos} />
      </div>

      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] overflow-y-auto pr-2">
          <div className="space-y-4">
            {[
              { icon: Scan, text: "Scan completed on 'customer-portal-frontend'", time: "15m ago" },
              { icon: UserCheck, text: "Kai Ito approved override for FIND-005", time: "3h ago" },
              { icon: ShieldCheck, text: "Claim #CL-9 paid out", time: "8h ago" },
              { icon: ClipboardCheck, text: "Remediation sprint 'Q3-High-Risk' created", time: "1d ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <item.icon className="h-4 w-4 mt-1 text-ace-text-muted flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-ace-text-default">{item.text}</p>
                  <p className="text-xs text-ace-text-muted">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
