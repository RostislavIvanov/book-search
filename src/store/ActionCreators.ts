import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IBook} from "../types/IBook";
import {IParams} from "../types/IParams";

export const fetchBooks = createAsyncThunk<IBook, IParams>(
    'book/fetching',
    async (params: IParams, thunkAPI) => {
        try {
            if (params.subject !== 'All') {
                params.subject = '+subject:'+ params.subject
            } else {
                params.subject = ''
            }
            const response = await axios.get<IBook>(`https://www.googleapis.com/books/v1/volumes?q=${params.searchValue}${params.subject}&startIndex=${params.booksCount}&maxResults=32&orderBy=${params.order}&key=AIzaSyCpZ7QH80TM6ETCfjf61E3fI0Z-X3YbbvE`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки данных. Попробуйте перезагрузить страницу')
        }
    })