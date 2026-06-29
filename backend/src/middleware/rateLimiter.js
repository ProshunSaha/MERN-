import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try {
        const { success } = await ratelimit.limit("my-limiter-key");
        if (!success) {
            return res.status(429).json({ error: "Too Many Requests" });
        }
        next();
    } catch (error) {
        console.error("Error occurred while checking rate limit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default rateLimiter;