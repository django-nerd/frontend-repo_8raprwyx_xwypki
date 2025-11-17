import { useState } from 'react'

export function QuoteForm({ onResult }) {
  const [form, setForm] = useState({ origin: '', destination: '', mode: 'sea', weight_kg: '', volume_cbm: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          weight_kg: parseFloat(form.weight_kg),
          volume_cbm: parseFloat(form.volume_cbm),
        }),
      })
      const data = await res.json()
      onResult?.(data)
    } catch (e) {
      onResult?.({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} id="quote" className="bg-white/80 backdrop-blur rounded-xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold">Instant Quote</h3>
      <div className="grid grid-cols-2 gap-3">
        <input className="input" placeholder="Origin" value={form.origin} onChange={(e)=>setForm({...form, origin:e.target.value})} required />
        <input className="input" placeholder="Destination" value={form.destination} onChange={(e)=>setForm({...form, destination:e.target.value})} required />
        <select className="input" value={form.mode} onChange={(e)=>setForm({...form, mode:e.target.value})}>
          <option value="sea">Sea</option>
          <option value="road">Road</option>
          <option value="air">Air</option>
        </select>
        <input className="input" type="number" min="0" step="0.1" placeholder="Weight (kg)" value={form.weight_kg} onChange={(e)=>setForm({...form, weight_kg:e.target.value})} required />
        <input className="input" type="number" min="0" step="0.01" placeholder="Volume (cbm)" value={form.volume_cbm} onChange={(e)=>setForm({...form, volume_cbm:e.target.value})} required />
      </div>
      <button disabled={loading} className="btn-primary w-full">{loading ? 'Calculating...' : 'Get Quote'}</button>
    </form>
  )
}

export function BookForm({ onBooked }) {
  const [form, setForm] = useState({ origin: '', destination: '', mode: 'sea', weight_kg: '', volume_cbm: '', shipper_name: '', shipper_email: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          weight_kg: parseFloat(form.weight_kg),
          volume_cbm: parseFloat(form.volume_cbm),
        }),
      })
      const data = await res.json()
      onBooked?.(data)
    } catch (e) {
      onBooked?.({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/80 backdrop-blur rounded-xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold">Book Shipment</h3>
      <div className="grid grid-cols-2 gap-3">
        <input className="input" placeholder="Origin" value={form.origin} onChange={(e)=>setForm({...form, origin:e.target.value})} required />
        <input className="input" placeholder="Destination" value={form.destination} onChange={(e)=>setForm({...form, destination:e.target.value})} required />
        <select className="input" value={form.mode} onChange={(e)=>setForm({...form, mode:e.target.value})}>
          <option value="sea">Sea</option>
          <option value="road">Road</option>
          <option value="air">Air</option>
        </select>
        <input className="input" type="number" min="0" step="0.1" placeholder="Weight (kg)" value={form.weight_kg} onChange={(e)=>setForm({...form, weight_kg:e.target.value})} required />
        <input className="input" type="number" min="0" step="0.01" placeholder="Volume (cbm)" value={form.volume_cbm} onChange={(e)=>setForm({...form, volume_cbm:e.target.value})} required />
        <input className="input col-span-2" placeholder="Shipper Name" value={form.shipper_name} onChange={(e)=>setForm({...form, shipper_name:e.target.value})} required />
        <input className="input col-span-2" type="email" placeholder="Shipper Email" value={form.shipper_email} onChange={(e)=>setForm({...form, shipper_email:e.target.value})} required />
      </div>
      <button disabled={loading} className="btn-primary w-full">{loading ? 'Booking...' : 'Book Now'}</button>
    </form>
  )
}

export function TrackForm({ onTracked }) {
  const [tracking, setTracking] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/track/${tracking}`)
      const data = await res.json()
      onTracked?.(data)
    } catch (e) {
      onTracked?.({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} id="track" className="bg-white/80 backdrop-blur rounded-xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold">Track Shipment</h3>
      <div className="flex gap-3">
        <input className="input flex-1" placeholder="Enter Tracking #" value={tracking} onChange={(e)=>setTracking(e.target.value)} required />
        <button disabled={loading} className="btn-primary">{loading ? 'Searching...' : 'Track'}</button>
      </div>
    </form>
  )
}

export function ResultCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      {children}
    </div>
  )
}
