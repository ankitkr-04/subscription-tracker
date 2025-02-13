import {Client as WorkflowCLient} from "@upstash/workflow"
import {QSTASH_TOKEN, QSTASH_URL} from "./env.js";

export const workflowClient = new WorkflowCLient({
    baseURL: QSTASH_URL,
    token: QSTASH_TOKEN
})