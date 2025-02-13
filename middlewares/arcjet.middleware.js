import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req);
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).send({title: "Too Many Requests"});
            }
            if(decision.reason.isBot()){
                return res.status(403).send({title: "Forbidden"});
            }
            return res.status(403).send({title: "Access Denied"});
        }

        next();

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default arcjetMiddleware;