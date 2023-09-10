import React, {FC, memo} from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import BookItem from "./BookItem";
import {useAppSelector} from "../hooks/reduxHooks";

interface ICatalogProps {
    setBooksCount: React.Dispatch<React.SetStateAction<number>>
    booksCount: number
}

const Catalog: FC<ICatalogProps> = memo(({setBooksCount, booksCount}) => {
    const {books, isLoading, error} = useAppSelector(state => state.bookReducer)
    const handleAddMoreBooks = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (booksCount + 32 < books.totalItems) {
            setBooksCount(prevState => prevState + 32)
        } else {
            alert('Больше книг по данному запросу нет :(')
        }
    }
    return (
        <>
            <Box sx={{width: '100%'}}>
                <Grid container sx={{justifyContent: 'space-between', p: 3}} spacing={4}>
                    {error &&
                        <Box sx={{m: '0 auto', p: 10}}>
                            <Typography sx={{fontSize: 40, display: 'inline-block', backgroundColor: 'red', p: 3, color: 'white', borderRadius: 10}}>{error}</Typography>
                        </Box>

                    }
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 3, width: '100%'}}>
                        <Typography sx={{fontSize: '24px'}}>
                            Found {books.totalItems} results
                        </Typography>
                    </Box>

                    {books.totalItems > 0 &&
                        books.items.map(book =>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={book.id + book.etag}>
                            <BookItem bookItem={book}/>
                        </Grid>)
                    }
                    {isLoading &&
                        <Box sx={{m: '0 auto', p: 10}}>
                            <CircularProgress size={100}/>
                        </Box>
                    }
                </Grid>
                {(books.items.length > 0) &&
                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 3}}>
                        <Button onClick={handleAddMoreBooks} variant="contained" type="button">Load more</Button>
                    </Box>
                }


            </Box>
        </>
    )
})

export default Catalog;