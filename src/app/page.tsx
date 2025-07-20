import AuthForm from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BarChart3, FlaskConical } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "AI-Powered Insights",
    description: "Leverage Everest, our AI strategist, to narrate rationale, score clarity, and evolve your mutations.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Advanced Analytics",
    description: "Visualize performance with ROI maps, analyze strategy allocations, and review historical vault data.",
  },
  {
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "Strategy Simulation",
    description: "Run AI-driven simulations to forecast potential outcomes and test new ideas before deployment.",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-6xl">

        {/* Left Side: Features */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Strategist Cockpit</h1>
            <p className="text-lg text-muted-foreground">
              The ultimate command center for designing, simulating, and deploying automated trading strategies.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-md mt-1">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full lg:w-1/2 flex justify-center">
            <Card className="w-full max-w-md shadow-2xl bg-card/50 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="text-center text-2xl">Access Your Cockpit</CardTitle>
                 </CardHeader>
                <CardContent>
                    <AuthForm />
                </CardContent>
            </Card>
        </div>
        
      </div>
    </main>
  );
}
