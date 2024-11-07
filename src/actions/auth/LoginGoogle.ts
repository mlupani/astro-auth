
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { z } from 'zod'

export const LoginGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async ( credentials, context) => {

        try {
            const credential = GoogleAuthProvider.credentialFromResult(credentials);
            if(!credential) {
                throw new Error('Google login failed');
            }
            await signInWithCredential(firebase.auth, credential);

            return true;
        } catch (error) {
            console.log(error);
            throw new Error('Google login failed');
        }


    },
});