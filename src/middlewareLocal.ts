// ESTE ARCHIVO NO FUNCIONA POR EL NOMBRE, TIENE QUE LLAMARSE MIDDLEWARE.TS
// ESTO ES SOLO UNA DEMOSTRACION DE PROTEGER RUTAS DE FORMA LOCAL

import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware(async (context, next) => {
    // intercept data from a request
    // optionally, modify the properties in `locals`
    //context.locals.title = "New title";

    const url = context.url.pathname;

    if(privateRoutes.includes(url)) {
        const authHeaders = context.request.headers.get('Authorization');
        return checkLocalAuth(authHeaders, next);
    }

    // return a Response or the result of calling `next()`
    return next();
})

const checkLocalAuth = (authHeaders: string | null, next: MiddlewareNext) => {
    if(authHeaders){
        const authValue = authHeaders.split(' ')[1];
        const decodedValue = atob(authValue).split(':');
        const [username, password] = decodedValue;

        if(username === 'admin' && password === 'admin') {
            return next();
        }
    }

    return new Response('Auth necesaria',
    {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
    });
}