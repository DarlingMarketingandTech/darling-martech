'use client'

import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  PacketFlow,
  ScanSweep,
  SignalNodes,
  TelemetryBars,
  TraceLines,
} from '@/components/3d/system/SignalPrimitives'
import { getSceneIntensityValue, getTargetIndex } from '@/components/3d/scene-types'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ServicesAmbientProps = {
  activeLayer: 'strategy' | 'build' | 'growth'
  interactiveTarget?: string | null
  className?: string
}

function getScene(activeLayer: ServicesAmbientProps['activeLayer']) {
  if (activeLayer === 'strategy') {
    return {
      bars: 12,
      lanes: [
        { key: 'strategy-0', points: [[-2.8, 1.8, -4.8], [-1.2, 0.9, -4.1], [0.2, 0.1, -3.7], [1.8, -0.3, -4.1]] as [number, number, number][] },
        { key: 'strategy-1', points: [[-2.4, -1.4, -5.1], [-0.8, -0.5, -4], [0.8, 0.4, -3.8], [2.2, 1.2, -4.4]] as [number, number, number][] },
        { key: 'strategy-2', points: [[0, 2.4, -5.8], [0, 0.4, -4.3], [0, -2.1, -5.5]] as [number, number, number][] },
      ],
      nodes: [
        [-1.2, 0.9, -4.1],
        [0.1, 0.05, -3.75],
        [0.8, 0.45, -3.85],
        [0.05, -1.1, -4.85],
      ] as [number, number, number][],
      intensity: 'calm' as const,
    }
  }

  if (activeLayer === 'growth') {
    return {
      bars: 20,
      lanes: [
        { key: 'growth-0', points: [[-3.1, 1.2, -5.1], [-1.4, 1.8, -4.4], [0.7, 1.4, -4], [2.8, 0.2, -4.8]] as [number, number, number][] },
        { key: 'growth-1', points: [[-3.2, -0.2, -5], [-1.1, -0.5, -4.1], [0.9, -0.2, -3.8], [2.9, -0.9, -4.6]] as [number, number, number][] },
        { key: 'growth-2', points: [[-2.8, -1.8, -5.3], [-0.7, -1.2, -4.2], [1.2, -1.4, -4], [3.1, -0.4, -4.9]] as [number, number, number][] },
      ],
      nodes: [
        [-2.2, 1.55, -4.65],
        [-0.2, 1.55, -4.1],
        [1.2, -0.15, -3.85],
        [2.15, -0.75, -4.45],
      ] as [number, number, number][],
      intensity: 'active' as const,
    }
  }

  return {
    bars: 16,
    lanes: [
      { key: 'build-0', points: [[-3.2, 1.8, -5.1], [-1.8, 0.8, -4.3], [-0.2, 1.1, -3.8], [1.7, 0.5, -4.2], [3, 1.1, -4.9]] as [number, number, number][] },
      { key: 'build-1', points: [[-3, -0.1, -5], [-1.3, -0.8, -4.1], [0.4, -0.4, -3.8], [1.8, -1.1, -4.2], [3, -0.4, -4.8]] as [number, number, number][] },
      { key: 'build-2', points: [[-2.5, -2.1, -5.4], [-0.8, -1.2, -4.4], [0.6, -1.7, -4], [2.4, -0.9, -4.8]] as [number, number, number][] },
      { key: 'build-3', points: [[-0.2, 2.4, -5.9], [0.1, 0.4, -4], [0.2, -2, -5.6]] as [number, number, number][] },
    ],
    nodes: [
      [-1.8, 0.8, -4.3],
      [-0.15, 1.05, -3.82],
      [1.75, 0.48, -4.18],
      [0.4, -0.42, -3.82],
      [1.8, -1.08, -4.18],
    ] as [number, number, number][],
    intensity: 'balanced' as const,
  }
}

function Scene({
  activeLayer,
  interactiveTarget,
}: Pick<ServicesAmbientProps, 'activeLayer' | 'interactiveTarget'>) {
  const scene = useMemo(() => getScene(activeLayer), [activeLayer])
  const highlightIndex = getTargetIndex(interactiveTarget ?? null, scene.nodes.length)
  const intensityValue = getSceneIntensityValue(interactiveTarget ? 'active' : scene.intensity)

  return (
    <>
      <ambientLight intensity={0.25} color="#0A0A0A" />
      <pointLight position={[3.5, 4, 3]} intensity={1.08} color="#FF4D00" />
      <pointLight position={[-4, -2, 2]} intensity={0.18} color="#F5F0E8" />
      <fog attach="fog" args={['#0A0A0A', 6.2, 11.5]} />

      <group rotation={[-0.12, 0.16, 0]}>
        <TelemetryBars
          count={scene.bars}
          color="#FF4D00"
          intensity={0.55 + intensityValue * 0.24}
          patternOffset={highlightIndex + 2}
        />
        <TraceLines
          lanes={scene.lanes}
          color="#FF4D00"
          baseOpacity={0.12 + intensityValue * 0.05}
          highlightIndex={highlightIndex}
        />
        <PacketFlow
          lanes={scene.lanes}
          color="#FF4D00"
          intensity={0.78 + intensityValue * 0.2}
          count={activeLayer === 'growth' ? 11 : 9}
        />
        <SignalNodes
          positions={scene.nodes}
          color="#FF4D00"
          intensity={0.74 + intensityValue * 0.2}
          highlightIndex={highlightIndex}
        />
        <ScanSweep color="#FF4D00" intensity={0.82 + intensityValue * 0.18} />
      </group>
    </>
  )
}

export function ServicesAmbient({
  activeLayer,
  interactiveTarget = null,
  className,
}: ServicesAmbientProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className} aria-hidden="true" />
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Scene activeLayer={activeLayer} interactiveTarget={interactiveTarget} />
      </Canvas>
    </div>
  )
}
