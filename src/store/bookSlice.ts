import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchBooks} from "./ActionCreators";
import {IBook} from "../types/IBook";

interface IBookState {
    books: IBook;
    isLoading: boolean;
    error: string
}

const initialState: IBookState = {
    books: {
        totalItems: 0,
        items: []
    },
    isLoading: false,
    error: ''
}
export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        clearBooksData: (state) => {
            state.books = {
                totalItems: 0,
                items: []
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBook>) => {
            state.books.totalItems = action.payload.totalItems
            state.books.items = state.books.items.concat(action.payload.items)
            state.isLoading = false
        });
        builder.addCase(fetchBooks.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})
export const {clearBooksData} = bookSlice.actions
export default bookSlice.reducer