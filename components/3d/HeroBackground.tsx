'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import styles from './HeroBackground.module.css'

// ── Floating geometry shapes ──────────────────────────────────────────────────

interface ShapeProps {
  position: [number, number, number]
  geometry: 'torus' | 'icosahedron' | 'octahedron'
  scale?: number
  rotationSpeed?: [number, number, number]
  emissiveIntensity?: number
  opacity?: number
}

function Shape({
  position,
  geometry,
  scale = 1,
  rotationSpeed = [0.003, 0.005, 0.002],
  emissiveIntensity = 0.15,
  opacity = 0.6,
}: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed[0]
    meshRef.current.rotation.y += rotationSpeed[1]
    meshRef.current.rotation.z += rotationSpeed[2]
  })

  const geo = useMemo(() => {
    switch (geometry) {
      case 'torus':        return new THREE.TorusGeometry(1, 0.35, 16, 40)
      case 'icosahedron':  return new THREE.IcosahedronGeometry(1, 0)
      case 'octahedron':   return new THREE.OctahedronGeometry(1, 0)
    }
  }, [geometry])

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geo}>
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#FF4D00"
          emissiveIntensity={emissiveIntensity}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  )
}

// ── Mouse parallax camera ─────────────────────────────────────────────────────

function CameraRig({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  const { camera } = useThree()

  useFrame(() => {
    // Subtle camera drift — shapes appear to move away from cursor
    camera.position.x += (mouseX.current * -2 - camera.position.x) * 0.04
    camera.position.y += (mouseY.current * 1.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function Scene({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  return (
    <>
      {/* Ambient + accent lighting */}
      <ambientLight intensity={0.3} color="#0A0A0A" />
      <pointLight position={[4, 6, 4]} intensity={1.2} color="#FF4D00" />
      <pointLight position={[-6, -4, 2]} intensity={0.4} color="#F5F0E8" />
      <fog attach="fog" args={['#0A0A0A', 12, 35]} />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      {/* 10 shapes — varied geometry, position, scale, speed */}
      <Shape position={[5, 2, -8]}    geometry="torus"       scale={1.4}  rotationSpeed={[0.002, 0.006, 0.001]} emissiveIntensity={0.2} opacity={0.5} />
      <Shape position={[-6, -1, -10]} geometry="icosahedron" scale={1.1}  rotationSpeed={[0.005, 0.003, 0.004]} emissiveIntensity={0.15} opacity={0.55} />
      <Shape position={[8, -3, -14]}  geometry="octahedron"  scale={1.8}  rotationSpeed={[0.003, 0.004, 0.002]} emissiveIntensity={0.12} opacity={0.4} />
      <Shape position={[-4, 4, -12]}  geometry="torus"       scale={0.8}  rotationSpeed={[0.006, 0.002, 0.005]} emissiveIntensity={0.25} opacity={0.6} />
      <Shape position={[2, -5, -9]}   geometry="icosahedron" scale={0.9}  rotationSpeed={[0.004, 0.007, 0.003]} emissiveIntensity={0.18} opacity={0.5} />
      <Shape position={[-8, 2, -16]}  geometry="octahedron"  scale={2.2}  rotationSpeed={[0.001, 0.003, 0.006]} emissiveIntensity={0.1}  opacity={0.35} />
      <Shape position={[6, 5, -18]}   geometry="torus"       scale={1.6}  rotationSpeed={[0.003, 0.005, 0.002]} emissiveIntensity={0.14} opacity={0.45} />
      <Shape position={[-2, -6, -11]} geometry="icosahedron" scale={1.3}  rotationSpeed={[0.005, 0.002, 0.004]} emissiveIntensity={0.2}  opacity={0.55} />
      <Shape position={[10, -1, -20]} geometry="octahedron"  scale={2.5}  rotationSpeed={[0.002, 0.004, 0.003]} emissiveIntensity={0.08} opacity={0.3} />
      <Shape position={[-9, 6, -15]}  geometry="torus"       scale={1.0}  rotationSpeed={[0.004, 0.006, 0.001]} emissiveIntensity={0.22} opacity={0.5} />
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

interface HeroBackgroundProps {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
}

export function HeroBackground({ mouseX, mouseY }: HeroBackgroundProps) {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}
