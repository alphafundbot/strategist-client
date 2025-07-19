
import { cn } from "@/lib/utils";

export const StrategistLogo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6", className)}
    {...props}
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 2a10 10 0 0 1 10 10" />
    <path d="M12 2v10" />
    <path d="m16.24 7.76 1.42-1.42" />
    <path d="m12 22 4.24-4.24" />
    <path d="m7.76 16.24 1.42-1.42" />
    <path d="M2 12h10" />
    <path d="M22 12h-4.24" />
    <path d="m16.24 16.24-1.42-1.42" />
    <path d="m7.76 7.76 4.24 4.24" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
