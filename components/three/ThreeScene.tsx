'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import * as THREE from 'three'

const INTRO_DURATION = 5.5   // camera crane-down duration (s)

/* ─── easing utils ───────────────────────────────────── */
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }
function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}
function easeOutBack(t: number) {
  const c1 = 1.5, c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

/* ─── animated fog ────────────────────────────────────── */
function FogController() {
  const { scene } = useThree()
  useFrame(({ clock }) => {
    if (!(scene.fog instanceof THREE.Fog)) return
    const p = easeInOutQuart(Math.min(1, clock.elapsedTime / INTRO_DURATION))
    scene.fog.near = THREE.MathUtils.lerp(22, 10, p)
    scene.fog.far  = THREE.MathUtils.lerp(90, 35, p)
  })
  return null
}

/* ─── single server rack with assembly animation ──────── */
function ServerRack({
  position,
  seed = 0,
  assemblyDelay = 0,
}: {
  position: [number, number, number]
  seed?: number
  assemblyDelay?: number
}) {
  const groupRef  = useRef<THREE.Group>(null)
  const lightsRef = useRef<THREE.Mesh[]>([])

  // Deterministic per-rack drift during fall
  const randX   = ((seed * 7 + 3) % 11 - 5) * 0.9
  const randRotX = ((seed * 13 + 7) % 9  - 4) * 0.05
  const randRotZ = ((seed * 17 + 11) % 7 - 3) * 0.04
  const startY  = position[1] + 14 + (seed % 4) * 2.5

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const elapsed = clock.elapsedTime
    const t   = Math.max(0, elapsed - assemblyDelay)
    const raw = Math.min(1, t / 1.4)

    // Y: bouncy fall (easeOutBack gives slight overshoot on landing)
    groupRef.current.position.y = THREE.MathUtils.lerp(startY, position[1], easeOutBack(raw))
    // X: drift from side back to column
    groupRef.current.position.x = THREE.MathUtils.lerp(position[0] + randX, position[0], easeOutCubic(raw))
    // Tumble during fall
    groupRef.current.rotation.x = randRotX * (1 - easeOutCubic(raw))
    groupRef.current.rotation.z = randRotZ * (1 - easeOutCubic(raw))

    // LEDs flicker on after landing
    if (raw > 0.82) {
      const ledFade = Math.min(1, (raw - 0.82) / 0.18)
      lightsRef.current.forEach((mesh, i) => {
        if (!mesh) return
        const lt  = elapsed + seed * 0.7 + i * 0.4
        const mat = mesh.material as THREE.MeshBasicMaterial
        const colors = ['#00FF88', '#2E6B9B', '#8ABDD4', '#FF4455', '#00CCFF']
        const blink  = (i % 3 === 0) ? (Math.sin(lt * 3 + i) > 0.6 ? 1 : 0.2) : 0.8
        const c = new THREE.Color(colors[(seed + i) % colors.length])
        mat.color.set(c.multiplyScalar(blink * ledFade))
      })
    }
  })

  const LIGHT_ROWS = 10

  return (
    <group ref={groupRef} position={[position[0] + randX, startY, position[2]]}>
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

      {/* Unit dividers */}
      {Array.from({ length: LIGHT_ROWS }).map((_, i) => (
        <mesh key={`div-${i}`} position={[0, 0.22 + i * 0.2, 0.491]}>
          <boxGeometry args={[0.52, 0.005, 0.005]} />
          <meshBasicMaterial color="#1A2A40" />
        </mesh>
      ))}

      {/* Activity LEDs — start dark, flicker on after landing */}
      {Array.from({ length: LIGHT_ROWS }).map((_, i) => (
        <mesh
          key={`led-${i}`}
          ref={(el) => { if (el) lightsRef.current[i] = el }}
          position={[0.19, 0.24 + i * 0.2, 0.492]}
        >
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#001100" />
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
          <meshBasicMaterial color="#000811" />
        </mesh>
      ))}

      {/* Top cable tray */}
      <mesh position={[0, 2.25, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.8]} />
        <meshStandardMaterial color="#0D1520" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cables */}
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={`cable-${i}`} position={[x, 2.3, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.7, 6]} />
          <meshStandardMaterial
            color={(['#2E6B9B', '#8ABDD4', '#1A3A5C'] as const)[i]}
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
    if (!lightRef.current) return
    lightRef.current.intensity = 0.4 + Math.sin(clock.elapsedTime * 0.5 + z) * 0.05
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
        <meshStandardMaterial color="#07101E" metalness={0.6} roughness={0.4} envMapIntensity={0.5} />
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

