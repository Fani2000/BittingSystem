This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introductions

## Features

## Issues

* Next Auth Decoding Issues solution: https://stackoverflow.com/questions/71385330/next-auth-jwedecryptionfailed
    * Step 1: Generate a random key using this command
    ```openssl rand -base64 32```
    * Setp 2: Add you NEXTAUTH_SECRET in the ```.env``` file
    ```NEXTAUTH_SECRET=YOUR_KEY_HERE```
    * Step 3: Then you will have to use the ```process.env.NEXTAUTH_SECRET as string``` everywhere were you need to using the secret key

**This fixes the jose decode and encode issue, for more about the error, you can go through the [Stackoverflow link here](https://stackoverflow.com/questions/71385330/next-auth-jwedecryptionfailed)**
