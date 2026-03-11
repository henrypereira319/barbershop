'use client'

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import * as THREE from "three";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import JSZip from "jszip";

// 3MFLoader needs JSZip to be available globally to decompress the 3MF package
if (typeof window !== "undefined") {
  (window as any).JSZip = JSZip;
}

// Model Component
function Model3MF({ url, rotationProgress }: { url: string; rotationProgress: MotionValue<number> }) {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new ThreeMFLoader();
    
    loader.load(
      url, 
      (object) => {
        if (!isMounted) return;
        try {
          console.log("3MFLoader success! Object:", object);
          const box = new THREE.Box3().setFromObject(object);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 5 / maxDim;
          
          object.position.x = -center.x * scale;
          object.position.y = -center.y * scale;
          object.position.z = -center.z * scale;
          object.scale.setScalar(scale);
          
          object.rotation.x = -Math.PI / 2;

          setModel(object);
        } catch (err) {
          console.error("Error processing loaded 3MF object:", err);
          debugger;
        }
      },
      (progress) => {
        console.log("3MFLoader progress:", (progress.loaded / progress.total) * 100, "%");
      },
      (error) => {
        console.error("3MFLoader failed to load file:", error);
        debugger;
      }
    );

    return () => { isMounted = false; };
  }, [url]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && rotationProgress) {
      groupRef.current.rotation.y = (rotationProgress.get() * Math.PI * 2) - Math.PI / 4;
    }
  });

  if (!model) return null;

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

// Viewer Wrapper Component
export function ThreeDViewer({ 
  className,
  url = "/reduced_color.3mf",
  rotationProgress
}: { 
  className?: string; 
  url?: string;
  rotationProgress: MotionValue<number>;
}) {
  return (
    <div className={className}>
      <Canvas shadows camera={{ position: [0, 2, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <Model3MF 
             url={url} 
             rotationProgress={rotationProgress}
          />
        </Float>
        
        {/* Soft shadow plane underneath */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
