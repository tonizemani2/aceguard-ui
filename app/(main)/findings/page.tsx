"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { AlertTriangle, Copy, FileCode } from "lucide-react"
import { useDemo } from "@/context/demo-context"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const getBucketBadgeClass = (bucket: string) => {
  switch (bucket) {
    case "Prohibited":
      return "bg-ace-red/20 text-ace-red border-ace-red/50"
    case "High-Risk":
      return "bg-ace-amber/20 text-ace-amber border-ace-amber/50"
    default:
      return "bg-ace-bg-primary border-ace-border"
  }
}

const ProhibitedFindingBanner = () => (
  <div className="sticky top-0 z-20 p-2 bg-ace-red/20 border-b border-ace-red/50 text-ace-red text-sm font-medium flex items-center gap-2">
    <AlertTriangle className="h-4 w-4" />
    <span>A prohibited AI practice has been detected. Immediate action is required.</span>
  </div>
)

export default function FindingsPage() {
  const { findings } = useDemo()
  const { toast } = useToast()
  const [selectedFinding, setSelectedFinding] = React.useState<(typeof findings)[0] | null>(null)
  const hasProhibitedFinding = findings.some((f) => f.bucket === "Prohibited")

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard!",
      description: text,
      className: "bg-ace-bg-surface border-ace-accent text-ace-text-default",
    })
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1>Compliance Findings</h1>
          <p className="text-ace-text-muted mt-2">Violations and compliance gaps detected across your AI systems.</p>
        </div>
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          <Card className="w-64 bg-ace-bg-surface border-ace-border hidden lg:block">
            <CardContent className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Filters</h3>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-ace-text-muted mb-2">Bucket</h4>
                {["Prohibited", "High-Risk", "Limited-Risk"].map((b) => (
                  <div key={b} className="flex items-center space-x-2">
                    <Checkbox id={b} className="border-ace-text-muted" />
                    <label htmlFor={b} className="text-sm font-medium leading-none">
                      {b}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex-1">
            <Card className="bg-ace-bg-surface border-ace-border h-full flex flex-col">
              <div className="relative flex-1 overflow-y-auto">
                {hasProhibitedFinding && <ProhibitedFindingBanner />}
                <Table>
                  <TableHeader className="sticky top-0 bg-ace-bg-surface z-10">
                    <TableRow className="border-ace-border hover:bg-ace-bg-surface">
                      <TableHead>ID</TableHead>
                      <TableHead>Repo</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead>Bucket</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {findings.map((f) => (
                      <TableRow
                        key={f.id}
                        className="border-ace-border hover:bg-ace-bg-primary cursor-pointer"
                        onClick={() => setSelectedFinding(f)}
                      >
                        <TableCell className="font-mono text-xs">{f.id}</TableCell>
                        <TableCell>{f.repo}</TableCell>
                        <TableCell className="font-medium">{f.component}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getBucketBadgeClass(f.bucket)}>
                            {f.bucket}
                          </Badge>
                        </TableCell>
                        <TableCell>{f.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Drawer open={!!selectedFinding} onOpenChange={(open) => !open && setSelectedFinding(null)}>
        <DrawerContent className="w-[640px] h-full fixed right-0 top-0 mt-0 rounded-none bg-ace-bg-primary border-l border-ace-border flex flex-col">
          {selectedFinding && (
            <>
              <DrawerHeader className="p-4 border-b border-ace-border flex-shrink-0">
                <DrawerTitle className="flex items-center gap-2">
                  <span>{selectedFinding.id}</span>
                  <Badge variant="secondary" className={getBucketBadgeClass(selectedFinding.bucket)}>
                    {selectedFinding.bucket}
                  </Badge>
                </DrawerTitle>
                <DrawerDescription>{selectedFinding.component}</DrawerDescription>
              </DrawerHeader>

              <div className="p-4 space-y-6 overflow-y-auto flex-1">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-ace-text-muted">File Path</h4>
                  <div className="flex items-center gap-2 p-2 bg-ace-bg-surface rounded-md border border-ace-border">
                    <FileCode className="h-4 w-4 text-ace-text-muted" />
                    <span className="font-mono text-xs">{selectedFinding.evidence.filePath}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto"
                      onClick={() => handleCopy(selectedFinding.evidence.filePath)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 text-ace-text-muted">
                    Evidence (Violation of {selectedFinding.evidence.article})
                  </h4>
                  <div className="p-3 bg-ace-bg-surface rounded-md border border-ace-border font-mono text-xs">
                    <pre>
                      <code>
                        {selectedFinding.evidence.codeSnippet.map((line) => (
                          <div
                            key={line.line}
                            className={cn(
                              "flex",
                              line.line === selectedFinding.evidence.violatingLine &&
                                "bg-ace-red/10 border-l-2 border-ace-red -ml-3 pl-2.5",
                            )}
                          >
                            <span className="w-10 text-right pr-4 text-ace-text-muted select-none">{line.line}</span>
                            <span>{line.content}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-ace-border space-y-4 flex-shrink-0">
                <h4 className="text-sm font-semibold">Remediation</h4>
                <Button className="w-full bg-ace-accent text-white">Update Finding Status</Button>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
