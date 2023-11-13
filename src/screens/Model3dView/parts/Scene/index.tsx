import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  useAnimatedSensor,
  SensorType,
  AnimatedSensor,
  Value3D
} from 'react-native-reanimated'
import { useRef } from 'react'

export const Scene = ({
  animatedSensor
}: {
  animatedSensor: AnimatedSensor<Value3D>
}) => {
  const boxMeshRef = useRef<THREE.Mesh>(null)
  const octahedronMeshRef = useRef<THREE.Mesh>(null)
  useThree(({ camera }) => {
    camera.rotation.set(THREE.MathUtils.degToRad(1), 0, 0)
  })
  useFrame((state, delta) => {
    let { x, y, z } = animatedSensor.sensor.value
    x = ~~(x * 100) / 5000
    y = ~~(y * 100) / 5000
    if (boxMeshRef.current) {
      boxMeshRef.current.rotation.x += x
      boxMeshRef.current.rotation.z += y
    }

    if (octahedronMeshRef.current) {
      octahedronMeshRef.current.rotation.y += delta
    }
  })

  return (
    <>
      <ambientLight />
      <pointLight position={[2, 2, 2]} intensity={10} />
      <mesh ref={boxMeshRef} position={[0, 1, 0]}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial color="#f00" />
      </mesh>
      <mesh rotation={[0, 10, 0]} position={[1, -1, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshStandardMaterial attach="material" color="#0f0" />
      </mesh>
      <mesh
        ref={octahedronMeshRef}
        rotation={[0, 10, 0]}
        position={[-1, -1, 0]}
      >
        <octahedronGeometry attach="geometry" args={[0.7]} />
        <meshStandardMaterial attach="material" color="#8989ff" />
      </mesh>
    </>
  )
}
