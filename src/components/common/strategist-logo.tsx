
import { cn } from "@/lib/utils";

export const StrategistLogo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 40"
    className={cn("w-6 h-6", className)}
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25.75,35.5625 C20.25,35.5625 15,31.25 15,25 C15,20 17.5,16.25 21.25,13.75" />
      <path d="M29.5,3.75 C35.25,4.375 40,8.75 40,15 C40,24.375 32.5,31.875 25.75,35.5625 C25.75,35.5625 25.75,35.5625 25.75,35.5625 C18.375,31.875 10.875,23.125 10.875,15 C10.875,7.5 16.125,1.25 23.625,1.25 C25.55,1.25 27.475,1.875 29.125,2.5" transform="translate(0, 0.625)" />
      <path d="M25,17.5 L29.375,10.625" />
      <path d="M29.375,10.625 L33.75,17.5" />
      <path d="M33.75,17.5 L29.375,24.375" />
      <path d="M29.375,24.375 L25,17.5" />
      <path d="M25,17.5 L33.75,17.5" />
      <circle cx="25" cy="17.5" r="2.5" />
      <circle cx="29.375" cy="10.625" r="1.875" />
      <circle cx="33.75" cy="17.5" r="2.5" />
      <circle cx="29.375" cy="24.375" r="1.875" />
    </g>
  </svg>
);
