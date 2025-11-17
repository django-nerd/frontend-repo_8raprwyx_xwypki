import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Visualizer3D({ shipments = [] }) {
  const mountRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf4f6ff)

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / 350, 0.1, 1000)
    camera.position.set(0, 6, 12)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, 350)
    mount.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 0.6)
    dir.position.set(5, 10, 7)
    scene.add(dir)

    // Globe
    const globeGeo = new THREE.SphereGeometry(3, 48, 48)
    const globeMat = new THREE.MeshStandardMaterial({ color: 0x7fb3ff, metalness: 0.2, roughness: 0.6 })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    scene.add(globe)

    // Orbiting boxes representing shipments
    const boxes = shipments.slice(0, 12).map((s, i) => {
      const geo = new THREE.BoxGeometry(0.3, 0.3, 0.3)
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${(i*40)%360},70%,55%)`) })
      const box = new THREE.Mesh(geo, mat)
      const radius = 4 + (i % 4) * 0.3
      box.userData = { radius, speed: 0.01 + (i % 5) * 0.003, phase: i }
      scene.add(box)
      return box
    })

    // Rings
    const ringGeo = new THREE.RingGeometry(3.4, 3.45, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x5a8dee, side: THREE.DoubleSide, transparent: true, opacity: 0.3 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      globe.rotation.y += 0.002
      boxes.forEach((b) => {
        const t = performance.now() * b.userData.speed + b.userData.phase
        b.position.set(
          Math.cos(t) * b.userData.radius,
          Math.sin(t * 0.8) * 0.8,
          Math.sin(t) * b.userData.radius,
        )
      })
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const width = mount.clientWidth
      renderer.setSize(width, 350)
      camera.aspect = width / 350
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
    }
  }, [shipments])

  return (
    <div ref={mountRef} className="w-full h-[350px] rounded-xl overflow-hidden shadow-lg bg-white" />
  )
}
