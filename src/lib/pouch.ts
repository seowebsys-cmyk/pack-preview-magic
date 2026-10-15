import * as THREE from "three";

export type PouchType = "doypack" | "flat-bottom" | "gusset";

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * Builds a parametric coffee pouch: a vertical tube whose cross-section is a
 * superellipse that changes width, depth and roundness along the height.
 * The top ~10% is pinched into a flat seal fin; the silhouette tapers gently
 * toward the top so the body reads as a filled bag, not a pillow.
 * Front face is +Z, UV u=0.75 is the front-center (texture space).
 */
export function buildPouchGeometry(type: PouchType): THREE.BufferGeometry {
  const radial = 128;
  const heightSeg = 110;
  const H = 2.6;
  const SEAL_T = 0.9;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let j = 0; j <= heightSeg; j++) {
    const t = j / heightSeg;

    let w = 1;
    let d = 0.42;
    let n = 3; // superellipse exponent: 2 = ellipse, >2 boxy, <2 concave

    if (type === "doypack") {
      // Bottom gusset: nearly flat at the base, opens up going up
      const bg = smoothstep(0, 0.25, t);
      d = 0.08 + 0.37 * bg;
      w = 0.88 + 0.12 * bg;
      n = 3.4;
      // Gentle shoulder so the bag narrows toward the seal
      const shoulder = smoothstep(0.55, SEAL_T, t);
      w *= 1 - 0.07 * shoulder;
      d *= 1 - 0.18 * shoulder;
    } else if (type === "flat-bottom") {
      // Boxy, stable base with a crisp corner
      const bg = smoothstep(0, 0.03, t);
      d = 0.33 + 0.07 * bg;
      w = 1 - 0.05 * smoothstep(0.6, SEAL_T, t);
      n = 5.2;
    } else {
      // Side gussets: concave sides read as folded-in creases
      n = 1.6;
      w = 0.95 - 0.05 * smoothstep(0.6, SEAL_T, t);
      d = 0.48 * (1 - 0.22 * smoothstep(0.6, SEAL_T, t));
    }

    // Pinch the body into a flat seal fin at the very top
    const seal = smoothstep(SEAL_T - 0.025, SEAL_T, t);
    if (seal > 0) {
      d = d * (1 - seal) + 0.035 * seal;
      n = n * (1 - seal) + 2 * seal;
    }

    const e = 2 / n;
    for (let i = 0; i <= radial; i++) {
      const th = -Math.PI + (i / radial) * Math.PI * 2;
      const c = Math.cos(th);
      const s = Math.sin(th);
      const x = w * Math.sign(c) * Math.pow(Math.abs(c), e);
      const z = d * Math.sign(s) * Math.pow(Math.abs(s), e);
      positions.push(x, t * H, z);
      uvs.push(i / radial, t);
    }
  }

  const row = radial + 1;
  for (let j = 0; j < heightSeg; j++) {
    for (let i = 0; i < radial; i++) {
      const a = j * row + i;
      const b = a + 1;
      const cIdx = a + row;
      const dIdx = cIdx + 1;
      indices.push(a, cIdx, b, b, cIdx, dIdx);
    }
  }

  // Bottom cap fan
  const bottomCenter = positions.length / 3;
  positions.push(0, 0, 0);
  uvs.push(0.5, 0);
  for (let i = 0; i < radial; i++) indices.push(bottomCenter, i + 1, i);

  // Top cap fan
  const topCenter = positions.length / 3;
  positions.push(0, H, 0);
  uvs.push(0.5, 1);
  const topStart = heightSeg * row;
  for (let i = 0; i < radial; i++)
    indices.push(topCenter, topStart + i, topStart + i + 1);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export interface PouchTextureOptions {
  baseColor: string;
  logo: HTMLImageElement | null;
  type: PouchType;
}

/**
 * Paints the pouch artwork onto a canvas: base color, panel shading, a
 * crimped top seal with vertical ridges, zipper line, degassing valve,
 * type-specific bottom seams, and the customer's logo on the front panel.
 * Canvas top edge = pouch top (CanvasTexture flipY).
 */
export function buildPouchTexture({
  baseColor,
  logo,
  type,
}: PouchTextureOptions): THREE.CanvasTexture {
  const W = 1024;
  const H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, W, H);

  // Panel shading: darken where the surface curves away at the side folds
  // (front face center = u 0.75, back face center = u 0.25)
  for (const cx of [0.25 * W, 0.75 * W]) {
    const half = 0.25 * W;
    const g = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
    g.addColorStop(0, "rgba(0,0,0,0.16)");
    g.addColorStop(0.5, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.16)");
    ctx.fillStyle = g;
    ctx.fillRect(cx - half, 0, half * 2, H);
  }

  // Specular highlight strip, left of front-center
  const hl = ctx.createLinearGradient(0.56 * W, 0, 0.8 * W, 0);
  hl.addColorStop(0, "rgba(255,255,255,0)");
  hl.addColorStop(0.45, "rgba(255,255,255,0.11)");
  hl.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hl;
  ctx.fillRect(0.56 * W, 0, 0.24 * W, H);

  // Grounding shadow toward the base
  const ground = ctx.createLinearGradient(0, H * 0.8, 0, H);
  ground.addColorStop(0, "rgba(0,0,0,0)");
  ground.addColorStop(1, "rgba(0,0,0,0.14)");
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.8, W, H * 0.2);

  // Crimped top seal band — vertical ridges like a real heat seal
  const sealH = H * 0.1;
  ctx.fillStyle = "rgba(0,0,0,0.10)";
  ctx.fillRect(0, 0, W, sealH);
  for (let x = 0; x < W; x += 9) {
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    ctx.fillRect(x, 0, 2.5, sealH);
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.fillRect(x + 4.5, 0, 2, sealH);
  }
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.fillRect(0, sealH - 3, W, 3);

  // Zipper line just below the seal
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, H * 0.115, W, 3);
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(0, H * 0.115 + 4, W, 2);

  // Type-specific bottom seams on the front panel
  const fx = 0.75 * W;
  if (type === "doypack") {
    // Rounded bottom-gusset arc
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0.54 * W, H * 0.93);
    ctx.quadraticCurveTo(fx, H * 0.84, 0.96 * W, H * 0.93);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0.54 * W, H * 0.93 + 5);
    ctx.quadraticCurveTo(fx, H * 0.84 + 5, 0.96 * W, H * 0.93 + 5);
    ctx.stroke();
  } else if (type === "flat-bottom") {
    // Straight bottom seam
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    ctx.fillRect(0.52 * W, H * 0.94, 0.46 * W, 3);
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    ctx.fillRect(0.52 * W, H * 0.94 + 4, 0.46 * W, 2);
  }

  // Degassing valve on the front panel
  const vy = 0.17 * H;
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(fx, vy, 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(fx + Math.cos(a) * 11, vy + Math.sin(a) * 11, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Customer logo, contain-fit on the front panel
  if (logo && logo.width > 0 && logo.height > 0) {
    const maxW = W * 0.36;
    const maxH = H * 0.3;
    const scale = Math.min(maxW / logo.width, maxH / logo.height);
    const dw = logo.width * scale;
    const dh = logo.height * scale;
    ctx.drawImage(logo, fx - dw / 2, H * 0.52 - dh / 2, dw, dh);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
