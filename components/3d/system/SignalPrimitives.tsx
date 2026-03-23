'use client'

import { useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instance, Instances, Line } from '@react-three/drei'
import * as THREE from 'three'

type Lane = {
  key: string
  points: [number, number, number][]
}

export function TraceLines({
  lanes,
  color,
  baseOpacity,
  highlightIndex = -1,
}: {
  lanes: Lane[]
  color: string
  baseOpacity: number
  highlightIndex?: number
}) {
  return (
    <>
      {lanes.map((lane, index) => (
        <Line
          key={lane.key}
          points={lane.points}
          color={color}
          transparent
          opacity={highlightIndex === index ? Math.min(0.88, baseOpacity + 0.22) : baseOpacity}
          lineWidth={highlightIndex === index ? 1.2 : 0.8}
        />
      ))}
    </>
  )
}

export function SignalNodes({
  positions,
  color,
  intensity,
  highlightIndex = -1,
}: {
  positions: [number, number, number][]
  color: string
  intensity: number
  highlightIndex?: number
}) {
  const coreRefs = useRef<Array<THREE.Mesh | null>>([])
  const ringRefs = useRef<Array<THREE.Mesh | null>>([])

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime

    positions.forEach((_, index) => {
      const boost = highlightIndex === index ? 1.55 : 1
      const pulse = 0.75 + Math.sin(elapsed * 1.5 + index * 1.2) * 0.14 * intensity * boost
      const ring = ringRefs.current[index]
      const core = coreRefs.current[index]

      if (ring) {
        ring.scale.setScalar(0.88 + pulse * 0.5)
        const material = ring.material as THREE.MeshBasicMaterial
        material.opacity = 0.12 + pulse * 0.16
      }

      if (core) {
        core.scale.setScalar(0.92 + pulse * 0.18)
        const material = core.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.6 + pulse * 0.9
      }
    })
  })

  return (
    <>
      {positions.map((position, index) => (
        <group key={`node-${position.join('-')}`} position={position}>
          <mesh ref={(node) => { coreRefs.current[index] = node }}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
          </mesh>
          <mesh
            ref={(node) => { ringRefs.current[index] = node }}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.28, 0.018, 12, 48]} />
            <meshBasicMaterial color={color} transparent opacity={0.18} />
          </mesh>
        </group>
      ))}
    </>
  )
}

export function PacketFlow({
  lanes,
  color,
  intensity,
  count,
  intensityRef,
}: {
  lanes: Lane[]
  color: string
  intensity: number
  count: number
  intensityRef?: MutableRefObject<number>
}) {
  const instanceRefs = useRef<Array<THREE.Object3D | null>>([])

  const curves = useMemo(
    () => lanes.map((lane) => new THREE.CatmullRomCurve3(lane.points.map((point) => new THREE.Vector3(...point)))),
    [lanes]
  )

  const packets = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        laneIndex: index % curves.length,
        offset: index / count,
        speed: 0.045 + (index % 5) * 0.006,
      })),
    [count, curves.length]
  )

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime
    const liveIntensity = intensityRef?.current ?? intensity

    packets.forEach((packet, index) => {
      const node = instanceRefs.current[index]

      if (!node) return

      const curve = curves[packet.laneIndex]
      const progress = (elapsed * packet.speed * liveIntensity + packet.offset) % 1
      const point = curve.getPointAt(progress)
      const nextPoint = curve.getPointAt((progress + 0.012) % 1)
      const scale = 0.9 + Math.sin(elapsed * 2.4 + index) * 0.12

      node.position.copy(point)
      node.lookAt(nextPoint)
      node.scale.set(0.85, 0.85, scale)
    })
  })

  return (
    <Instances limit={count} range={count}>
      <boxGeometry args={[0.08, 0.08, 0.3]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      {packets.map((packet, index) => (
        <Instance
          key={`packet-${packet.laneIndex}-${index}`}
          ref={(node) => { instanceRefs.current[index] = node as THREE.Object3D | null }}
        />
      ))}
    </Instances>
  )
}

export function TelemetryBars({
  count,
  color,
  intensity,
  patternOffset,
}: {
  count: number
  color: string
  intensity: number
  patternOffset: number
}) {
  const refs = useRef<Array<THREE.Object3D | null>>([])

  const positions = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        x: (index - (count - 1) / 2) * 0.26,
        z: -3.2 + (index % 3) * -0.2,
        phase: index * 0.23 + patternOffset * 0.7,
      })),
    [count, patternOffset]
  )

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime

    positions.forEach((bar, index) => {
      const node = refs.current[index]

      if (!node) return

      const wave = Math.sin(elapsed * 1.65 + bar.phase) * 0.5 + 0.5
      const crest = Math.cos(elapsed * 0.8 + index * 0.28 + patternOffset) * 0.5 + 0.5
      const height = 0.4 + (wave * 1.45 + crest * 0.55) * intensity

      node.position.set(bar.x, -1.45 + height * 0.5, bar.z)
      node.scale.set(0.9, height, 0.9)
    })
  })

  return (
    <Instances limit={count} range={count}>
      <boxGeometry args={[0.16, 1, 0.16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} transparent opacity={0.78} />
      {positions.map((_, index) => (
        <Instance
          key={`bar-${index}`}
          ref={(node) => { refs.current[index] = node as THREE.Object3D | null }}
        />
      ))}
    </Instances>
  )
}

export function ScanSweep({
  color,
  width = 6.4,
  intensity,
  depth = 0.18,
}: {
  color: string
  width?: number
  intensity: number
  depth?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return

    const elapsed = state.clock.elapsedTime
    const y = Math.sin(elapsed * 0.9) * 1.35
    const material = ref.current.material as THREE.MeshBasicMaterial

    ref.current.position.y = y
    material.opacity = 0.08 + intensity * 0.04
  })

  return (
    <mesh ref={ref} position={[0, 0, depth]}>
      <planeGeometry args={[width, 0.08]} />
      <meshBasicMaterial color={color} transparent opacity={0.14} />
    </mesh>
  )
}
