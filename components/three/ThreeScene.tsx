'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import * as THREE from 'three'

/* ─── single server rack ──────────────────────────────── */
function ServerRack({
  position,
  seed = 0,
}: {
  position: [number, number, number]
  seed?: number
}) {
  const lightsRef = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    lightsRef.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = clock.elapsedTime + seed * 0.7 + i * 0.4
      const mat = mesh.material as THREE.MeshBasicMaterial
      const colors = ['#00FF88', '#2E6B9B', '#8ABDD4', '#FF4455', '#00CCFF']
      const base = colors[(seed + i) % colors.length]
      const c = new THREE.Color(base)
      const blink = (i % 3 === 0) ? (Math.sin(t * 3 + i) > 0.6 ? 1 : 0.2) : 0.8
      mat.color.set(c.multiplyScalar(blink))
    })
  })

  const LIGHT_ROWS = 10

  return (
    <group position={position}>
      {/* Main chassis */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.56, 2.2, 0.96]} />
        <meshStandardMaterial color="#0B1628" metalness={0.85} roughness={0.18} />
      </mesh>

      {/* Front panel */}
      <mesh position={[0, 1.1, 0.485]}>
        <boxGeometry args={[0.54, 2.18, 0.01]} />
        <meshStandardMaterial color="#0A1220" metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Unit dividers (1U lines) */}
      {Array.from({ length: LIGHT_ROWS }).map((_, i) => (
        <mesh key={`div-${i}`} position={[0, 0.22 + i * 0.2, 0.491]}>
          <boxGeometry args={[0.52, 0.005, 0.005]} />
          <meshBasicMaterial color="#1A2A40" />
        </mesh>
      ))}

      {/* Activity LEDs */}
      {Array.from({ length: LIGHT_ROWS }).map((_, i) => (
        <mesh
          key={`led-${i}`}
          ref={(el) => { if (el) lightsRef.current[i] = el }}
          position={[0.19, 0.24 + i * 0.2, 0.492]}
        >
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#00FF88" />
        </mesh>
      ))}

      {/* Secondary LED strip */}
      {Array.from({ length: LIGHT_ROWS }).map((_, i) => (
        <mesh
          key={`led2-${i}`}
          ref={(el) => { if (el) lightsRef.current[i + LIGHT_ROWS] = el }}
          position={[0.13, 0.24 + i * 0.2, 0.492]}
        >
          <sphereGeometry args={[0.009, 8, 8]} />
          <meshBasicMaterial color="#2E6B9B" />
        </mesh>
      ))}

      {/* Top cable tray */}
      <mesh position={[0, 2.25, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.8]} />
        <meshStandardMaterial color="#0D1520" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cables on top */}
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={`cable-${i}`} position={[x, 2.3, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.7, 6]} />
          <meshStandardMaterial
            color={['#2E6B9B', '#8ABDD4', '#1A3A5C'][i]}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Feet */}
      {([-0.22, 0.22] as number[]).flatMap((x) =>
        ([-0.38, 0.38] as number[]).map((z) => (
          <mesh key={`foot-${x}-${z}`} position={[x, 0.04, z]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
          </mesh>
        ))
      )}
    </group>
  )
}

/* ─── overhead LED strip ──────────────────────────────── */
function CeilingStrip({ z }: { z: number }) {
  const lightRef = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.4 + Math.sin(clock.elapsedTime * 0.5 + z) * 0.05
    }
  })
  return (
    <group position={[0, 4.8, z]}>
      <mesh>
        <boxGeometry args={[12, 0.04, 0.08]} />
        <meshBasicMaterial color="#C2DFF0" />
      </mesh>
      <pointLight ref={lightRef} color="#C2DFF0" intensity={0.5} distance={5} />
    </group>
  )
}

/* ─── floor grid ──────────────────────────────────────── */
function DataCenterFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial
          color="#07101E"
          metalness={0.6}
          roughness={0.4}
          envMapIntensity={0.5}
        />
      </mesh>
      <Grid
        args={[30, 60]}
        position={[0, 0.001, 0]}
        cellSize={0.6}
        cellThickness={0.3}
        cellColor="#1A2A40"
        sectionSize={1.2}
        sectionThickness={0.5}
        sectionColor="#2E4A6B"
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid={false}
      />
    </>
  )
}

/* ─── data center racks layout ────────────────────────── */
function DataCenter() {
  const racks = useMemo(() => {
    const result: Array<{ pos: [number, number, number]; seed: number }> = []
    const ROWS = 5
    const COLS = 7
    const rowSpacing = 4
    const colSpacing = 0.75

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        result.push({
          pos: [
            (col - Math.floor(COLS / 2)) * colSpacing,
            0,
            (row - Math.floor(ROWS / 2)) * rowSpacing,
          ],
          seed: row * COLS + col,
        })
      }
    }
    return result
  }, [])

  return (
    <group>
      <DataCenterFloor />

      {/* Ceiling strips between rack rows */}
      {[-8, -4, 0, 4, 8].map((z) => (
        <CeilingStrip key={z} z={z} />
      ))}

      {/* Ceiling */}
      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial color="#060D18" side={THREE.BackSide} />
      </mesh>

      {/* All server racks */}
      {racks.map(({ pos, seed }) => (
        <ServerRack key={`${pos[0]}-${pos[2]}`} position={pos} seed={seed} />
      ))}
    </group>
  )
}

/* ─── camera fly-through ──────────────────────────────── */
function FlyCamera() {
  const { camera } = useThree()

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime * 0.12
    // Slow fly forward through the aisle + gentle side sway
    camera.position.x = Math.sin(t * 0.4) * 1.2 + mouse.x * 0.4
    camera.position.y = 1.5 + Math.sin(t * 0.3) * 0.3 + mouse.y * 0.2
    camera.position.z = 12 - (t % 20) * 0.8   // flies forward, resets

    camera.lookAt(
      Math.sin(t * 0.4) * 0.5,
      1.4,
      camera.position.z - 8,
    )
  })

  return null
}

/* ─── ambient particles floating in air ──────────────── */
function DustParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = Math.random() * 4.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 28
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.003
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8ABDD4" size={0.02} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

/* ─── Scene root ──────────────────────────────────────── */
export default function ThreeScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 12], fov: 65, near: 0.1, far: 80 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.8 }}
    >
      <fog attach="fog" args={['#060911', 10, 35]} />

      <ambientLight intensity={0.08} color="#0D1B2E" />
      <directionalLight position={[0, 8, 0]} intensity={0.3} color="#8ABDD4" castShadow />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#2E6B9B" distance={20} />
      <pointLight position={[-5, 1, -8]} intensity={0.4} color="#C2DFF0" distance={12} />
      <pointLight position={[5, 1, 8]} intensity={0.4} color="#8ABDD4" distance={12} />

      <DataCenter />
      <DustParticles />
      <FlyCamera />
    </Canvas>
  )
}
