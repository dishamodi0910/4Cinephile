/**
 * This includes array of the public routes that do not require authentication and are publicly accessible.
* @type{string[]}
*/
export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification",
    "/auth/reset-password",
    "/auth/reset_password"
];

/**
 * This includes array of routes that are involved in authentication, will redirect logged in users to demo page
 * @type{string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register" ,
    "/auth/reset-password"   
]

/**
 * Will be used for API Auth
 * @type{string}
 * **/
export const ApiAuth: string = "/api/auth";

/**
 * The page to redirect after the successful login of the user
 * @type{string}
 * */
export const DEFUALT_TO_REDIRECT_AFTER_LOGIN: string = "/demo"