import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 5 booking attempts per IP per hour
export const ipRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "ratelimit:ip",
});

// 2 successful bookings per email per day
export const emailRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "24 h"),
  prefix: "ratelimit:email",
});
