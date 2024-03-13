import { LOGIN_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE } from "./helpers/consts";
import Auth from "./pages/Auth";
import Test from "./pages/Test";

export const authRoutes = [
    
    {
        path: TEST_ROUTE,
        Component:Test
    },

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]