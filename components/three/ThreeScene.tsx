'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x += 0.001
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 0.4, 0.05)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 0.3, 0.05)
  })

  return (
    <Sphere ref={meshRef} args={[1.6, 128, 128]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#2E6B9B"
        distort={0.45}
        speed={1.8}
        roughness={0.1}
        metalness={0.9}
        envMapIntensity={1}
      />
    </Sphere>
  )
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y -= 0.002
    meshRef.current.rotation.z += 0.001
  })

  return (
    <Sphere ref={meshRef} args={[2.1, 32, 32]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#8ABDD4" wireframe transparent opacity={0.08} />
    </Sphere>
  )
}

function FloatingParticles() {
  const count = 300
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8ABDD4" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function RingParticles() {
  const count = 120
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 3.2 + (Math.random() - 0.5) * 0.6
      arr[i * 3]     = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.12
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C2DFF0" size={0.06} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#2E6B9B" />
      <pointLight position={[4, 3, 2]} intensity={0.8} color="#8ABDD4" />
      <spotLight position={[0, 8, 0]} intensity={0.6} color="#C2DFF0" angle={0.5} />

      <Stars radius={80} depth={50} count={2000} factor={2} fade speed={0.5} />
      <MorphingSphere />
      <WireframeSphere />
      <FloatingParticles />
      <RingParticles />
    </Canvas>
  )
}
