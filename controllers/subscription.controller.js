import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        }, null);

        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminders`,
            body: {
                subscriptionId: subscription._id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })
        return res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        });

    } catch (e){
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id){
            const error = new Error("You are not authorized to access this resource");
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        return res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (e){
        next(e);
    }
}