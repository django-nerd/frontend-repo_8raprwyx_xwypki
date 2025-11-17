import Spline from '@splinetool/react-spline'

export default function Hero3D() {
  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/5l9y9K2m7p5Yp8nL/scene.splinecode" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28">
        <div className="max-w-2xl bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Book, Track, and Manage Cargo Visually
          </h1>
          <p className="mt-4 text-gray-700">
            A modern logistics platform with immersive 3D scenes that make complex routes and shipments tangible.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#quote" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Get a Quote</a>
            <a href="#track" className="px-5 py-3 rounded-lg bg-white/80 text-blue-700 font-semibold shadow hover:bg-white transition">Track Shipment</a>
          </div>
        </div>
      </div>
    </div>
  )
}
