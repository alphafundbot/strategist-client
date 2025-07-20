export default function HomePage() {
  return (
    <main className="min-h-screen p-12 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Kasik Alpha Trade Cockpit</h1>
        <p className="text-muted mt-2">Strategist control center is online.</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        {/* Strategist Tier */}
        <div className="p-4 rounded shadow-md bg-white dark:bg-slate-800">
          <h2 className="text-lg font-semibold">🛡️ Tier: Gold Strategist</h2>
          <p className="text-sm text-muted">Full mutation access</p>
        </div>

        {/* Mutation Trigger */}
        <div className="p-4 rounded shadow-md bg-white dark:bg-slate-800">
          <h2 className="text-lg font-semibold">🧪 Synthesize Mutation</h2>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Trigger Mutation
          </button>
        </div>

        {/* ROI Forecast */}
        <div className="p-4 rounded shadow-md bg-white dark:bg-slate-800 col-span-2">
          <h2 className="text-lg font-semibold">📊 ROI Forecast</h2>
          <p className="text-sm text-muted">Projected strategist gains loading...</p>
        </div>
      </section>
    </main>
  );
}
