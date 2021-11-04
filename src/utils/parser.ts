export function angleToPoint(angle: number, sx: number, sy: number) {
  while (angle < 0) angle += 360
  angle %= 360
  let a = sy,
    b = a + sx,
    c = b + sy, // 3 first corners
    p = (sx + sy) * 2, // perimeter
    rp = p * 0.00277, // ratio between perimeter & 360
    pp = Math.round((angle * rp + (sy >> 1)) % p) // angle position on perimeter

  if (pp <= a) return { x: 0, y: sy - pp }
  if (pp <= b) return { y: 0, x: pp - a }
  if (pp <= c) return { x: sx, y: pp - b }
  return { y: sy, x: sx - (pp - c) }
}
