import React, {FC} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {IBookItem} from "../types/IBook";
import {useNavigate} from "react-router-dom";

interface IBookItemProps {
    bookItem: IBookItem
}

const BookItem: FC<IBookItemProps> = ({bookItem}) => {
    const navigate = useNavigate()
    const handleLearnMore = () => {
        navigate(`/${bookItem.id}`)
    }
    return (
        <Card sx={{backgroundColor: '#F3F2F1', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardMedia
                sx={{
                    margin: '0 auto',
                    height: 400,
                    width: 250,
                    objectFit: 'none',
                    boxShadow: '10px 11px 10px 2px rgba(34, 60, 80, 0.2)'
                }}
                image={bookItem.volumeInfo.imageLinks ? bookItem.volumeInfo.imageLinks.thumbnail : '/images/cover-not-available.jpg'}
                title={bookItem.volumeInfo.title}
            />
            <CardContent sx={{flex: '1 0 auto'}}>
                <Typography variant="body2" color="text.secondary">
                    {bookItem.volumeInfo.categories &&
                        bookItem.volumeInfo.categories[0]}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {bookItem.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {bookItem.volumeInfo.authors &&
                        bookItem.volumeInfo.authors.map((author, ind, authors): string => {
                            if (ind !== authors.length - 1) {
                                return author + ', '
                            } else {
                                return author
                            }
                        })}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleLearnMore} size="small">Learn More</Button>
            </CardActions>
        </Card>

    );
};

export default BookItem;