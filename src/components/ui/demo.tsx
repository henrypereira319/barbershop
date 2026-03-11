'use client'

import { ThreeDViewer } from "@/components/ui/ThreeDViewer";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function SplineSceneBasic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // We pass the scrollYProgress directly to ThreeDViewer which handles rotation
  // using React Three Fiber's useFrame.

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-6xl h-[600px] bg-background/[0.96] relative overflow-hidden flex flex-col md:flex-row shadow-[0_0_40px_rgba(38,30,22,0.8)] border-gold/20">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#ffebd6"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-gold">
            Nossa Barbearia em 3D
          </h1>
          <p className="mt-4 text-muted-foreground font-body max-w-lg text-lg">
            Explore o ambiente clássico e detalhista que preparamos para você. Um espaço pensado para elevar a arte do corte perfeito e o cuidado autêntico masculino.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative cursor-grab active:cursor-grabbing">
            <ThreeDViewer 
              className="w-full h-full min-h-[400px]"
              rotationProgress={scrollYProgress}
            />
        </div>
      </div>
    </Card>
  </div>
</div>
  )
}
