import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import Visualizer3D from './components/Visualizer3D'
import { QuoteForm, BookForm, TrackForm, ResultCard } from './components/Forms'

function App() {
  const [quotes, setQuotes] = useState([])
  const [lastQuote, setLastQuote] = useState(null)
  const [booked, setBooked] = useState(null)
  const [tracking, setTracking] = useState(null)
  const [shipments, setShipments] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/shipments`).then(r=>r.json()).then(setShipments).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-100">
      <Navbar />
      <Hero3D />

      <main className="max-w-6xl mx-auto px-6 space-y-10 pb-20">
        <section className="grid md:grid-cols-2 gap-6 -mt-24">
          <QuoteForm onResult={(q) => { setLastQuote(q); setQuotes([q, ...quotes]) }} />
          <BookForm onBooked={setBooked} />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Visualizer3D shipments={shipments} />
          <div className="space-y-4">
            {lastQuote && (
              <ResultCard title="Your Quote">
                {lastQuote.error ? (
                  <p className="text-red-600">{lastQuote.error}</p>
                ) : (
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><b>Route:</b> {lastQuote.origin} → {lastQuote.destination}</li>
                    <li><b>Mode:</b> {lastQuote.mode}</li>
                    <li><b>Weight:</b> {lastQuote.weight_kg} kg</li>
                    <li><b>Volume:</b> {lastQuote.volume_cbm} cbm</li>
                    <li className="text-blue-700 text-lg font-bold mt-2">${'{'}lastQuote.price_usd{'}'} USD • ETA {lastQuote.eta_days} days</li>
                  </ul>
                )}
              </ResultCard>
            )}

            {booked && (
              <ResultCard title="Booking Confirmed">
                {booked.error ? (
                  <p className="text-red-600">{booked.error}</p>
                ) : (
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><b>Tracking #:</b> {booked.tracking_number}</li>
                    <li><b>Route:</b> {booked.origin} → {booked.destination}</li>
                    <li><b>Mode:</b> {booked.mode}</li>
                    <li><b>Shipper:</b> {booked.shipper_name} ({booked.shipper_email})</li>
                  </ul>
                )}
              </ResultCard>
            )}

            <TrackForm onTracked={setTracking} />

            {tracking && (
              <ResultCard title="Tracking">
                {tracking.error ? (
                  <p className="text-red-600">{tracking.error}</p>
                ) : (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><b>Tracking #:</b> {tracking.tracking_number}</p>
                    <ul className="space-y-1">
                      {tracking.events?.map((e, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">{e.status}</span>
                          {e.location && <span className="text-gray-600">@ {e.location}</span>}
                          {e.note && <span className="text-gray-500">— {e.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ResultCard>
            )}
          </div>
        </section>
      </main>

      <style>{`
        .input { @apply w-full px-3 py-2 rounded-lg border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400; }
        .btn-primary { @apply px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition; }
      `}</style>
    </div>
  )
}

export default App
