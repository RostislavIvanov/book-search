import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, Container, Grid} from "@mui/material";
import {fetchBooks} from "../store/ActionCreators";
import {useAppDispatch} from "../hooks/reduxHooks";
import {clearBooksData} from "../store/bookSlice";
import Title from "./Title";
import SearchInput from "./SearchInput";
import SelectorSearchParams from "./SelectorSearchParams";
import {useNavigate} from "react-router-dom";

interface ISearchingFormProps {
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    booksCount: number
    setBooksCount: React.Dispatch<React.SetStateAction<number>>
}

const SearchingForm: FC<ISearchingFormProps> = ({searchValue, setSearchValue, booksCount, setBooksCount}) => {
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const [orderValue, setOrderValue] = useState<string>('Relevance')
    const [subjectValue, setSubjectValue] = useState<string>('All')
    const inputRef = useRef<HTMLTextAreaElement>(null!);
    const dispatch = useAppDispatch()

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate('/')
        if (searchValue.trim() === '') {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            setBooksCount(0)
            dispatch(clearBooksData());
            setHasLoaded(true);
            dispatch(fetchBooks({searchValue, booksCount, order: orderValue, subject: subjectValue}));
        }

    }

    useEffect(() => {
        if (hasLoaded) {
            dispatch(fetchBooks({searchValue, booksCount, order: orderValue, subject: subjectValue}))
        }
    }, [booksCount])
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <Box sx={{
                width: '100%',
                backgroundImage: `url('/images/wallpaper.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <Container sx={{color: 'white'}}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Title/>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', justifyContent: 'center'}}>
                            <SearchInput
                                value={searchValue}
                                onChange={handleInputValue}
                                onKeyDown={handleKeyDown}
                                onIconClick={handleSearch}
                                ref={inputRef}
                            />

                        </Grid>

                        <Grid item container xs={12} sm={12} md={12} sx={{mb: 3}}>

                            <Grid item xs={12} sm={12} md={12}
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexDirection: {xs: 'column', sm: 'row', md: 'row',}
                                  }}>
                                <SelectorSearchParams
                                    value={subjectValue}
                                    setValue={setSubjectValue}
                                    textCategory={'Categories'}
                                    menuItems={['All', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry']}
                                />
                                <SelectorSearchParams
                                    value={orderValue}
                                    setValue={setOrderValue}
                                    textCategory={'Sorting by'}
                                    menuItems={['Relevance', 'Newest']}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    );
};

export default SearchingForm;