/* ─── full datacenter — racks with ripple assembly delay ── */
function DataCenter() {
  const racks = useMemo(() => {
    const result: Array<{ pos: [number, number, number]; seed: number; assemblyDelay: number }> = []
    const ROWS = 5, COLS = 7, rowSpacing = 4, colSpacing = 0.75

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = (col - Math.floor(COLS / 2)) * colSpacing
        const z = (row - Math.floor(ROWS / 2)) * rowSpacing
        // Wave from center outward
        const distFromCenter = Math.sqrt(x * x + z * z)
        const assemblyDelay  = 0.5 + distFromCenter * 0.14

        result.push({ pos: [x, 0, z], seed: row * COLS + col, assemblyDelay })
      }
    }
    return result
  }, [])

  return (
    <group>
      <DataCenterFloor />

      {[-8, -4, 0, 4, 8].map((z) => (
        <CeilingStrip key={z} z={z} />
      ))}

      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial color="#060D18" side={THREE.BackSide} />
      </mesh>

      {racks.map(({ pos, seed, assemblyDelay }) => (
        <ServerRack key={`${pos[0]}-${pos[2]}`} position={pos} seed={seed} assemblyDelay={assemblyDelay} />
      ))}
    </group>
  )
}

/* ─── camera: bird's-eye crane → aisle fly-through ───── */
function FlyCamera() {
  const { camera } = useThree()

  useFrame(({ clock, mouse }) => {
    const elapsed = clock.elapsedTime

    if (elapsed < INTRO_DURATION) {
      // Crane down from high overview to aisle level
      const p = easeInOutQuart(Math.min(1, elapsed / INTRO_DURATION))
      camera.position.set(
        THREE.MathUtils.lerp(4,   0,    p),
        THREE.MathUtils.lerp(22,  1.5,  p),
        THREE.MathUtils.lerp(22,  12,   p),
      )
      camera.lookAt(
        0,
        THREE.MathUtils.lerp(2,   1.4, p),
        THREE.MathUtils.lerp(-3,  4,   p),
      )
    } else {
      // Normal aisle fly-through with mouse parallax
      const ft = (elapsed - INTRO_DURATION) * 0.12
      camera.position.x = Math.sin(ft * 0.4) * 1.2 + mouse.x * 0.4
      camera.position.y = 1.5 + Math.sin(ft * 0.3) * 0.3 + mouse.y * 0.2
      camera.position.z = 12 - (ft % 20) * 0.8
      camera.lookAt(
        Math.sin(ft * 0.4) * 0.5,
        1.4,
        camera.position.z - 8,
      )
    }
  })

  return null
}

/* ─── dust particles ──────────────────────────────────── */
function DustParticles() {
  const ref   = useRef<THREE.Points>(null)
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

  useFrame(() => {
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
      camera={{ position: [4, 22, 22], fov: 60, near: 0.1, far: 120 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.8 }}
    >
      {/* Fog starts distant (see full fall), closes in as camera descends */}
      <fog attach="fog" args={['#060911', 22, 90]} />

      <ambientLight intensity={0.08} color="#0D1B2E" />
      <directionalLight position={[0, 8, 0]} intensity={0.3} color="#8ABDD4" castShadow />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#2E6B9B" distance={20} />
      <pointLight position={[-5, 1, -8]} intensity={0.4} color="#C2DFF0" distance={12} />
      <pointLight position={[5, 1, 8]} intensity={0.4} color="#8ABDD4" distance={12} />

      <FogController />
      <DataCenter />
      <DustParticles />
      <FlyCamera />
    </Canvas>
  )
}
