import { defineAction } from "astro:actions";
import { z } from 'zod'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";
import { firebase } from "@/firebase/config";


export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, name, password, remember_me }, context) => {
        const cookies = context.cookies
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

        try {
            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

            // update displayName
            await updateProfile(firebase.auth.currentUser!, {
                displayName: name,
            })

            // verificar email si no esta verificado
            if(!user.user.emailVerified)
                await sendEmailVerification(firebase.auth.currentUser!, {
                    url: 'http://localhost:4321/protected?emailVerified=true',
                })

            return true;

        } catch (error) {
            const firebaseError = error as AuthError

            if(firebaseError.code === 'auth/email-already-in-use'){
                throw new Error('El correo electrónico ya está en uso')
            }

            console.log(error)
            throw new Error('Error al registrar el usuario')
        }
    },
});