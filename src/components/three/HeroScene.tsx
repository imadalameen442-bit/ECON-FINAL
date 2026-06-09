import { useEffect, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/* A single machined gold coin: beveled cylinder + rim. */
function Coin({
  position,
  scale = 1,
  speed = 1,
  color = "#f5c45e",
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6 * speed;
  });
  return (
    <Float speed={1.4 * speed} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={scale} rotation={[Math.PI / 2.6, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1, 1, 0.16, 64]} />
          <meshStandardMaterial
            color={color}
            metalness={1}
            roughness={0.28}
            envMapIntensity={1.4}
          />
        </mesh>
        {/* raised rim */}
        <mesh>
          <torusGeometry args={[0.92, 0.06, 16, 64]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

/* Drifting particle field representing compounding growth. */
function Particles({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const emerald = new THREE.Color("#2ee6a8");
    const gold = new THREE.Color("#f5c45e");
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r - 4;
      const c = Math.random() > 0.5 ? emerald : gold;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Camera gently follows the pointer for parallax depth. */
function ParallaxRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  useFrame(() => {
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(target);
  });
  return null;
}

function Scene() {
  const coins = useMemo(
    () =>
      [
        { position: [-3.2, 1.4, 0], scale: 1.1, speed: 1, color: "#f5c45e" },
        { position: [3.4, -0.6, -1], scale: 1.4, speed: 0.8, color: "#ffd98a" },
        { position: [0.4, 2.2, -2], scale: 0.8, speed: 1.3, color: "#34f5c5" },
        { position: [-2.2, -1.8, -1.5], scale: 0.9, speed: 1.1, color: "#2ee6a8" },
        { position: [2.0, 1.8, -3], scale: 0.7, speed: 1.2, color: "#f5c45e" },
        { position: [-4.2, -0.4, -3], scale: 0.6, speed: 0.9, color: "#ffd98a" },
      ] as const,
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#fff6e0" />
      <directionalLight position={[-6, -2, -3]} intensity={1.1} color="#2ee6a8" />
      <Environment preset="city" />
      <Particles />
      {coins.map((c, i) => (
        <Coin key={i} position={c.position as [number, number, number]} scale={c.scale} speed={c.speed} color={c.color} />
      ))}
      <ParallaxRig />
    </>
  );
}

export function HeroScene() {
  // r3f's first measure can fire before the dvh/flex layout settles (especially
  // behind a lazy boundary), leaving the canvas at its default 300x150. Nudging
  // a resize on the next frames guarantees it sizes to the container.
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    const r = requestAnimationFrame(fire);
    const t = setTimeout(fire, 120);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 42 }}
    >
      <Suspense fallback={null}>
        <Scene />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
