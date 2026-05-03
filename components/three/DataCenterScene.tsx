'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Edges, Line } from '@react-three/drei'
import * as THREE from 'three'

const BRASS = '#C8A04C'
const BRASS_DIM = '#4A3010'
const STEEL = '#1A1D24'
const STEEL_MID = '#252A35'

/* ── Detail piece (drive bay, port, LED) ── */
function Detail({
  position, size, color, emissive, emissiveIntensity = 0,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  emissive?: string
  emissiveIntensity?: number
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={emissiveIntensity}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}

/* ── Rack unit with brass edges ─────────── */
function RackUnit({
  position, size, floatSpeed = 1.2, floatOffset = 0, children,
}: {
  position: [number, number, number]
  size: [number, number, number]
  floatSpeed?: number
  floatOffset?: number
  children?: React.ReactNode
}) {
  return (
    <Float speed={floatSpeed + floatOffset * 0.18} floatIntensity={0.14} rotationIntensity={0.04}>
      <group position={position}>
        <mesh>
          <boxGeometry args={size} />
          <meshStandardMaterial color={STEEL_MID} metalness={0.92} roughness={0.18} />
        </mesh>
        <Edges color={BRASS} linewidth={1.5} />
        {children}
      </group>
    </Float>
  )
}

/* ── Arcing connection line ─────────────── */
function ConnectionLine({
  from, to,
}: {
  from: [number, number, number]
  to: [number, number, number]
}) {
  const points = useMemo<[number, number, number][]>(() => {
    const mid: [number, number, number] = [
      (from[0] + to[0]) / 2 + (from[0] > 0 ? 0.25 : -0.25),
      (from[1] + to[1]) / 2,
      (from[2] + to[2]) / 2,
    ]
    return [from, mid, to]
  }, [from, to])

  return <Line points={points} color={BRASS} lineWidth={0.6} transparent opacity={0.18} />
}

/* ── Floating particles ─────────────────── */
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(90 * 3)
    for (let i = 0; i < 90; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7
    }
    return arr
  }, [])
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.022 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={BRASS} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

