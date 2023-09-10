import React, {FC, useState} from 'react';
import SearchingForm from "./components/SearchingForm";
import Catalog from "./components/Catalog";
import {Route, Routes} from "react-router-dom";
import BookItemPage from "./pages/BookItemPage";
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./theme";

const App : FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [booksCount, setBooksCount] = useState<number>(0)
    return (
        <ThemeProvider theme={theme}>
            <SearchingForm booksCount={booksCount} setBooksCount={setBooksCount} searchValue={searchValue} setSearchValue={setSearchValue}/>
            <Routes>
                <Route path='/' element={<Catalog booksCount={booksCount} setBooksCount={setBooksCount}/>}/>
                <Route path={'/:id'} Component={BookItemPage}/>
            </Routes>
        </ThemeProvider>
    );
};

export default App;