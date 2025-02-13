import {serve} from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import {sendReminderEmail} from "../utils/send-email.js";

const REMINDER = [7,5,2,1];

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subsription = await fetchSubscription(context, subscriptionId);
    if(!subsription || subsription.status !== 'active') return;

    const renewalDate = dayjs(subsription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Subscription ${subsription._id} is expired . Stopping Workflow`);
        return;
    }

    for(const daysbefore of REMINDER){
        const reminderDate = renewalDate.subtract(daysbefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysbefore} days before`, reminderDate);

        }
        if(dayjs().isSame(reminderDate, 'day'))
            await triggerReminder(context, `${daysbefore} days before reminder`, subsription);
    }


});

const sleepUntilReminder = async (context,label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription
        })
    });
}

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};