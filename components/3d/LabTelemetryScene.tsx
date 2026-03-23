'use client'

import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { TelemetryBars, TraceLines, PacketFlow, SignalNodes, ScanSweep } from '@/components/3d/system/SignalPrimitives'
import { getSceneIntensityValue, getTargetIndex } from '@/components/3d/scene-types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './LabTelemetryScene.module.css'

type LabTelemetrySceneProps = {
  activeCategory: string
  hoveredTool?: string | null
  intensity?: 'calm' | 'balanced' | 'active'
}

function Scene({
  activeCategory,
  hoveredTool,
  intensity,
}: Required<LabTelemetrySceneProps>) {
  const categoryIndex = useMemo(
    () => Math.max(0, ['All', 'Marketing', 'Developer', 'Technologist'].indexOf(activeCategory)),
    [activeCategory]
  )

  const lanes = useMemo(
    () => [
      { key: 'lab-0', points: [[-3.3, 1.1, -2.6], [-1.2, 0.5, -2.3], [1.6, 0.9, -2.6], [3.1, 0.2, -2.5]] as [number, number, number][] },
      { key: 'lab-1', points: [[-3.1, -0.2, -2.8], [-1.7, -0.7, -2.4], [0.4, -0.25, -2.3], [2.9, -0.8, -2.6]] as [number, number, number][] },
      { key: 'lab-2', points: [[-3.2, -1.4, -2.9], [-0.9, -0.9, -2.5], [1.3, -1.2, -2.4], [3.2, -0.55, -2.7]] as [number, number, number][] },
    ],
    []
  )

  const nodes = useMemo<[number, number, number][]>(
    () => [
      [-2.95, 1.2, -2.45],
      [-0.7, 0.15, -2.25],
      [1.45, 1.05, -2.4],
      [2.85, -0.85, -2.4],
    ],
    []
  )

  const highlightIndex = getTargetIndex(hoveredTool, nodes.length)
  const scalar = getSceneIntensityValue(intensity) + categoryIndex * 0.08

  return (
    <>
      <ambientLight intensity={0.28} color="#0A0A0A" />
      <pointLight position={[3.5, 4, 3]} intensity={1.05} color="#FF4D00" />
      <pointLight position={[-4, -2, 1]} intensity={0.2} color="#F5F0E8" />
      <fog attach="fog" args={['#0A0A0A', 6.5, 12]} />

      <group rotation={[-0.14, 0.12, 0]}>
        <TelemetryBars count={28} color="#FF4D00" intensity={0.72 * scalar} patternOffset={categoryIndex + highlightIndex + 1} />
        <TraceLines lanes={lanes} color="#FF4D00" baseOpacity={0.14 + categoryIndex * 0.025} highlightIndex={highlightIndex} />
        <PacketFlow lanes={lanes} color="#FF4D00" intensity={0.8 * scalar} count={9} />
        <SignalNodes positions={nodes} color="#FF4D00" intensity={0.7 * scalar} highlightIndex={highlightIndex} />
        <ScanSweep color="#FF4D00" intensity={0.9 * scalar} />
      </group>
    </>
  )
}

export function LabTelemetryScene({
  activeCategory,
  hoveredTool = null,
  intensity = 'balanced',
}: LabTelemetrySceneProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={`${styles.shell} ${styles.fallback}`} aria-hidden="true" />
  }

  return (
    <div className={styles.shell} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Scene activeCategory={activeCategory} hoveredTool={hoveredTool} intensity={intensity} />
      </Canvas>
    </div>
  )
}
