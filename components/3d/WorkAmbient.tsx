'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { PacketFlow, SignalNodes, TraceLines } from '@/components/3d/system/SignalPrimitives'
import { getSceneIntensityValue, getTargetIndex, type SceneInteractiveTarget } from '@/components/3d/scene-types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { WorkTheme, WorkVisualMode } from '@/lib/work'
import styles from './WorkAmbient.module.css'

type AmbientScene = {
  lanes: Array<{ key: string; points: [number, number, number][] }>
  nodes: [number, number, number][]
}

function getSceneByMode(mode: WorkVisualMode): AmbientScene {
  if (mode === 'orbit') {
    return {
      lanes: [
        { key: 'orbit-0', points: [[-4.2, 0.6, -6.5], [-1.9, 2.2, -5.8], [1.3, 1.8, -6.2], [4.1, 0.1, -7.1]] },
        { key: 'orbit-1', points: [[-3.4, -1.8, -7], [-1.1, -0.4, -5.9], [1.9, -0.2, -6.1], [4.3, -1.8, -7.3]] },
        { key: 'orbit-2', points: [[-2.5, 2.8, -8.8], [0.2, 3.4, -7.8], [2.6, 2.1, -8.9]] },
      ],
      nodes: [
        [-3.2, 0.1, -6.4],
        [-1.1, 1.85, -5.85],
        [1.8, 1.35, -6.15],
        [3.9, -0.15, -6.95],
      ],
    }
  }

  if (mode === 'mesh') {
    return {
      lanes: [
        { key: 'mesh-0', points: [[-4.3, 1.6, -7.4], [-1.6, 0.8, -6.1], [1.2, 1.4, -6.5], [4.3, 0.5, -7.2]] },
        { key: 'mesh-1', points: [[-4.4, -1.6, -7.2], [-1, -0.2, -5.9], [1.5, -0.8, -6.2], [4.5, -1.4, -7.4]] },
        { key: 'mesh-2', points: [[-2.8, 2.9, -9.1], [-0.1, 0.3, -6.5], [2.6, -2.1, -8.7]] },
      ],
      nodes: [
        [-3.6, 1.5, -7.15],
        [-1.1, 0.2, -5.95],
        [1.5, 1.2, -6.45],
        [3.8, -1.3, -7.2],
      ],
    }
  }

  if (mode === 'beacon') {
    return {
      lanes: [
        { key: 'beacon-0', points: [[-3.6, 1.9, -7], [-1.4, 0.8, -5.8], [0.2, 0.2, -5.4], [2.7, 1.2, -6.2]] },
        { key: 'beacon-1', points: [[-2.9, -1.4, -7.4], [-0.8, -0.4, -5.9], [0.6, -1.2, -5.5], [3.3, -0.3, -6.5]] },
        { key: 'beacon-2', points: [[0.1, 3.5, -9.5], [0.4, 1.1, -6.9], [0.1, -2.8, -8.9]] },
      ],
      nodes: [
        [-2.8, 1.55, -6.75],
        [0, 0.15, -5.45],
        [2.75, 0.85, -6.15],
        [0.15, 3.1, -8.95],
      ],
    }
  }

  return {
    lanes: [
      { key: 'signal-0', points: [[-4.6, 2.1, -7.5], [-2.4, 1.2, -6.1], [0.2, 1.4, -5.7], [3.1, 2.2, -6.8]] },
      { key: 'signal-1', points: [[-4.4, -1.2, -7.2], [-1.8, -0.4, -5.8], [0.5, -0.6, -5.5], [3.7, -1.9, -6.9]] },
      { key: 'signal-2', points: [[-1.2, 2.9, -8.9], [-0.2, 0.8, -6.3], [0.9, -1.8, -8.2]] },
    ],
    nodes: [
      [-3.9, 1.85, -7.2],
      [-1.5, 0.4, -5.85],
      [0.7, 1.2, -5.65],
      [3.2, -1.65, -6.75],
    ],
  }
}

function Scene({
  accentColor,
  fogColor,
  mode,
  density,
  interactiveTarget,
}: Readonly<{
  accentColor: string
  fogColor: string
  mode: WorkVisualMode
  density: NonNullable<WorkTheme['density']>
  interactiveTarget?: SceneInteractiveTarget
}>) {
  const rigRef = useRef<Group>(null)
  const scene = useMemo(() => getSceneByMode(mode), [mode])
  const highlightIndex = getTargetIndex(interactiveTarget ?? null, scene.nodes.length)
  let intensity: 'calm' | 'balanced' | 'active' = 'balanced'
  let packetCount = 9

  if (density === 'calm') {
    intensity = 'calm'
    packetCount = 6
  } else if (density === 'kinetic') {
    intensity = 'active'
    packetCount = 12
  }

  const intensityValue = getSceneIntensityValue(intensity)

  useFrame((state) => {
    if (!rigRef.current) return

    rigRef.current.rotation.y = state.pointer.x * 0.12
    rigRef.current.rotation.x = -state.pointer.y * 0.08
  })

  return (
    <>
      <ambientLight intensity={0.25} color={fogColor} /> {/* NOSONAR */}
      <pointLight position={[4, 4, 4]} intensity={1.05} color={accentColor} /> {/* NOSONAR */}
      <pointLight position={[-6, -2, 2]} intensity={0.22} color="#F5F0E8" /> {/* NOSONAR */}
      <fog attach="fog" args={[fogColor, 7, 16]} /> {/* NOSONAR */}

      <group ref={rigRef}>
        <TraceLines
          lanes={scene.lanes}
          color={accentColor}
          baseOpacity={0.12 + intensityValue * 0.04}
          highlightIndex={highlightIndex}
        />
        <PacketFlow lanes={scene.lanes} color={accentColor} intensity={0.85 + intensityValue * 0.18} count={packetCount} />
        <SignalNodes
          positions={scene.nodes}
          color={accentColor}
          intensity={0.82 + intensityValue * 0.16}
          highlightIndex={highlightIndex}
        />
      </group>
    </>
  )
}

export function WorkAmbient({
  mode = 'signal',
  density = 'balanced',
  className,
  interactiveTarget = null,
}: Readonly<{
  mode?: WorkVisualMode
  density?: NonNullable<WorkTheme['density']>
  className?: string
  interactiveTarget?: SceneInteractiveTarget
}>) {
  const reducedMotion = useReducedMotion()

  const colors = useMemo(() => {
    if (globalThis.window === undefined) {
      return { accent: '#FF4D00', base: '#0A0A0A' }
    }

    const root = globalThis.document.documentElement
    const computedStyles = getComputedStyle(root)
    const accent = computedStyles.getPropertyValue('--color-accent').trim() || '#FF4D00'
    const base = computedStyles.getPropertyValue('--color-base').trim() || '#0A0A0A'

    return { accent, base }
  }, [])

  if (reducedMotion) {
    return <div className={`${styles.canvas} ${styles.fallback} ${className ?? ''}`} aria-hidden="true" />
  }

  return (
    <div className={`${styles.canvas} ${className ?? ''}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Scene
          accentColor={colors.accent}
          fogColor={colors.base}
          mode={mode}
          density={density}
          interactiveTarget={interactiveTarget}
        />
      </Canvas>
    </div>
  )
}
