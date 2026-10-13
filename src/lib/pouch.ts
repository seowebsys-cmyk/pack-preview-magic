import * as THREE from "three";

export type PouchType = "doypack" | "flat-bottom" | "gusset";

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * Builds a parametric coffee pouch: a vertical tube whose cross-section is a
 * superellipse that changes width, depth and roundness along the height.
 * Front face is +Z, UV u=0.75 is the front-center (texture space).
 */
export function buildPouchGeometry(type: PouchType): THREE.BufferGeometry {
  const radial = 128;
  const heightSeg = 96;
  const H = 2.6;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let j = 0; j <= heightSeg; j++) {
    const t = j / heightSeg;
    const seal = smoothstep(0.9, 1, t); // pinched top seal

    let w = 1;
    let d = 0.42;
    let n = 3; // superellipse exponent: 2 = ellipse, >2 boxy, <2 concave

    if (type === "doypack") {
      // Bottom gusset: nearly flat at the base, opens up going up
      const bg = smoothstep(0, 0.22, t);
      d = 0.07 + 0.35 * bg;
      w = 0.9 + 0.1 * bg;
      n = 2.6;
    } else if (type === "flat-bottom") {
      // Boxy, stable base with a crisp corner
      const bg = smoothstep(0, 0.04, t);
      d = 0.38 + 0.07 * bg;
      n = 4.5;
    } else {
      // Side gussets: concave sides read as folded-in creases
      n = 1.5;
      d = 0.48;
      w = 0.95;
    }

    d *= 1 - 0.93 * seal;
    w *= 1 + 0.04 * seal;

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
}

/**
 * Paints the pouch artwork onto a canvas: base color, sheen, crimped top
 * seal, degassing valve, and the customer's logo centered on the front panel.
 * Canvas top edge = pouch top (CanvasTexture flipY).
 */
export function buildPouchTexture({
  baseColor,
  logo,
}: PouchTextureOptions): THREE.CanvasTexture {
  const W = 1024;
  const H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, W, H);

  // Soft vertical sheen so the wrap reads as a cylindrical surface
  const sheen = ctx.createLinearGradient(0, 0, W, 0);
  sheen.addColorStop(0, "rgba(0,0,0,0.12)");
  sheen.addColorStop(0.22, "rgba(255,255,255,0.07)");
  sheen.addColorStop(0.5, "rgba(0,0,0,0.10)");
  sheen.addColorStop(0.72, "rgba(255,255,255,0.07)");
  sheen.addColorStop(1, "rgba(0,0,0,0.12)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, W, H);

  // Crimped top seal band
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.fillRect(0, 0, W, H * 0.085);
  for (let y = 6; y < H * 0.085; y += 13) {
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, y, W, 3);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(0, y + 5, W, 2);
  }

  // Degassing valve on the front panel (front center = u 0.75)
  const fx = 0.75 * W;
  const vy = 0.19 * H;
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
  tex.anisotropy = 8;
  return tex;
}
