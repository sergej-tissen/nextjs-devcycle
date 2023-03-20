# Next.js with DevCycle

Installing the [DevCycle NodeJS Server SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/node) with [ Next.js 13 ](https://github.com/vercel/next.js)

```
npx create-next-app@13.2.3 nextjs-devcycle
npm install --save @devcycle/nodejs-server-sdk
```
And adding this to `src/pages/_app.tsx`
```
import {initialize} from '@devcycle/nodejs-server-sdk'

let dvcClient

// load only on server
if (typeof window === 'undefined') {
    initialize('<DVC_SDK_SERVER_KEY>')
        .onClientInitialized()
        .then(client => dvcClient = client)
}
```
Then running 

```
npm run build
```
Results in the following error

```
Module parse failed: Unexpected character '' (1:0)
The module seem to be a WebAssembly module, but module is not flagged as WebAssembly module for webpack.
BREAKING CHANGE: Since webpack 5 WebAssembly is not enabled by default and flagged as experimental feature.
You need to enable one of the WebAssembly experiments via 'experiments.asyncWebAssembly: true' (based on async modules) or 'experiments.syncWebAssembly: true' (like webpack 4, deprecated).
For files that transpile to WebAssembly, make sure to set the module type in the 'module.rules' section of the config (e. g. 'type: "webassembly/async"').
(Source code omitted for this binary file)

Import trace for requested module:
./node_modules/@devcycle/bucketing-assembly-script/build/bucketing-lib.release.wasm
./node_modules/@devcycle/bucketing-assembly-script/build/ sync ^\.\/bucketing\-lib\..*$
./node_modules/@devcycle/bucketing-assembly-script/index.js
./node_modules/@devcycle/nodejs-server-sdk/src/bucketing.js
./node_modules/@devcycle/nodejs-server-sdk/src/client.js
./node_modules/@devcycle/nodejs-server-sdk/src/index.js
```

Based on the error message I've extended the `next.config.js` like this

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // this was added
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
    }
    return config
  }
}

module.exports = nextConfig

```

After running `npm run build` again this error occurs

```
> Build error occurred
Error: 'entryOptions.layer' is only allowed when 'experiments.layers' is enabled
    at EntryOptionPlugin.entryDescriptionToOptions (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:204202)
    at EntryOptionPlugin.applyEntryOption (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:203789)
    at ~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:203564
    at Hook.eval [as call] (eval at create (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:13:28549), <anonymous>:7:16)
    at Hook.CALL_DELEGATE [as _call] (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:13:25819)
    at WebpackOptionsApply.process (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:495291)
    at createCompiler (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:1434884)
    at create (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:1435380)
    at webpack (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:1435691)
    at Object.f [as webpack] (~/workspace/nextjs-devcycle/node_modules/next/dist/compiled/webpack/bundle5.js:28:874364)
```

Based on the error message I've extended the `next.config.js` like this

``` 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      // this was added
      layers: true,
    }
    return config
  }
}

module.exports = nextConfig
```

After running `npm run build` again this error occurs

``` 
info  - Linting and checking validity of types
info  - Creating an optimized production build .<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (846kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (848kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (846kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (848kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
Failed to compile.

./node_modules/@devcycle/bucketing-assembly-script/build/bucketing-lib.release.d.ts
Module parse failed: Unexpected token (1:8)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> declare namespace __AdaptedExports {
|   /** Exported memory */
|   export const memory: WebAssembly.Memory;

Import trace for requested module:
./node_modules/@devcycle/bucketing-assembly-script/build/bucketing-lib.release.d.ts
./node_modules/@devcycle/bucketing-assembly-script/build/ sync ^\.\/bucketing\-lib\..*$
./node_modules/@devcycle/bucketing-assembly-script/index.js
./node_modules/@devcycle/nodejs-server-sdk/src/bucketing.js
./node_modules/@devcycle/nodejs-server-sdk/src/client.js
./node_modules/@devcycle/nodejs-server-sdk/src/index.js
```

How can I configure [DevCycle NodeJS Server SDK](https://docs.devcycle.com/docs/sdk/server-side-sdks/node) with [ Next.js 13 ](https://github.com/vercel/next.js)?
