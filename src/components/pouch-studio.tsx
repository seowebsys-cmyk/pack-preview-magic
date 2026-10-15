import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import {
  buildPouchGeometry,
  buildPouchTexture,
  type PouchType,
} from "@/lib/pouch";

const POUCH_TYPES: { id: PouchType; label: string; blurb: string }[] = [
  { id: "doypack", label: "Doypack", blurb: "Stand-up classic" },
  { id: "flat-bottom", label: "Flat Bottom", blurb: "Boxy & shelf-ready" },
  { id: "gusset", label: "Gusset", blurb: "Side-fold value" },
];

const POUCH_COLORS = [
  { id: "White", value: "#f4f1ea" },
  { id: "Kraft", value: "#b0825a" },
  { id: "Black", value: "#1c1a18" },
];

type Finish = "matte" | "gloss";

function PouchMesh({
  type,
  color,
  finish,
  logo,
}: {
  type: PouchType;
  color: string;
  finish: Finish;
  logo: HTMLImageElement | null;
}) {
  const geometry = useMemo(() => buildPouchGeometry(type), [type]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const texture = useMemo(
    () => buildPouchTexture({ baseColor: color, logo, type }),
    [color, logo, type],
  );
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh geometry={geometry} position={[0, -1.3, 0]} castShadow>
      <meshStandardMaterial
        map={texture}
        roughness={finish === "matte" ? 0.6 : 0.15}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function PouchStudio() {
  const [type, setType] = useState<PouchType>("doypack");
  const [color, setColor] = useState(POUCH_COLORS[0]?.value ?? "#f4f1ea");
  const [finish, setFinish] = useState<Finish>("matte");
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setLogo(img);
      setLogoName(file.name);
    };
    img.src = url;
  }

  function downloadMockup() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `roasterpack-${type}-mockup.png`;
    a.click();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Controls */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Step 1 — Pouch style
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {POUCH_TYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setType(p.id)}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                  type === p.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <span className="block text-sm font-bold">{p.label}</span>
                <span
                  className={`mt-0.5 block text-xs ${
                    type === p.id
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {p.blurb}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Step 2 — Material &amp; finish
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {POUCH_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.id}
                onClick={() => setColor(c.value)}
                className={`h-10 w-10 rounded-full border-2 transition-transform ${
                  color === c.value
                    ? "scale-110 border-primary"
                    : "border-border"
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
            <label
              className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-border"
              title="Custom color"
            >
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                }}
              />
            </label>
            <div className="ml-2 inline-flex rounded-full border border-border bg-card p-1">
              {(["matte", "gloss"] as Finish[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(f)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition-colors ${
                    finish === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Step 3 — Your brand
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-6 py-8 text-center transition-colors hover:bg-secondary"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
              />
            </svg>
            <span className="text-sm font-semibold">
              {logoName ? logoName : "Upload your logo"}
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG or SVG — your file never leaves your browser
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadMockup}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Download mockup
          </button>
          <a
            href="#sample"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
          >
            Get a free sample
          </a>
        </div>
      </div>

      {/* 3D preview */}
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-card lg:min-h-[560px]">
        <Canvas
          shadows
          camera={{ position: [0, 0.6, 5.2], fov: 38 }}
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            canvasRef.current = gl.domElement;
          }}
        >
          <ambientLight intensity={0.35} />
          <Environment>
            <Lightformer
              intensity={2.2}
              position={[0, 5, 2]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={1.1}
              color="#cfe0ff"
              position={[-5, 1, -1]}
              rotation-y={Math.PI / 2}
              scale={[20, 1, 1]}
            />
            <Lightformer
              intensity={0.9}
              color="#ffe8cf"
              position={[5, 2, 1]}
              rotation-y={-Math.PI / 2}
              scale={[20, 1, 1]}
            />
          </Environment>
          <PouchMesh type={type} color={color} finish={finish} logo={logo} />
          <ContactShadows
            position={[0, -1.32, 0]}
            opacity={0.35}
            scale={8}
            blur={2.6}
            far={3}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.4}
            minPolarAngle={Math.PI / 2.6}
            maxPolarAngle={Math.PI / 1.9}
          />
        </Canvas>
        <p className="pointer-events-none absolute bottom-4 left-0 w-full text-center text-xs font-medium tracking-wide text-muted-foreground">
          Drag to rotate — live preview, not a final print proof
        </p>
      </div>
    </div>
  );
}
