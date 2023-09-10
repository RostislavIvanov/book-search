import {configureStore} from "@reduxjs/toolkit";
import bookReducer from './bookSlice'
export const store = configureStore({
    reducer: {
        bookReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch