"use client"

import * as React from "react"
import {
  initialRepoList,
  initialFindings,
  initialGaps,
  demoRepo,
  demoRepoFindings,
  demoRepoGaps,
  highRiskTrend,
  insuranceClaims as initialClaims,
} from "@/lib/demo-data"

type Repo = (typeof initialRepoList)[0]
type Finding = (typeof initialFindings)[0]
type Gaps = typeof initialGaps
export type Gap = (typeof initialGaps.pending)[0]
export type GapStatus = "pending" | "inProgress" | "completed"
type Claim = (typeof initialClaims)[0]

interface DemoContextType {
  repos: Repo[]
  findings: Finding[]
  gaps: Gaps
  claims: Claim[]
  trendData: typeof highRiskTrend
  addRepo: () => void
  runScan: (repoName: string) => void
  getRepo: (repoName: string) => Repo | undefined
  resetDemo: () => void
  isAddingRepo: boolean
  updateGapStatus: (gapId: string, newStatus: GapStatus) => void
  addClaim: (newClaim: Claim) => void
}

const DemoContext = React.createContext<DemoContextType | undefined>(undefined)

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const [repos, setRepos] = React.useState(initialRepoList)
  const [findings, setFindings] = React.useState(initialFindings)
  const [gaps, setGaps] = React.useState<any>(initialGaps)
  const [claims, setClaims] = React.useState<Claim[]>(initialClaims)
  const [trendData, setTrendData] = React.useState(highRiskTrend)
  const [isAddingRepo, setIsAddingRepo] = React.useState(false)

  const addRepo = () => {
    if (repos.find((r) => r.name === demoRepo.name) || isAddingRepo) {
      return
    }
    setIsAddingRepo(true)
    setTimeout(() => {
      setRepos((prev) => [demoRepo, ...prev])
      setIsAddingRepo(false)
    }, 2500)
  }

  const runScan = (repoName: string) => {
    setRepos((prev) => prev.map((r) => (r.name === repoName ? { ...r, isScanning: true } : r)))

    // Immediately add findings and gaps for instant results
    // Put e-commerce platform findings at the top by adding them first
    const newFindings = [...demoRepoFindings, ...findings]
    setFindings(newFindings)
    setGaps((prev: any) => ({ ...prev, pending: [...prev.pending, ...demoRepoGaps as any[]] }))

    // Update repository with scan results immediately
    setRepos((prev) =>
      prev.map((r) =>
        r.name === repoName
          ? {
              ...r,
              isScanning: false,
              lastScan: new Date().toISOString(),
              highRisk: demoRepoFindings.filter((f) => f.severity === "High" || f.severity === "Critical").length,
            }
          : r,
      ),
    )

    // Update trend data immediately
    const newTrendPoint = {
      week: new Date().toISOString().split("T")[0],
      count: newFindings.filter((f) => (f.severity === "High" || f.severity === "Critical") && f.status === "Open")
        .length,
    }
    setTrendData((prev) => [...prev.slice(-11), newTrendPoint])

    // Keep the 24-hour simulation only for the scans page progress bar
    // The actual data is already available on all other pages
  }

  const getRepo = (repoName: string) => repos.find((r) => r.name === repoName)

  const resetDemo = () => {
    setRepos([])
    setFindings(initialFindings)
    setGaps(initialGaps)
    setClaims(initialClaims)
    setTrendData(highRiskTrend)
  }

  const updateGapStatus = (gapId: string, newStatus: GapStatus) => {
    setGaps((prevGaps: any) => {
      const newGapsState = {
        pending: [...prevGaps.pending],
        inProgress: [...prevGaps.inProgress],
        completed: [...prevGaps.completed],
      }

      let gapToMove: Gap | undefined
      let fromStatus: GapStatus | undefined

      for (const status of ["pending", "inProgress", "completed"] as GapStatus[]) {
        const index = newGapsState[status].findIndex((g) => g.id === gapId)
        if (index !== -1) {
          ;[gapToMove] = newGapsState[status].splice(index, 1)
          fromStatus = status
          break
        }
      }

      if (gapToMove && fromStatus !== newStatus) {
        newGapsState[newStatus].push(gapToMove)
      } else if (gapToMove) {
        newGapsState[fromStatus!].push(gapToMove)
      }

      return newGapsState
    })
  }

  const addClaim = (newClaim: Claim) => {
    setClaims((prev) => [newClaim, ...prev])
  }

  return (
    <DemoContext.Provider
      value={{
        repos,
        findings,
        gaps,
        claims,
        trendData,
        addRepo,
        runScan,
        getRepo,
        resetDemo,
        isAddingRepo,
        updateGapStatus,
        addClaim,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export const useDemo = () => {
  const context = React.useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider")
  }
  return context
}
