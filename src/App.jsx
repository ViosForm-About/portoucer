import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaPython, FaJs, FaPhp } from "react-icons/fa";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, MeshDistortMaterial } from "@react-three/drei";
import avatar from "./assets/avatar.png";

/* ================= BLACKHOLE SHADER ================= */
function BlackHole() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.elapsedTime * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.3, 64, 64]} />
      <MeshDistortMaterial
        color="#000"
        distort={0.6}
        speed={3}
        emissive="#5500ff"
      />
    </mesh>
  );
}

/* ================= PARTICLES FOLLOW MOUSE ================= */
function MouseParticles() {
  const ref = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    ref.current.position.x = mouse.x * 3;
    ref.current.position.y = mouse.y * 3;
  });

  return <Stars ref={ref} radius={20} depth={10} count={2000} factor={2} />;
}

export default function App() {
  return (
    <div className="container">
      {/* INTRO GLITCH TEXT */}
      <motion.div
        className="intro glitch"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 2 }}
      >
        CYBER SYSTEM BOOTING...
      </motion.div>

      {/* PROFILE */}
      <motion.div
        className="profile"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
      >
        <img src={avatar} className="avatar" />
        <h2 className="glitch">Kevin Nelson</h2>
        <p>Cyber Fullstack Developer</p>

        <div className="icons">
          <FaPython />
          <FaJs />
          <FaPhp />
        </div>

        <a className="btn" href="#">Access Profile</a>

        <p className="desc">
          Cyberpunk profile dengan React + Vite.
          Blackhole shader, glitch text, dan particle interaktif
          mengikuti mouse secara presisi. Ringan dan siap deploy.
        </p>

        <div className="three">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={2} />
            <BlackHole />
            <MouseParticles />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </motion.div>
    </div>
  );
}