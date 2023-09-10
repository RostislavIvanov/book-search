import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Button, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import axios from "axios";
import {useFetching} from "../hooks/useFetching";
import {IBookItem} from "../types/IBook";
import HtmlRenderer from "../components/HtmlRenderer";

const BookItemPage: FC = () => {
    const {id} = useParams()
    const [bookInfo, setBookInfo] = useState<IBookItem>({
        id: "",
        etag: "",
        searchInfo: {
            textSnippet: ""
        },
        volumeInfo: {
            title: "",
            authors: [],
            categories: [],
            imageLinks: {
                thumbnail: ""
            },
            publishedDate: ""
        }
    })
    let {fetching, isLoading, error} = useFetching(async () => {
        const response = await axios.get<IBookItem>(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyCpZ7QH80TM6ETCfjf61E3fI0Z-X3YbbvE`)
        setBookInfo(response.data)
    })
    useEffect(() => {
        fetching()
    }, [])
    return (
        <>
            <Grid container>
                <Grid xs={12} sm={5} md={5} lg={5} item
                      sx={{backgroundColor: '#F3F2F1', height: {}, display: 'flex', justifyContent: 'center'}}>
                    {isLoading &&
                        <Box sx={{mt: 20, display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress size={100}/>
                        </Box>
                    }
                    <CardMedia
                        sx={{
                            m: '50px 100px',
                            height: {lr: 700, md: 700, sm: 500},
                            width: {lr: 'auto', md: 'auto', sm: 300},
                            '@media (max-width: 1400px)': {
                                width: 350,
                                height: 500
                            },
                            '@media (max-width: 1000px)': {
                                width: 250,
                                height: 400
                            },
                            boxShadow: '15px 18px 12px 0px rgba(34, 60, 80, 0.5)'
                        }}
                        component="img"
                        image={bookInfo.volumeInfo.imageLinks?.extraLarge || bookInfo.volumeInfo.imageLinks?.large || bookInfo.volumeInfo.imageLinks?.medium || bookInfo.volumeInfo.imageLinks?.small || bookInfo.volumeInfo.imageLinks?.thumbnail || bookInfo.volumeInfo.imageLinks?.smallThumbnail || '/images/cover-not-available.jpg'}
                        alt={bookInfo.volumeInfo.title}
                    />
                </Grid>
                <Grid xs={12} sm={7} md={7} lg={7} item>
                    {isLoading &&
                        <Box sx={{mt: 20, display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress size={100}/>
                        </Box>
                    }
                    {error &&
                        <Box sx={{m: '0 auto', p: 10}}>
                            <Typography sx={{
                                fontSize: 40,
                                display: 'inline-block',
                                backgroundColor: 'red',
                                p: 3,
                                color: 'white',
                                borderRadius: 10
                            }}>{error}</Typography>
                        </Box>

                    }
                    <Box sx={{p: 6}}>
                        <Typography sx={{mb: 3, opacity: '0.7'}}>
                            {bookInfo.volumeInfo.categories &&
                                bookInfo.volumeInfo.categories.map((category, ind, categories): string => {
                                    if (ind !== categories.length - 1) {
                                        return category + ', '
                                    } else {
                                        return category
                                    }
                                })}
                        </Typography>
                        <Typography sx={{fontSize: 40}}>{bookInfo.volumeInfo.title}</Typography>
                        <Typography sx={{mt: 1, mb: 3, opacity: '0.7'}}>
                            {bookInfo.volumeInfo.authors &&
                                bookInfo.volumeInfo.authors.map((author, ind, authors): string => {
                                    if (ind !== authors.length - 1) {
                                        return author + ', '
                                    } else {
                                        return author
                                    }
                                })}
                        </Typography>

                        <Typography sx={{mb: 2}}>
                            <HtmlRenderer html={bookInfo.volumeInfo.description} />
                        </Typography>
                        {!isLoading && error === '' &&
                            <Button onClick={() => window.location.href = `${bookInfo.volumeInfo.previewLink}`}
                                    variant="contained">Read On Google Books</Button>
                        }

                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default BookItemPage;