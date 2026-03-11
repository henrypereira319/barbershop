'use client'

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { Environment, ContactShadows, Float, Html, useProgress, useGLTF } from "@react-three/drei";

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
function ModelGLTF({ url, rotationProgress }: { url: string; rotationProgress: MotionValue<number> }) {
  const { scene } = useGLTF(url);
  
  // Clone the model so we can mutate its transforms safely without affecting the cached version
  const model = useMemo(() => {
    const cloned = scene.clone();
    
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
    
    return cloned;
  }, [scene]);

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
  url = "/result.glb",
  rotationProgress
}: { 
  className?: string; 
  url?: string;
  rotationProgress: MotionValue<number>;
}) {
  return (
    <div className={className}>
      <Canvas shadows camera={{ position: [0, 2, 7], fov: 45 }}>
        <ambientLight intensity={0.4} color="#ffebd6" />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} color="#ffd4a3" castShadow />
        <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={0.6} color="#ffebd6" />
        <Environment preset="city" />
        
        <Suspense fallback={<LoaderFallback />}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <ModelGLTF 
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

// Preload the model
useGLTF.preload("/result.glb");
