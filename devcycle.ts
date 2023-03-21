import { DVCClient, initialize } from '@devcycle/nodejs-server-sdk'

const sdkKey = process.env.DEVCYCLE_SERVER_SDK_KEY as string

let dvcClient: DVCClient

const getDVCClient = async () => {
  if (!dvcClient) {
    dvcClient = await initialize(sdkKey).onClientInitialized()
  }
  return dvcClient
}

export default getDVCClient
