import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    //in production, key should be user-id or ip-address
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
