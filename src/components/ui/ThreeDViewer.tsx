'use client'

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import * as THREE from "three";
import { Environment, ContactShadows, Float, Html, useProgress } from "@react-three/drei";
import JSZip from "jszip";

// Three.js 3MFLoader fallback requires JSZip on the global window object if fflate fails
if (typeof window !== "undefined") {
  // @ts-ignore
  window.JSZip = JSZip;
  // @ts-ignore
  globalThis.JSZip = JSZip;
}

function LoaderFallback() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-lg font-medium whitespace-nowrap">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}

// Model Component
function Model3MF({ url, rotationProgress }: { url: string; rotationProgress: MotionValue<number> }) {
  const originalModel = useLoader(ThreeMFLoader, url);
  
  // Clone the model so we can mutate its transforms safely without affecting the cached version
  const model = useMemo(() => {
    const cloned = originalModel.clone();
    
    // Auto-center and scale
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;
    
    cloned.position.x = -center.x * scale;
    cloned.position.y = -center.y * scale;
    cloned.position.z = -center.z * scale;
    cloned.scale.setScalar(scale);
    
    cloned.rotation.x = -Math.PI / 2;
    
    return cloned;
  }, [originalModel]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && rotationProgress) {
      groupRef.current.rotation.y = (rotationProgress.get() * Math.PI * 2) - Math.PI / 4;
    }
  });

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
        
        <Suspense fallback={<LoaderFallback />}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <Model3MF 
               url={url} 
               rotationProgress={rotationProgress}
            />
          </Float>
        </Suspense>
        
        {/* Soft shadow plane underneath */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}

