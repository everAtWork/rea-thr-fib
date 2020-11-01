import React, { useRef, useState } from "react";
import './App.scss';

import { Canvas, useFrame } from 'react-three-fiber';

import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
softShadows();


const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh onClick={() => setExpand(!expand)}
      scale={props.scale} castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial speed={1} factor={0.4} attach='material' color={color} />
    </a.mesh>
  )
}
function App() {
  return (
    <div className="App">
      <Canvas shadowMap colorManagement camera={{ position: [-15, 2, 10], fov: 70 }}>
        <ambientLight intensity={0.3}></ambientLight>
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.15}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5}></pointLight>
        <pointLight position={[0, -10, 0]} intensity={0.5}></pointLight>

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.4} />
          </mesh>
        </group>

        <SpinningMesh speed={4} position={[3, 2, 2]} args={[2, 2, 1]} color='orange'></SpinningMesh>
        <SpinningMesh speed={6} position={[5, 6, -3]} args={[4, 2, 1]} color='lightblue'></SpinningMesh>
        <SpinningMesh speed={2} position={[7, 6, 7]} args={[2, 4, 1]} color='pink'></SpinningMesh>
        <OrbitControls />
      </Canvas>
    </div >
  );
}

export default App;
