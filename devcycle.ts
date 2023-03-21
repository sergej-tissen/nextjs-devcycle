import { DVCClient, initialize } from "@devcycle/nodejs-server-sdk";

const sdk = process.env.DEVCYCLE_TOKEN as string;

const globalForDevCycle = global as unknown as { devCycle: DVCClient };

const getDVCClient = async () => {
  if (typeof globalForDevCycle.devCycle === "undefined") {
    globalForDevCycle.devCycle = await initialize(sdk).onClientInitialized();
  }
  return globalForDevCycle.devCycle;
};

export default getDVCClient;
