// In-memory sliding window rate limiter (no external dependencies)
const store = new Map<string, number[]>();

function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { success: boolean } {
  const now = Date.now();
  const timestamps = store.get(key)?.filter((t) => now - t < windowMs) || [];

  if (timestamps.length >= maxRequests) {
    store.set(key, timestamps);
    return { success: false };
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return { success: true };
}

// 5 booking attempts per IP per hour
export function ipRateLimit(ip: string) {
  return checkRateLimit(`ip:${ip}`, 5, 60 * 60 * 1000);
}

// 2 successful bookings per email per day
export function emailRateLimit(email: string) {
  return checkRateLimit(`email:${email}`, 2, 24 * 60 * 60 * 1000);
}
