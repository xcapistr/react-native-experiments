import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  useAnimatedSensor,
  SensorType,
  AnimatedSensor,
  Value3D
} from 'react-native-reanimated'
import { useMemo, useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

export const Scene = ({
  animatedSensor
}: {
  animatedSensor: AnimatedSensor<Value3D>
}) => {
  const obj = useLoader(STLLoader, require('../../model/monkey.stl'))

  return (
    <>
      <ambientLight />
      <pointLight position={[2, 2, 2]} intensity={10} />

      {obj && (
        <mesh
          position={[0, 0, 0]}
          rotation={[-1.2, 0, 1]}
          geometry={obj}
          scale={0.5}
        >
          <meshStandardMaterial color="#0ff" />
        </mesh>
      )}
    </>
  )
}
