'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ── Gear geometry ───────────────────── */
function createGearShape(
  teeth: number,
  innerR: number,
  outerR: number,
  toothH: number,
  toothW: number,
) {
  const shape = new THREE.Shape()
  const total = teeth * 2
  for (let i = 0; i <= total; i++) {
    const angle = (i / total) * Math.PI * 2
    const r = i % 2 === 0 ? outerR + toothH : outerR
    const tw = i % 2 === 0 ? toothW : toothW * 1.3
    const a1 = angle - tw
    const a2 = angle + tw
    if (i === 0) shape.moveTo(Math.cos(a1) * r, Math.sin(a1) * r)
    shape.lineTo(Math.cos(a1) * r, Math.sin(a1) * r)
    shape.lineTo(Math.cos(a2) * r, Math.sin(a2) * r)
  }
  shape.closePath()
  // Hole
  const hole = new THREE.Path()
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2
    if (i === 0) hole.moveTo(Math.cos(a) * innerR, Math.sin(a) * innerR)
    else hole.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR)
  }
  hole.closePath()
  shape.holes.push(hole)
  return shape
}

/* ── Individual gear mesh ───────────── */
interface GearProps {
  teeth: number
  radius: number
  depth: number
  position: [number, number, number]
  speed: number
  color?: string
  emissive?: string
}

function Gear({ teeth, radius, depth, position, speed, color = '#C8A04C', emissive = '#3A2A00' }: GearProps) {
  const ref = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    const shape = createGearShape(teeth, radius * 0.38, radius, radius * 0.18, 0.055)
    const extrudeSettings = { depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 3 }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [teeth, radius, depth])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <mesh ref={ref} position={position} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.15}
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  )
}

/* ── Floating particles ─────────────── */
function GoldenParticles() {
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#C8A04C" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

/* ── Scene ──────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow color="#FFF5E0" />
      <pointLight position={[-4, -2, 3]} intensity={0.5} color="#C8A04C" />
      <pointLight position={[4, 2, -2]} intensity={0.3} color="#00E5FF" />

      {/* Main central gear */}
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
        <Gear teeth={24} radius={1.6} depth={0.22} position={[0, 0, 0]} speed={0.18} color="#C8A04C" emissive="#4A2E00" />
      </Float>

      {/* Satellite gears */}
      <Gear teeth={12} radius={0.85} depth={0.2}  position={[3.0, 0.1, 0]}   speed={-0.38} color="#B87333" emissive="#3A1A00" />
      <Gear teeth={12} radius={0.85} depth={0.2}  position={[-3.0, 0.1, 0]}  speed={-0.38} color="#B87333" emissive="#3A1A00" />
      <Gear teeth={8}  radius={0.6}  depth={0.18} position={[1.6, 2.3, 0.1]} speed={0.55}  color="#9A8060" emissive="#2A1800" />
      <Gear teeth={8}  radius={0.6}  depth={0.18} position={[-1.6, -2.3, 0.1]} speed={0.55} color="#9A8060" emissive="#2A1800" />
      <Gear teeth={6}  radius={0.45} depth={0.16} position={[2.8, -1.8, 0.15]} speed={-0.72} color="#C8A04C" />

      <GoldenParticles />
    </>
  )
}

/* ── Export ─────────────────────────── */
export default function GearScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  )
}
