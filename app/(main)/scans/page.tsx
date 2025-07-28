"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { LinkIcon, X, Loader, Play, Clock, Mail } from "lucide-react"
import { useDemo } from "@/context/demo-context"
import { useToast } from "@/components/ui/use-toast"
import { mockApiPayloads } from "@/lib/demo-data"
import { formatDistanceToNow } from "date-fns"

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Compliant":
      return "bg-ace-green/20 text-ace-green border-ace-green/50"
    case "Issues Found":
      return "bg-ace-red/20 text-ace-red border-ace-red/50"
    default: // In Progress
      return "bg-ace-accent/20 text-ace-accent border-ace-accent/50"
  }
}

const ScanInitiatedBanner = ({ repoName }: { repoName: string }) => (
  <div className="sticky top-0 z-20 p-4 bg-ace-accent/20 border-b border-ace-accent/50 text-ace-accent text-sm font-medium">
    <div className="flex items-center gap-3">
      <Clock className="h-5 w-5" />
      <div className="flex-1">
        <div className="font-semibold">Deep Compliance Scan Initiated</div>
        <div className="text-xs opacity-90 mt-1">
          Scanning <span className="font-mono">{repoName}</span> • This can take up to 24 hours
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs opacity-90">
        <Mail className="h-4 w-4" />
        <span>You'll receive an email when complete</span>
      </div>
    </div>
  </div>
)

const ScanInProgressRow = ({ repoName }: { repoName: string }) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const scanDurationSeconds = 86400 // 24 hours = 24 * 60 * 60 seconds
    const intervalMilliseconds = 500 // Update twice a second for smoother progress
    const totalTicks = (scanDurationSeconds * 1000) / intervalMilliseconds

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        // More realistic, slightly randomized progress
        const increment = (100 / totalTicks) * (0.75 + Math.random() * 0.5)
        return Math.min(100, prev + increment)
      })
    }, intervalMilliseconds)
    return () => clearInterval(timer)
  }, [])

  return (
    <TableRow className="border-ace-border bg-ace-bg-primary/50">
      <TableCell className="font-medium">{repoName}</TableCell>
      <TableCell colSpan={3}>
        <div className="flex items-center gap-4">
          <Progress value={progress} className="w-full bg-ace-bg-surface" />
          <span className="text-sm text-ace-text-muted">{Math.round(progress)}%</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
          <X className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default function ScansPage() {
  const { repos, runScan } = useDemo()
  const { toast } = useToast()
  const [scanInitiated, setScanInitiated] = React.useState<string | null>(null)

  const scanHistory = repos
    .filter((repo) => repo.lastScan)
    .map((repo) => ({
      id: repo.name,
      repo: repo.name,
      timestamp: repo.lastScan!,
      status: repo.highRisk > 0 ? "Issues Found" : "Compliant",
      duration: "23:45:12", // Reflects a long scan
      diffHash: `${repo.name.substring(0, 3)}...`,
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const reposCurrentlyScanning = repos.filter((r) => r.isScanning)

  const handleRunScan = (repoName: string) => {
    const repoToScan = repos.find((r) => r.name === repoName)
    if (repoToScan && !repoToScan.isScanning) {
      runScan(repoToScan.name)
      setScanInitiated(repoName)
      
      // Auto-hide banner after 10 seconds
      setTimeout(() => {
        setScanInitiated(null)
      }, 10000)
      
      toast({
        title: "Deep Compliance Scan Initiated",
        description: `Scanning '${repoName}'. This can take up to 24 hours. You can safely navigate away.`,
        duration: 10000,
        className: "bg-ace-bg-surface border-ace-accent text-ace-text-default",
      })
    } else {
      toast({
        title: "Scan already in progress",
        description: `A scan is already running for '${repoName}'.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {scanInitiated && <ScanInitiatedBanner repoName={scanInitiated} />}
      <div>
        <h1>Compliance Scans</h1>
        <p className="text-ace-text-muted mt-2">
          Automated scanning for AI Act violations, GDPR compliance issues, and regulatory risk assessment
        </p>
      </div>

      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scan History</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-ace-accent text-white w-44">
                <Play className="mr-2 h-4 w-4" />
                Run New Scan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-ace-bg-primary border-ace-border">
              <DialogHeader>
                <DialogTitle>Run a New Scan</DialogTitle>
                <DialogDescription>Select a repository to start a deep compliance scan.</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4 max-h-[60vh] overflow-y-auto">
                {repos.map((repo) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between p-3 rounded-md border border-ace-border"
                  >
                    <div>
                      <p className="font-medium">{repo.name}</p>
                      <p className="text-xs text-ace-text-muted">
                        Last scan:{" "}
                        {repo.lastScan ? formatDistanceToNow(new Date(repo.lastScan), { addSuffix: true }) : "Never"}
                      </p>
                    </div>
                    <DialogClose asChild>
                      <Button
                        size="sm"
                        className="bg-ace-accent text-white w-20"
                        onClick={() => handleRunScan(repo.name)}
                        disabled={repo.isScanning}
                      >
                        {repo.isScanning ? <Loader className="h-4 w-4 animate-spin" /> : "Scan"}
                      </Button>
                    </DialogClose>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-ace-border hover:bg-ace-bg-surface">
                <TableHead>Repository</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reposCurrentlyScanning.map((repo) => (
                <ScanInProgressRow key={repo.name} repoName={repo.name} />
              ))}
              {scanHistory.map((log) => (
                <TableRow key={log.id} className="border-ace-border hover:bg-ace-bg-primary">
                  <TableCell className="font-medium">{log.repo}</TableCell>
                  <TableCell className="font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(log.status)}>{log.status}</Badge>
                  </TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-ace-bg-primary border-ace-border">
                        <DialogHeader>
                          <DialogTitle>Scan Diff</DialogTitle>
                          <DialogDescription>
                            Diff for scan at {new Date(log.timestamp).toLocaleString()}
                          </DialogDescription>
                        </DialogHeader>
                        <pre className="bg-ace-bg-surface p-4 rounded-md text-xs font-mono overflow-x-auto">
                          <code>{JSON.stringify(mockApiPayloads.weekly_diff, null, 2)}</code>
                        </pre>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
