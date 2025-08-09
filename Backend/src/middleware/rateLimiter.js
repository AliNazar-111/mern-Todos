import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many Request, Please try Agian Later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate Limit Error", error);
    next(error);
  }
};

export default ratelimiter;
