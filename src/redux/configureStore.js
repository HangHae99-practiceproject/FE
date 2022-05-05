import {configureStore} from "@reduxjs/toolkit";

import user from "./modules/user";
import plan from './modules/plan'

export const store = configureStore({
    reducer: {
        user,
        plan,
    }
})

