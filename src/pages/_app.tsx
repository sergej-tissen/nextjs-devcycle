import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {initialize} from '@devcycle/nodejs-server-sdk'

let dvcClient

// load only on server
if (typeof window === 'undefined') {
    initialize('<DVC_SDK_SERVER_KEY>')
        .onClientInitialized()
        .then(client => dvcClient = client)
}

export default function App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}
