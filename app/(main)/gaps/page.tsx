"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemo, type Gap, type GapStatus } from "@/context/demo-context"
import { cn } from "@/lib/utils"

const isOverdue = (deadline: string) => new Date(deadline) < new Date()

const KanbanCard = ({ gap }: { gap: Gap }) => {
  const overdue = isOverdue(gap.deadline)
  return (
    <Card
      className={cn(
        "bg-ace-bg-primary border-ace-border border-l-4 cursor-pointer hover:bg-ace-bg-primary/80",
        gap.status === "Completed" ? "border-l-ace-green" : overdue ? "border-l-ace-red" : "border-l-ace-accent",
      )}
    >
      <CardContent className="p-3 space-y-2">
        <p className="text-sm font-medium">{gap.gap}</p>
        <p className="text-xs text-ace-text-muted">{gap.component}</p>
        <div className="flex items-center justify-between">
          <Badge
            variant={overdue ? "destructive" : "outline"}
            className={
              overdue
                ? "bg-ace-red/20 text-ace-red border-ace-red/50 text-xs"
                : "border-ace-border text-ace-text-muted text-xs"
            }
          >
            Due: {gap.deadline}
          </Badge>
          <span className="text-xs text-ace-text-muted">{gap.owner}</span>
        </div>
      </CardContent>
    </Card>
  )
}

const KanbanLane = ({
  title,
  status,
  children,
  onDrop,
  onDragOver,
  isDraggedOver,
}: {
  title: string
  status: GapStatus
  children: React.ReactNode
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetLane: GapStatus) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  isDraggedOver: boolean
}) => (
  <div className="flex flex-col flex-1 min-w-0" onDrop={(e) => onDrop(e, status)} onDragOver={onDragOver}>
    <div className="p-2 rounded-t-md bg-ace-bg-surface">
      <h3 className="text-sm font-semibold text-center">{title}</h3>
    </div>
    <div
      className={cn(
        "p-2 space-y-3 bg-ace-bg-surface/50 rounded-b-md h-full overflow-y-auto transition-colors",
        isDraggedOver && "bg-ace-accent/10",
      )}
    >
      {children}
    </div>
  </div>
)

export default function GapsPage() {
  const { gaps, updateGapStatus } = useDemo()
  const [selectedGap, setSelectedGap] = React.useState<Gap | null>(null)
  const [draggedOverLane, setDraggedOverLane] = React.useState<GapStatus | null>(null)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, gapId: string) => {
    e.dataTransfer.setData("gapId", gapId)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetLane: GapStatus) => {
    e.preventDefault()
    const gapId = e.dataTransfer.getData("gapId")
    if (gapId) {
      updateGapStatus(gapId, targetLane)
    }
    setDraggedOverLane(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLDivElement
    const laneStatus = target.parentElement?.dataset.status as GapStatus
    if (laneStatus) {
      setDraggedOverLane(laneStatus)
    }
  }

  const handleDragLeave = () => {
    setDraggedOverLane(null)
  }

  const lanes: { title: string; status: GapStatus; items: Gap[] }[] = [
    { title: "Pending Implementation", status: "pending", items: gaps.pending },
    { title: "In Progress", status: "inProgress", items: gaps.inProgress },
    { title: "Completed", status: "completed", items: gaps.completed },
  ]

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1>Compliance Gap Board</h1>
          <p className="text-ace-text-muted mt-2">
            Track and manage compliance gaps across EU AI Act requirements and GDPR obligations
          </p>
        </div>
        <div className="flex gap-4 h-[calc(100vh-200px)]" onDragLeave={handleDragLeave}>
          {lanes.map((lane) => (
            <div key={lane.status} data-status={lane.status} className="flex flex-col flex-1">
              <KanbanLane
                title={lane.title}
                status={lane.status}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                isDraggedOver={draggedOverLane === lane.status}
              >
                {lane.items.map((gap) => (
                  <div
                    key={gap.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, gap.id)}
                    onClick={() => setSelectedGap(gap)}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-ace-accent rounded-md"
                  >
                    <KanbanCard gap={gap} />
                  </div>
                ))}
                {lane.items.length === 0 && <div className="text-center text-sm text-ace-text-muted p-4">Empty</div>}
              </KanbanLane>
            </div>
          ))}
        </div>
      </div>

      <Drawer open={!!selectedGap} onOpenChange={(open) => !open && setSelectedGap(null)}>
        <DrawerContent className="w-[540px] h-full fixed right-0 top-0 mt-0 rounded-none bg-ace-bg-primary border-l border-ace-border flex flex-col">
          {selectedGap && (
            <>
              <DrawerHeader className="p-4 border-b border-ace-border flex-shrink-0">
                <DrawerTitle>{selectedGap.gap}</DrawerTitle>
                <DrawerDescription>
                  {selectedGap.repo} / {selectedGap.component}
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 space-y-6 overflow-y-auto flex-1">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-ace-text-muted">Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-ace-text-muted w-24 inline-block">Owner:</span> {selectedGap.owner}
                    </p>
                    <p>
                      <span className="text-ace-text-muted w-24 inline-block">Deadline:</span> {selectedGap.deadline}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-ace-text-muted">Next Steps</h4>
                  <p className="text-sm bg-ace-bg-surface p-3 rounded-md border border-ace-border">
                    {(selectedGap as any).nextSteps || "Implement a versioned `risk_matrix.yaml` and load it into the `loan-scorer` component to ensure risk parameters are managed and auditable as per Art. 9."}
                  </p>
                </div>
                {(selectedGap as any).implementation && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-ace-text-muted">Implementation Tips</h4>
                    <p className="text-sm bg-ace-accent/10 p-3 rounded-md border border-ace-accent/20">
                      {(selectedGap as any).implementation}
                    </p>
                  </div>
                )}
              </div>

              <DrawerFooter className="p-4 border-t border-ace-border flex-shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ace-text-muted">Update Status</label>
                    <Select
                      defaultValue={
                        gaps.pending.find((g) => g.id === selectedGap.id)
                          ? "pending"
                          : gaps.inProgress.find((g) => g.id === selectedGap.id)
                            ? "inProgress"
                            : "completed"
                      }
                      onValueChange={(value) => updateGapStatus(selectedGap.id, value as GapStatus)}
                    >
                      <SelectTrigger className="w-full bg-ace-bg-surface">
                        <SelectValue placeholder="Set status..." />
                      </SelectTrigger>
                      <SelectContent className="bg-ace-bg-surface border-ace-border">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-ace-accent text-white">Create Jira Ticket</Button>
                  </div>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
