import { cn } from "@/lib/utils"

export const AceGuardLogo = ({
  showText = true,
  className,
}: {
  showText?: boolean
  className?: string
}) => (
  <div className={cn("flex items-center gap-3 text-white", className)}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
      <defs>
        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#3D8BF7" />
          <stop offset="100%" stopColor="#2A6FDE" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.5L4.5 9.25V22.75L16 29.5L27.5 22.75V9.25L16 2.5Z"
        stroke="url(#logo-gradient)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 22L16 11L20.5 22M13.5 18H18.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {showText && <span className="text-xl font-semibold tracking-wide">AceGuard</span>}
  </div>
)
