import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, useGLTF, Environment, ContactShadows, Stars } from '@react-three/drei';
import * as THREE from 'three';

// A simple Book component
const Book = ({ position, rotation, color, title }) => {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.2;
      mesh.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <group position={position} rotation={rotation} ref={mesh}>
        {/* Book Cover */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 2, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
        {/* Book Pages */}
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[1.35, 1.9, 0.28]} />
          <meshStandardMaterial color="white" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

// A simple Paper component
const Paper = ({ position, rotation }) => {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.3;
      mesh.current.position.y += Math.sin(state.clock.elapsedTime) * 0.005;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={3}>
      <mesh position={position} rotation={rotation} ref={mesh}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#f8fafc" side={THREE.DoubleSide} roughness={0.9} />
      </mesh>
    </Float>
  );
};

const SceneItems = () => {
  const books = [
    { pos: [-3, 1, -2], rot: [0.2, 0.5, 0], color: '#6366f1' },
    { pos: [3, -1, -3], rot: [-0.2, -0.3, 0.1], color: '#ec4899' },
    { pos: [1, 2, -4], rot: [0.1, 0.8, -0.1], color: '#2dd4bf' },
    { pos: [-2, -2, -1], rot: [0.5, -0.1, 0.2], color: '#f59e0b' },
  ];

  const papers = [
    { pos: [-1, 0, -2], rot: [0.3, 0, 0.1] },
    { pos: [2, 1, -1], rot: [-0.2, 0.4, -0.2] },
    { pos: [0, -1.5, -3], rot: [0.1, -0.2, 0.3] },
  ];

  const groupRef = useRef();
  
  useFrame((state, delta) => {
    // Slowly rotate the entire group of books and papers
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {books.map((b, i) => (
        <Book key={`book-${i}`} position={b.pos} rotation={b.rot} color={b.color} />
      ))}
      {papers.map((p, i) => (
        <Paper key={`paper-${i}`} position={p.pos} rotation={p.rot} />
      ))}
      
      {/* Central decorative element */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#818cf8" wireframe={true} transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

export default function ThreeDScene() {
  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#6366f1" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <SceneItems />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 3}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
