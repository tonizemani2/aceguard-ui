"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Clock, Github, Loader, ChevronRight, Folder, File, Mail } from "lucide-react"
import { useDemo } from "@/context/demo-context"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { connectableRepos } from "@/lib/demo-data"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const isScanOld = (scanDate: string | null) => {
  if (!scanDate) return false
  const fourteenDaysAgo = new Date()
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
  return new Date(scanDate) < fourteenDaysAgo
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

const FileTreePlaceholder = () => (
  <div className="p-4 bg-ace-bg-primary text-sm font-mono">
    <ul className="space-y-1">
      <li className="flex items-center gap-2">
        <Folder className="h-4 w-4 text-ace-accent" />
        <span>src</span>
      </li>
      <ul className="pl-6 space-y-1">
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>analytics</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>user_profiling_engine.js</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>customer_segmentation.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>purchase_prediction.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>behavior_tracking.js</span>
          </li>
        </ul>
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>features</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>realtime_emotion_analysis.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>product_recommendations.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>dynamic_pricing.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>inventory_optimization.py</span>
          </li>
        </ul>
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>ml</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>recommendation_model.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>fraud_detection.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>sentiment_analysis.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>demand_forecasting.py</span>
          </li>
        </ul>
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>api</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>product_api.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>user_api.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>order_api.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>payment_api.py</span>
          </li>
        </ul>
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>database</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>models.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>migrations/</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>queries.py</span>
          </li>
        </ul>
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>frontend</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>components/</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>pages/</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>utils/</span>
          </li>
        </ul>
        <li className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-ace-accent" />
          <span>tests</span>
        </li>
        <ul className="pl-6 space-y-1">
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>test_ml_models.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>test_api_endpoints.py</span>
          </li>
          <li className="flex items-center gap-2">
            <File className="h-4 w-4 text-ace-text-muted" />
            <span>test_integration.py</span>
          </li>
        </ul>
      </ul>
      <li className="flex items-center gap-2">
        <Folder className="h-4 w-4 text-ace-accent" />
        <span>config</span>
      </li>
      <ul className="pl-6 space-y-1">
        <li className="flex items-center gap-2">
          <File className="h-4 w-4 text-ace-text-muted" />
          <span>settings.py</span>
        </li>
        <li className="flex items-center gap-2">
          <File className="h-4 w-4 text-ace-text-muted" />
          <span>database.py</span>
        </li>
        <li className="flex items-center gap-2">
          <File className="h-4 w-4 text-ace-text-muted" />
          <span>logging.py</span>
        </li>
      </ul>
      <li className="flex items-center gap-2">
        <Folder className="h-4 w-4 text-ace-accent" />
        <span>deployment</span>
      </li>
      <ul className="pl-6 space-y-1">
        <li className="flex items-center gap-2">
          <File className="h-4 w-4 text-ace-text-muted" />
          <span>Dockerfile</span>
        </li>
        <li className="flex items-center gap-2">
          <File className="h-4 w-4 text-ace-text-muted" />
          <span>docker-compose.yml</span>
        </li>
        <li className="flex items-center gap-2">
          <File className="h-4 w-4 text-ace-text-muted" />
          <span>kubernetes/</span>
        </li>
      </ul>
      <li className="flex items-center gap-2">
        <File className="h-4 w-4 text-ace-text-muted" />
        <span>package.json</span>
      </li>
      <li className="flex items-center gap-2">
        <File className="h-4 w-4 text-ace-text-muted" />
        <span>requirements.txt</span>
      </li>
      <li className="flex items-center gap-2">
        <File className="h-4 w-4 text-ace-text-muted" />
        <span>README.md</span>
      </li>
      <li className="flex items-center gap-2">
        <File className="h-4 w-4 text-ace-text-muted" />
        <span>.env.example</span>
      </li>
      <li className="flex items-center gap-2">
        <File className="h-4 w-4 text-ace-text-muted" />
        <span>.gitignore</span>
      </li>
    </ul>
  </div>
)

export default function RepositoriesPage() {
  const { repos, addRepo, isAddingRepo, runScan } = useDemo()
  const { toast } = useToast()
  const [isLoadingRepos, setIsLoadingRepos] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [expandedRepo, setExpandedRepo] = React.useState<string | null>(null)
  const [scanInitiated, setScanInitiated] = React.useState<string | null>(null)

  const handleAddRepo = (repoName: string) => {
    if (repoName === "aceguard/ecommerce-platform") {
      if (repos.some((r) => r.name === repoName) || isAddingRepo) {
        toast({
          title: "In Progress",
          description: "Repository is already connected or being connected.",
          className: "bg-ace-bg-surface border-ace-border text-ace-text-default",
        })
        return
      }
      addRepo()
      toast({
        title: "Connecting Repository...",
        description: `Setting up '${repoName}'. This may take a moment.`,
        className: "bg-ace-bg-surface border-ace-accent text-ace-text-default",
      })
      setIsDialogOpen(false)
    } else {
      toast({
        title: "Connection Unavailable",
        description: `Connecting '${repoName}' is not available in this version.`,
        variant: "destructive",
      })
    }
  }

  const onDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (open) {
      setIsLoadingRepos(true)
      setTimeout(() => {
        setIsLoadingRepos(false)
      }, 1500) // Simulate API call
    }
  }

  const handleRunScan = (repoName: string) => {
    const repo = repos.find((r) => r.name === repoName)
    if (repo && repo.isScanning) {
      toast({
        title: "Scan already in progress",
        description: `A scan is already running for '${repoName}'.`,
      })
      return
    }
    runScan(repoName)
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
  }

  return (
    <div className="space-y-6">
      {scanInitiated && <ScanInitiatedBanner repoName={scanInitiated} />}
      <div className="flex items-center justify-between">
        <h1>Repositories</h1>
        <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-ace-accent text-white">Add Repository</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-ace-bg-primary border-ace-border">
            <DialogHeader>
              <DialogTitle>Connect a Repository</DialogTitle>
              <DialogDescription>Select a repository to connect to AceGuard.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
              {isLoadingRepos ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md border border-ace-border">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-48 bg-ace-bg-surface" />
                        <Skeleton className="h-4 w-64 bg-ace-bg-surface" />
                      </div>
                      <Skeleton className="h-9 w-20 bg-ace-bg-surface" />
                    </div>
                  ))}
                </div>
              ) : (
                connectableRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between p-3 rounded-md border border-ace-border"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-ace-text-muted" />
                        <p className="font-medium">{repo.name}</p>
                      </div>
                      <p className="text-xs text-ace-text-muted ml-6">{repo.description}</p>
                    </div>
                    <Button onClick={() => handleAddRepo(repo.name)} size="sm" className="bg-ace-accent text-white">
                      Connect
                    </Button>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="bg-ace-bg-surface border-ace-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-ace-border hover:bg-ace-bg-surface">
                <TableHead scope="col" className="w-[50px]"></TableHead>
                <TableHead scope="col">Repo</TableHead>
                <TableHead scope="col">Last Scan</TableHead>
                <TableHead scope="col">High-Risk Count</TableHead>
                <TableHead scope="col" className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isAddingRepo && (
                <TableRow className="border-ace-border bg-ace-bg-primary/50 animate-pulse">
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>aceguard/ecommerce-platform</span>
                    </div>
                  </TableCell>
                  <TableCell>Connecting...</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-ace-bg-surface border-ace-border">
                      --
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
              {repos.map((repo) => (
                <React.Fragment key={repo.name}>
                  <TableRow className="border-ace-border hover:bg-ace-bg-primary">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setExpandedRepo(expandedRepo === repo.name ? null : repo.name)}
                      >
                        <ChevronRight
                          className={cn("h-4 w-4 transition-transform", expandedRepo === repo.name && "rotate-90")}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/repositories/${repo.name}`} className="hover:text-ace-accent transition-colors">
                        {repo.name}
                      </Link>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {isScanOld(repo.lastScan) && <Clock className="h-4 w-4 text-ace-amber" />}
                      {repo.lastScan
                        ? formatDistanceToNow(new Date(repo.lastScan), { addSuffix: true })
                        : "Not Scanned"}
                    </TableCell>
                    <TableCell>
                      {repo.lastScan ? (
                        <Badge
                          variant={repo.highRisk > 0 ? "destructive" : "default"}
                          className={
                            repo.highRisk > 0
                              ? "bg-ace-red/20 text-ace-red border-ace-red/50"
                              : "bg-ace-green/20 text-ace-green border-ace-green/50"
                          }
                        >
                          {repo.highRisk}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-ace-bg-surface border-ace-border">
                          --
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-ace-bg-surface border-ace-border">
                          <DropdownMenuItem onClick={() => handleRunScan(repo.name)} disabled={repo.isScanning}>
                            {repo.isScanning ? "Scan in progress" : "Run Scan"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-ace-border" />
                          <DropdownMenuItem className="text-ace-red focus:bg-ace-red/10 focus:text-ace-red">
                            Disconnect
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedRepo === repo.name && (
                    <TableRow className="bg-ace-bg-primary/30">
                      <TableCell colSpan={5}>
                        <FileTreePlaceholder />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
