
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from 'zod'

export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({email, password, remember_me}, {cookies}) => {
        try {
            const user = await signInWithEmailAndPassword(firebase.auth, email, password);
            if(!user.user.uid) throw new Error('Invalid credentials');

            if(remember_me){
                cookies.set('email', email, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
                    path: '/',
                })
            }
            else {
                cookies.delete('email', {
                    path: '/'
                })
            }

            return true;
        } catch (error) {
            console.log(error);
            throw new Error('Invalid credentials');
        }
    },
});