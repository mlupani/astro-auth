/// <reference path="../.astro/types.d.ts" />


interface User {
    avatar: string;
    email: string;
    name: string;
    isVerified: boolean;
}
declare namespace App {
    interface Locals {
        isLoggedIn: boolean;
        user: User | null;
    }
}
