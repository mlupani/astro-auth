
import { defineAction } from "astro:actions";
import { firebase } from '../../firebase/config';
import { signOut } from "firebase/auth";

export const logoutUser = defineAction({
    accept: 'json',
    handler: async (_, context) => {
        return await signOut(firebase.auth)
    },
});