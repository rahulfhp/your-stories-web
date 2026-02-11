import { Globe, Star, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import RevealOnScroll from "./RevealOnScroll";

const Globe3D = () => {
  const containerRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe Core (Dark Sphere)
    const coreGeometry = new THREE.SphereGeometry(1, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x020617, // Slate-950
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    // 2. Globe Dots (Points)
    const dotGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const dotMaterial = new THREE.PointsMaterial({
      color: 0x4dd0e1, // Cyan theme color
      size: 0.012,
      transparent: true,
      opacity: 0.6,
    });
    const globeDots = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(globeDots);

    // 3. Locations Data & Pins
    const locations = [
      { lat: 20.6, lon: 79.0, country: "India", users: "2.1M+", rating: "4.7" },
      { lat: 37.1, lon: -95.7, country: "USA", users: "1.2M+", rating: "4.3" },
      { lat: 51.5, lon: -0.1, country: "UK", users: "500K+", rating: "4.5" },
      {
        lat: -14.2,
        lon: -51.9,
        country: "Brazil",
        users: "400K+",
        rating: "4.8",
      },
      {
        lat: 51.2,
        lon: 10.4,
        country: "Germany",
        users: "300K+",
        rating: "4.3",
      },
      {
        lat: 36.2,
        lon: 138.3,
        country: "Japan",
        users: "250K+",
        rating: "4.7",
      },
      {
        lat: 55.7,
        lon: 37.6,
        country: "Russia",
        users: "200K+",
        rating: "4.5",
      },
      {
        lat: -25.3,
        lon: 133.8,
        country: "Australia",
        users: "150K+",
        rating: "4.3",
      },
      {
        lat: 56.1,
        lon: -106.3,
        country: "Canada",
        users: "180K+",
        rating: "4.7",
      },
      { lat: 46.2, lon: 2.2, country: "France", users: "220K+", rating: "4.5" },
      { lat: 41.9, lon: 12.6, country: "Italy", users: "190K+", rating: "4.3" },
      {
        lat: -30.6,
        lon: 22.9,
        country: "South Africa",
        users: "120K+",
        rating: "4.8",
      },
      {
        lat: 23.6,
        lon: -102.5,
        country: "Mexico",
        users: "160K+",
        rating: "4.7",
      },
      {
        lat: 35.9,
        lon: 127.8,
        country: "South Korea",
        users: "140K+",
        rating: "4.3",
      },
      { lat: 23.4, lon: 53.8, country: "UAE", users: "90K+", rating: "4.9" },
    ];

    const pinMeshes = [];

    const latLonToVector3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const pinGeometry = new THREE.SphereGeometry(0.025, 16, 16);
    const ringGeo = new THREE.RingGeometry(0.03, 0.035, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });

    locations.forEach((loc) => {
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      const pos = latLonToVector3(loc.lat, loc.lon, 1.02);
      pin.position.copy(pos);
      pin.userData = loc;
      globeGroup.add(pin);
      pinMeshes.push(pin);

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.005));
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
    });

    const applyResponsiveSettings = () => {
      const width = container.clientWidth;
      let cameraZ = 2.5;
      let scale = 1;
      let dotSize = 0.012;

      if (width < 480) {
        cameraZ = 3.2;
        scale = 0.9;
        dotSize = 0.009;
      } else if (width < 768) {
        cameraZ = 2.9;
        scale = 0.95;
        dotSize = 0.01;
      } else if (width < 1024) {
        cameraZ = 2.7;
        scale = 1;
        dotSize = 0.011;
      }

      camera.position.z = cameraZ;
      globeGroup.scale.setScalar(scale);
      dotMaterial.size = dotSize;
    };

    applyResponsiveSettings();

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPos({ x: event.clientX, y: event.clientY });
    };

    container.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();

      // Raycast check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const intersectedPin = intersects[0].object;
        setTooltipData(intersectedPin.userData);
        container.style.cursor = "pointer";
        // Reset all scales first
        pinMeshes.forEach((pin) => pin.scale.set(1, 1, 1));
        intersectedPin.scale.set(1.5, 1.5, 1.5);
        controls.autoRotate = false; // Pause rotation on hover
      } else {
        setTooltipData(null);
        container.style.cursor = "grab";
        pinMeshes.forEach((pin) => pin.scale.set(1, 1, 1));
        controls.autoRotate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      applyResponsiveSettings();
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      pinGeometry.dispose();
      pinMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full lg:h-[85vh] absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
      />
      {tooltipData && (
        <div
          className="fixed z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2.5 animate-fade-in"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <h3 className="font-bold text-white text-lg mb-1">
            {tooltipData.country}
          </h3>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-1">
              <Users size={14} className="text-cyan-400" />
              <span>{tooltipData.users}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span>{tooltipData.rating}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function TrustedBySection() {
  return (
    <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-14 lg:pb-16 bg-slate-950 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-slate-950 rounded-[3rem] text-white relative overflow-hidden text-center shadow-2xl shadow-cyan-900/10 h-[520px] sm:h-[620px] md:h-[720px] lg:h-[800px] border border-slate-900">
          {/* 3D Globe Container */}
          <Globe3D />

          {/* Overlay Content */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center gap-12 sm:gap-20 md:gap-28 lg:gap-40 z-10 py-8 sm:py-10 lg:py-12">
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
              <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 rounded-full text-cyan-400 font-bold uppercase text-xs tracking-wider mb-8 border border-slate-800/50 backdrop-blur-sm">
                  <Globe size={14} />
                  <span>Reclaiming Digital Lives Globally</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight drop-shadow-xl text-white">
                  Trusted by{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4]">
                    5 Million+
                  </span>{" "}
                  Users
                </h2>
                <p className="text-slate-400 text-base sm:text-lg md:text-xl mb-4 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Spin the globe to explore our impact.
                </p>
              </RevealOnScroll>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto max-w-2xl mx-auto px-6 w-full">
              {[
                { val: "5M+", label: "Downloads" },
                { val: "4.3", label: "Rating" },
                { val: "180+", label: "Countries" },
                { val: "25+", label: "Languages" },
              ].map((stat, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="p-2 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/50 hover:bg-slate-800/80 transition-colors text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.val}
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
