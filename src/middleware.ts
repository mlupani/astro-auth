import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { firebase } from './firebase/config';

const privateRoutes = ['/protected'];
const publicRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(async (context, next) => {
    // intercept data from a request
    // optionally, modify the properties in `locals`
    //context.locals.title = "New title";
    const url = context.url.pathname;
    const firebaseUser = firebase.auth.currentUser;
    const isLoggedIn = !!firebaseUser;

    context.locals.isLoggedIn = isLoggedIn;

    if(firebaseUser){
        const {displayName, email, photoURL, emailVerified} = firebaseUser;
        context.locals.user = {
            name: displayName ?? '',
            email: email ?? '',
            avatar: photoURL ?? '',
            isVerified: emailVerified
        }
    }

    if(privateRoutes.includes(url) && !isLoggedIn){
        return context.redirect('/');
    }

    if(publicRoutes.includes(url) && isLoggedIn){
        return context.redirect('/');
    }

    // return a Response or the result of calling `next()`
    return next();
})
