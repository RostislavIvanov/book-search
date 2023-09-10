import React, {FC, Ref} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {TextField} from "@mui/material";

interface ISearchInputProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent) => void
    onIconClick: () => void
    ref: Ref<HTMLTextAreaElement | null>
}

const SearchInput: FC<ISearchInputProps> = React.forwardRef((props, ref) => {
    const {value, onChange, onKeyDown, onIconClick} = props
    return (
        <TextField value={value} onChange={onChange}
                   sx={{width: 1000, mb: 3, backgroundColor: 'white'}}
                   inputRef={ref}
                   id="outlined-basic"
                   label="Write the book title"
                   variant="filled"
                   onKeyDown={onKeyDown}
                   InputProps={{
                       endAdornment: (
                           <SearchIcon sx={{color: 'grey', mr: 2, my: 'auto', cursor: 'pointer'}}
                                       onClick={onIconClick}/>
                       )
                   }}
        />
    );
})

export default SearchInput;