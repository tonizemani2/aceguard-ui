import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1>Admin Console</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-ace-bg-surface">
          <TabsTrigger value="users">User & Roles</TabsTrigger>
          <TabsTrigger value="rules">Rule Sets</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card className="bg-ace-bg-surface border-ace-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Users and Roles</CardTitle>
              <Button className="bg-ace-accent text-white">Invite User</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-ace-border hover:bg-ace-bg-surface">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-ace-border">
                    <TableCell>user@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>2 hours ago</TableCell>
                  </TableRow>
                  <TableRow className="border-ace-border">
                    <TableCell>analyst@example.com</TableCell>
                    <TableCell>Analyst</TableCell>
                    <TableCell>1 day ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rules">
          <Card className="bg-ace-bg-surface border-ace-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Rule Sets</CardTitle>
              <Button variant="outline" className="bg-ace-bg-surface">
                Promote to Prod
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-ace-border hover:bg-ace-bg-surface">
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-ace-border">
                    <TableCell>v2.1.0</TableCell>
                    <TableCell>
                      <Badge className="bg-green-800/20 text-green-400">Production</Badge>
                    </TableCell>
                    <TableCell>2024-07-01</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            View Diff
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-ace-bg-primary border-ace-border">
                          <DialogHeader>
                            <DialogTitle>Diff for v2.1.0</DialogTitle>
                            <DialogDescription>Showing changes from previous version.</DialogDescription>
                          </DialogHeader>
                          <pre className="bg-ace-bg-surface p-4 rounded-md text-xs font-mono">
                            <code>
                              {`
- rule: hardcoded_secret
+ rule: hardcoded_secret_v2
  pattern: '(?i)secret|token|key'
`}
                            </code>
                          </pre>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs">
          <Card className="bg-ace-bg-surface border-ace-border">
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-ace-bg-primary p-4 rounded-md font-mono text-xs h-96 overflow-y-scroll">
                <p>
                  <span className="text-green-400">[INFO]</span> 2024-07-17 10:05:12 - Scan completed for repo
                  'aceguard-web'
                </p>
                <p>
                  <span className="text-yellow-400">[WARN]</span> 2024-07-17 10:01:05 - High memory usage detected
                </p>
                <p>
                  <span className="text-red-400">[ERROR]</span> 2024-07-17 09:59:01 - Failed to connect to GitHub API
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card className="bg-ace-bg-surface border-ace-border">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center p-4 border border-ace-border rounded-md">
                <div>
                  <p className="text-ace-text-muted">Current Plan</p>
                  <p className="text-xl font-semibold">Enterprise</p>
                </div>
                <Button variant="outline" className="bg-ace-bg-surface">
                  Change Plan
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Invoices</h4>
                <div className="border border-ace-border rounded-md p-2">
                  <div className="flex justify-between items-center p-2">
                    <span>Invoice #12345 - July 2024</span>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
