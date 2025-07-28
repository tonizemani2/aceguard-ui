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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemo } from "@/context/demo-context"
import { useToast } from "@/components/ui/use-toast"

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-ace-amber/20 text-ace-amber border-ace-amber/50"
    case "Under Review":
      return "bg-ace-accent/20 text-ace-accent border-ace-accent/50"
    case "Paid":
      return "bg-ace-green/20 text-ace-green border-ace-green/50"
    case "Rejected":
      return "bg-ace-red/20 text-ace-red border-ace-red/50"
    default:
      return "bg-ace-bg-primary border-ace-border"
  }
}

export default function ClaimsPage() {
  const [userTier] = React.useState("Pro")
  const { findings, claims, addClaim } = useDemo()
  const { toast } = useToast()
  const [isClaimDialogOpen, setIsClaimDialogOpen] = React.useState(false)
  const [selectedFindingId, setSelectedFindingId] = React.useState<string | undefined>()
  const [fineAmount, setFineAmount] = React.useState("")

  const highRiskFindings = findings.filter((f) => f.severity === "High" || f.severity === "Critical")

  const handleFileClaim = () => {
    if (!selectedFindingId || !fineAmount) {
      toast({
        title: "Missing Information",
        description: "Please select a finding and enter a fine amount.",
        variant: "destructive",
      })
      return
    }

    const finding = highRiskFindings.find((f) => f.id === selectedFindingId)
    if (!finding) return

    const newClaim = {
      claimId: `CL-${Math.floor(Math.random() * 100)}`,
      repo: finding.repo,
      fineEUR: Number(fineAmount),
      status: "Under Review",
      submitted: new Date().toISOString().split("T")[0],
    }

    addClaim(newClaim)
    toast({
      title: "Claim Filed Successfully",
      description: `Claim for finding ${finding.id} has been submitted for review.`,
      className: "bg-ace-bg-surface border-ace-accent text-ace-text-default",
    })

    // Reset form
    setSelectedFindingId(undefined)
    setFineAmount("")
    setIsClaimDialogOpen(false)
  }

  if (userTier === "Starter") {
    return (
      <Card className="bg-ace-bg-surface border-ace-border border-l-4 border-l-ace-accent">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Unlock Insurance Claims</h3>
            <p className="text-ace-text-muted text-sm">
              Upgrade to the Enterprise plan to file and manage insurance claims.
            </p>
          </div>
          <Button className="bg-ace-accent text-white">Upgrade Plan</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Insurance Claims</h1>
        <p className="text-ace-text-muted mt-2">
          Manage insurance claims for regulatory fines and enforcement actions.
        </p>
      </div>

      <Card className="bg-ace-bg-surface border-ace-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Claims History</CardTitle>
          <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ace-accent text-white">File New Claim</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-ace-bg-primary border-ace-border">
              <DialogHeader>
                <DialogTitle>File New Insurance Claim</DialogTitle>
                <DialogDescription>
                  Submit a claim based on a detected compliance finding that has resulted in a regulatory fine.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="finding">Related Finding</Label>
                  <Select value={selectedFindingId} onValueChange={setSelectedFindingId}>
                    <SelectTrigger id="finding" className="bg-ace-bg-surface">
                      <SelectValue placeholder="Select a high-risk finding..." />
                    </SelectTrigger>
                    <SelectContent className="bg-ace-bg-surface border-ace-border">
                      {highRiskFindings.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.id}: {f.component} ({f.repo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fine-amount">Fine Amount (EUR)</Label>
                  <Input
                    id="fine-amount"
                    type="number"
                    placeholder="e.g., 2500000"
                    className="bg-ace-bg-surface"
                    value={fineAmount}
                    onChange={(e) => setFineAmount(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="documentation">Supporting Documentation</Label>
                  <Input id="documentation" type="file" className="bg-ace-bg-surface" />
                  <p className="text-xs text-ace-text-muted">Upload the official regulatory notice or fine.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsClaimDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleFileClaim} className="bg-ace-accent text-white">
                  Submit Claim
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-ace-border hover:bg-ace-bg-surface">
                <TableHead>Claim ID</TableHead>
                <TableHead>Repository</TableHead>
                <TableHead>Fine Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.claimId} className="border-ace-border hover:bg-ace-bg-primary">
                  <TableCell className="font-mono text-xs">{claim.claimId}</TableCell>
                  <TableCell className="font-medium">{claim.repo}</TableCell>
                  <TableCell className="font-mono">€{claim.fineEUR.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(claim.status)}>{claim.status}</Badge>
                  </TableCell>
                  <TableCell>{claim.submitted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
