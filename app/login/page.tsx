import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Shield } from "lucide-react"
import { AceGuardLogo } from "@/components/aceguard-logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-ace-bg-surface lg:flex lg:flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative z-10 flex flex-col items-center text-center animate-fade-in">
          <AceGuardLogo className="mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Automated Security.
            <br />
            Continuous Compliance.
          </h1>
          <p className="text-ace-text-muted max-w-md">
            AceGuard scans your codebase for security vulnerabilities and compliance gaps, providing actionable insights
            to keep your software secure and your business protected.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-ace-bg-primary">
        <Card className="w-full max-w-sm bg-ace-bg-surface border-ace-border shadow-2xl shadow-black/25 animate-fade-in [animation-delay:200ms]">
          <CardHeader className="text-center space-y-2">
            <AceGuardLogo className="lg:hidden justify-center mb-4" />
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-ace-text-muted">
              Sign in to access your AceGuard dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild className="w-full bg-white text-ace-bg-primary hover:bg-gray-200 font-semibold py-6">
              <Link href="/dashboard">
                <Github className="mr-2 h-5 w-5" /> Sign in with GitHub
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full border-ace-border hover:bg-ace-bg-primary bg-transparent font-semibold py-6"
            >
              <Link href="/dashboard">
                <Shield className="mr-2 h-5 w-5" /> Continue with SSO
              </Link>
            </Button>
          </CardContent>
          <CardFooter>
            <p className="w-full text-center text-xs text-ace-text-muted">
              By signing in, you agree to our{" "}
              <Link href="#" className="underline hover:text-ace-accent">
                Terms of Service
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
