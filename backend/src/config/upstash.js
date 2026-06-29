import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'
import { Ratelimit } from '@upstash/ratelimit'

dotenv.config();

// create a ratelimiter that allows 10 reqs per 20 seconds
const ratelimit = new Ratelimit({ // <-- Changed to match the import exactly
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;