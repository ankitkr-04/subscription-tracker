import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionRouter =  Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({title: "Get All Subscriptions"});
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: "Get Spicific Subscription by subscription id"});
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: "Update Subscription by subscription id"});
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: "Delete Subscription by subscription id"});

});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/user/:id', (req, res) => {
    res.send({title: "Cancel Subscription by user id"});
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "Get Upcoming Renewals"});
});

export default subscriptionRouter;