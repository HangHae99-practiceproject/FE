import {configureStore} from "@reduxjs/toolkit";

import user from "./modules/user";
import plan from './modules/plan';
import map from "./modules/map";

export const store = configureStore({
    reducer: {
        user,
        plan,
        map,
    }
})