/* ── The exploded data center group ──────── */
function DataCenter() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.065 })

  /* Rack "assembled" target positions — for connection lines */
  const rack = {
    s1:  [0,  1.05, 0] as [number, number, number],
    s2:  [0,  0.80, 0] as [number, number, number],
    s3:  [0,  0.35, 0] as [number, number, number],
    sw:  [0, -0.18, 0] as [number, number, number],
    pp:  [0, -0.52, 0] as [number, number, number],
    ups: [0, -1.22, 0] as [number, number, number],
  }

  return (
    <group ref={ref}>

      {/* ── Rack frame ─── */}
      <group>
        <mesh>
          <boxGeometry args={[1.3, 2.9, 0.88]} />
          <meshStandardMaterial color={STEEL} metalness={0.95} roughness={0.1} transparent opacity={0.10} />
        </mesh>
        <Edges color={BRASS_DIM} linewidth={0.8} threshold={1} />
        {/* Vertical rails */}
        {([-0.57, 0.57] as number[]).map((x) => (
          <mesh key={x} position={[x, 0, 0.39]}>
            <boxGeometry args={[0.055, 2.72, 0.04]} />
            <meshStandardMaterial color='#0C0E14' metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Horizontal shelf rails */}
        {([-1.1, -0.3, 0.4, 1.0] as number[]).map((y) => (
          <mesh key={y} position={[0, y, 0.4]}>
            <boxGeometry args={[1.1, 0.018, 0.03]} />
            <meshStandardMaterial color={BRASS_DIM} metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ── Server 1U #1 ─── */}
      <RackUnit position={[-1.6, 1.38, 0.8]} size={[1.0, 0.12, 0.65]} floatSpeed={1.05} floatOffset={0}>
        {([0, 1, 2, 3] as number[]).map((i) => (
          <Detail key={i} position={[-0.27 + i * 0.19, 0, 0.33]} size={[0.14, 0.07, 0.01]} color='#080A10' />
        ))}
        <Detail position={[0.43, 0.01, 0.33]} size={[0.035, 0.035, 0.01]} color='#00AA44' emissive='#00EE66' emissiveIntensity={2.5} />
        <Detail position={[0.37, 0.01, 0.33]} size={[0.025, 0.025, 0.01]} color={BRASS} emissive={BRASS} emissiveIntensity={1.8} />
      </RackUnit>

      {/* ── Server 1U #2 ─── */}
      <RackUnit position={[1.5, 0.88, -0.68]} size={[1.0, 0.12, 0.65]} floatSpeed={0.88} floatOffset={1}>
        {([0, 1, 2] as number[]).map((i) => (
          <Detail key={i} position={[-0.19 + i * 0.22, 0, 0.33]} size={[0.17, 0.07, 0.01]} color='#080A10' />
        ))}
        {([0, 1] as number[]).map((i) => (
          <Detail key={i} position={[-0.4 + i * 0.09, 0, 0.33]} size={[0.065, 0.09, 0.005]} color='#14161E' />
        ))}
        <Detail position={[0.43, 0.01, 0.33]} size={[0.035, 0.035, 0.01]} color='#00AA44' emissive='#00EE66' emissiveIntensity={2.5} />
      </RackUnit>

      {/* ── Server 2U ─── */}
      <RackUnit position={[-1.3, 0.12, -0.78]} size={[1.0, 0.24, 0.65]} floatSpeed={1.25} floatOffset={2}>
        {[0, 1].flatMap((row) =>
          [0, 1, 2, 3].map((col) => (
            <Detail key={`${row}-${col}`}
              position={[-0.27 + col * 0.19, 0.045 - row * 0.09, 0.33]}
              size={[0.14, 0.06, 0.01]} color='#080A10' />
          ))
        )}
        {([-0.12, 0.04, 0.2] as number[]).map((x) => (
          <Detail key={x} position={[x, 0, -0.33]} size={[0.065, 0.18, 0.01]} color='#0C0E14' />
        ))}
        <Detail position={[0.43, 0.07, 0.33]} size={[0.035, 0.035, 0.01]} color='#00AA44' emissive='#00EE66' emissiveIntensity={2.5} />
        <Detail position={[0.43, -0.05, 0.33]} size={[0.025, 0.025, 0.01]} color={BRASS} emissive={BRASS} emissiveIntensity={1.8} />
      </RackUnit>

      {/* ── Network Switch ─── */}
      <RackUnit position={[1.6, -0.48, 0.78]} size={[1.0, 0.10, 0.42]} floatSpeed={1.35} floatOffset={3}>
        {/* 24 ports (2 rows of 12) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <group key={i} position={[-0.39 + i * 0.065, 0, 0.22]}>
            <Detail position={[0,  0.016, 0]} size={[0.046, 0.028, 0.01]} color='#0A0C14' />
            <Detail position={[0, -0.016, 0]} size={[0.046, 0.028, 0.01]} color='#0A0C14' />
          </group>
        ))}
        {/* Activity LEDs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Detail key={i}
            position={[-0.35 + i * 0.1, 0, 0.22]}
            size={[0.018, 0.018, 0.01]}
            color={i % 3 === 0 ? '#00AA44' : BRASS}
            emissive={i % 3 === 0 ? '#00EE66' : BRASS}
            emissiveIntensity={i % 2 === 0 ? 2 : 1} />
        ))}
      </RackUnit>

      {/* ── Patch Panel ─── */}
      <RackUnit position={[-0.8, -1.05, 0.98]} size={[1.0, 0.07, 0.22]} floatSpeed={1.0} floatOffset={4}>
        {Array.from({ length: 24 }).map((_, i) => (
          <Detail key={i}
            position={[-0.44 + i * 0.038, 0, 0.115]}
            size={[0.026, 0.042, 0.01]} color='#080A10' />
        ))}
        <Detail position={[0, 0, -0.095]} size={[0.92, 0.038, 0.004]} color='#12141C' />
      </RackUnit>

      {/* ── UPS ─── */}
      <RackUnit position={[0.65, -1.68, -0.78]} size={[1.0, 0.40, 0.80]} floatSpeed={0.75} floatOffset={5}>
        {/* LCD display */}
        <Detail position={[-0.22, 0.02, 0.41]} size={[0.26, 0.22, 0.01]} color='#0C1522' />
        <Detail position={[-0.22, 0.02, 0.415]} size={[0.21, 0.17, 0.005]} color='#001830' emissive='#0033AA' emissiveIntensity={0.5} />
        {/* Ventilation slits */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Detail key={i} position={[0.18 + i * 0.045, 0, 0.41]} size={[0.022, 0.32, 0.01]} color='#0A0C12' />
        ))}
        {/* Power button */}
        <Detail position={[0.4, 0.12, 0.41]} size={[0.06, 0.06, 0.01]} color={BRASS} emissive={BRASS} emissiveIntensity={1.0} />
        {/* Battery indicators */}
        {([0, 1, 2, 3] as number[]).map((i) => (
          <Detail key={i} position={[-0.38 + i * 0.055, -0.14, 0.41]} size={[0.04, 0.04, 0.01]}
            color={i < 3 ? '#006622' : '#332200'}
            emissive={i < 3 ? '#00AA44' : '#553300'}
            emissiveIntensity={i < 3 ? 1 : 0.3} />
        ))}
      </RackUnit>

      {/* ── PDU (vertical strip) ─── */}
      <Float speed={1.15} floatIntensity={0.12} rotationIntensity={0.03}>
        <group position={[-0.48, -1.58, 0.9]}>
          <mesh>
            <boxGeometry args={[0.09, 1.6, 0.09]} />
            <meshStandardMaterial color={STEEL_MID} metalness={0.9} roughness={0.2} />
          </mesh>
          <Edges color={BRASS} linewidth={1.5} />
          {Array.from({ length: 6 }).map((_, i) => (
            <Detail key={i} position={[0, -0.6 + i * 0.24, 0.05]} size={[0.06, 0.07, 0.01]} color='#0A0C14' />
          ))}
        </group>
      </Float>

      {/* ── Connection threads ─── */}
      <ConnectionLine from={[-1.6,  1.38,  0.8]}  to={rack.s1} />
      <ConnectionLine from={[ 1.5,  0.88, -0.68]} to={rack.s2} />
      <ConnectionLine from={[-1.3,  0.12, -0.78]} to={rack.s3} />
      <ConnectionLine from={[ 1.6, -0.48,  0.78]} to={rack.sw} />
      <ConnectionLine from={[-0.8, -1.05,  0.98]} to={rack.pp} />
      <ConnectionLine from={[ 0.65,-1.68, -0.78]} to={rack.ups} />

      <Particles />
    </group>
  )
}

/* ── Export ──────────────────────────────── */
export default function DataCenterScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow color="#FFF5E0" />
      <pointLight position={[-4, -2, 3]} intensity={0.6} color="#C8A04C" />
      <pointLight position={[4, 2, -2]} intensity={0.35} color="#00E5FF" />
      <DataCenter />
    </Canvas>
  )
}
