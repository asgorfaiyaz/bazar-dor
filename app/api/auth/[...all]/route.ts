import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
export const { POST, GET } = toNextJsHandler(auth);
