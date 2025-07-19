'use client';

// This is a temporary smoke test to isolate a rendering issue.
// If this page loads correctly at /trading, the problem is within one of
// the original child components of the Trading Cockpit page.
export default function TradingTestPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-8 border-2 border-dashed rounded-lg border-green-500 bg-green-500/10">
        <h1 className="text-2xl font-bold text-green-500">✅ Trading Route is Live</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Routing to /trading is working correctly.
        </p>
      </div>
    </div>
  );
}
