"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useDemo } from "@/context/demo-context"
import { Play, Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function RepositoryDetailPage({ params }: { params: { id: string } }) {
  const { getRepo, runScan, findings } = useDemo()
  const { toast } = useToast()
  const repo = getRepo(params.id)
  const repoFindings = findings.filter((f) => f.repo === params.id)

  const handleScan = () => {
    if (repo && !repo.isScanning) {
      runScan(params.id)
      toast({
        title: "Deep Compliance Scan Initiated",
        description: `Scanning '${params.id}'. This can take up to 19 hours. You can safely navigate away.`,
        duration: 10000,
        className: "bg-ace-bg-surface border-ace-accent text-ace-text-default",
      })
    }
  }

  if (!repo) {
    return <div>Repository not found.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/repositories">Repositories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{params.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={handleScan} disabled={repo.isScanning} className="bg-ace-accent text-white w-40">
          {repo.isScanning ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
          {repo.isScanning ? "Scanning..." : "Run Scan"}
        </Button>
      </div>

      {repo.isScanning && (
        <Card className="bg-ace-bg-surface border-ace-border">
          <CardContent className="p-6">
            <p className="text-center text-ace-text-muted mb-2">Scan in progress...</p>
            <Progress value={50} className="w-full bg-ace-bg-surface" />
          </CardContent>
        </Card>
      )}

      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader>
          <CardTitle>Findings</CardTitle>
        </CardHeader>
        <CardContent>
          {repoFindings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-ace-border">
                  <TableHead>ID</TableHead>
                  <TableHead>Component</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repoFindings.map((f) => (
                  <TableRow key={f.id} className="border-ace-border">
                    <TableCell>{f.id}</TableCell>
                    <TableCell>{f.component}</TableCell>
                    <TableCell>
                      <Badge
                        variant="destructive"
                        className={
                          f.severity === "Critical"
                            ? "bg-ace-red/20 text-ace-red border-ace-red/50"
                            : "bg-ace-amber/20 text-ace-amber border-ace-amber/50"
                        }
                      >
                        {f.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-ace-text-muted text-center py-8">
              {repo.lastScan ? "No findings detected." : "Run a scan to see findings."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
