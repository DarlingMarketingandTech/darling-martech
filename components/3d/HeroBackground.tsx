'use client'

import { useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group, PointLight } from 'three'
import { PacketFlow, SignalNodes, TraceLines } from '@/components/3d/system/SignalPrimitives'
import { getSceneIntensityValue, getTargetIndex, type SceneInteractiveTarget } from '@/components/3d/scene-types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './HeroBackground.module.css'

interface HeroBackgroundProps {
  readonly mouseX: MutableRefObject<number>
  readonly mouseY: MutableRefObject<number>
  readonly scrollProgress: MutableRefObject<number>
  readonly interactiveTarget?: SceneInteractiveTarget
}

function Scene({
  mouseX,
  mouseY,
  scrollProgress,
  interactiveTarget,
}: HeroBackgroundProps) {
  const groupRef = useRef<Group>(null)
  const accentLightRef = useRef<PointLight>(null)
  const packetIntensityRef = useRef(0.92)

  const lanes = useMemo(
    () => [
      {
        key: 'hero-0',
        points: [
          [-8.4, 3.8, -10.5],
          [-5.8, 2.2, -8.6],
          [-2.1, 1.6, -7.1],
          [2.7, 2.3, -7.8],
          [7.2, 4.4, -10.2],
        ] as [number, number, number][],
      },
      {
        key: 'hero-1',
        points: [
          [-9.1, -0.8, -11.6],
          [-5.7, -1.9, -8.8],
          [-1.6, -0.5, -6.7],
          [2.3, -1.2, -7.9],
          [7.8, -3.1, -11.8],
        ] as [number, number, number][],
      },
      {
        key: 'hero-2',
        points: [
          [-7.6, -4.4, -12.6],
          [-4.1, -2.6, -9.8],
          [-0.2, -2.1, -7.3],
          [4.4, -3.2, -9.1],
          [9.4, -5.3, -13.2],
        ] as [number, number, number][],
      },
      {
        key: 'hero-3',
        points: [
          [-5.6, 5.2, -14.6],
          [-1.6, 3.4, -11.2],
          [2.4, 4.1, -12.4],
          [6.7, 2.1, -15.6],
        ] as [number, number, number][],
      },
    ],
    []
  )

  const nodes = useMemo<[number, number, number][]>(
    () => [
      [-5.9, 2.05, -8.55],
      [-2.05, 1.5, -7.2],
      [2.45, 2.22, -7.75],
      [-1.6, -0.55, -6.7],
      [4.25, -3.15, -9.05],
    ],
    []
  )

  const highlightIndex = getTargetIndex(interactiveTarget ?? null, nodes.length)

  useFrame((state) => {
    const scroll = Math.max(0, Math.min(1, scrollProgress.current))
    const hoverBoost = interactiveTarget ? 0.18 : 0

    packetIntensityRef.current = getSceneIntensityValue('balanced') + scroll * 0.45 + hoverBoost

    if (groupRef.current) {
      groupRef.current.rotation.y += ((mouseX.current * -0.1) + scroll * 0.08 - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.x += ((mouseY.current * 0.08) - groupRef.current.rotation.x) * 0.05
      groupRef.current.position.z += ((scroll * 0.35) - groupRef.current.position.z) * 0.05
    }

    state.camera.position.x += (mouseX.current * -0.85 - state.camera.position.x) * 0.04
    state.camera.position.y += (mouseY.current * 0.7 - state.camera.position.y) * 0.04
    state.camera.position.z += (8 - scroll * 0.45 - state.camera.position.z) * 0.04
    state.camera.lookAt(0, 0, -8.5)

    if (accentLightRef.current) {
      accentLightRef.current.intensity = 0.92 + scroll * 0.4 + hoverBoost
    }
  })

  return (
    <>
      <ambientLight intensity={0.22} color="#0A0A0A" /> {/* NOSONAR */}
      <pointLight ref={accentLightRef} position={[4, 5, 4]} intensity={1} color="#FF4D00" /> {/* NOSONAR */}
      <pointLight position={[-6, -4, 2]} intensity={0.18} color="#F5F0E8" /> {/* NOSONAR */}
      <fog attach="fog" args={['#0A0A0A', 12, 28]} /> {/* NOSONAR */}

      <group ref={groupRef}>
        <TraceLines
          lanes={lanes}
          color="#FF4D00"
          baseOpacity={0.17 + (interactiveTarget ? 0.03 : 0)}
          highlightIndex={highlightIndex}
        />
        <PacketFlow lanes={lanes} color="#FF4D00" intensity={1} intensityRef={packetIntensityRef} count={14} />
        <SignalNodes positions={nodes} color="#FF4D00" intensity={0.88 + (interactiveTarget ? 0.12 : 0)} highlightIndex={highlightIndex} />
      </group>
    </>
  )
}

export function HeroBackground({
  mouseX,
  mouseY,
  scrollProgress,
  interactiveTarget = null,
}: HeroBackgroundProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={`${styles.canvas} ${styles.fallback}`} aria-hidden="true" />
  }

  return (
    <div className={styles.canvas} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Scene
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
          interactiveTarget={interactiveTarget}
        />
      </Canvas>
    </div>
  )
}
