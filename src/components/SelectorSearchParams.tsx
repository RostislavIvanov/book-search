import React, {FC, memo} from 'react';
import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";


interface ISelectorSearchParamsProps {
    textCategory: string
    menuItems: string[]
    value: string
    setValue: (value: string) => void
}

const SelectorSearchParams: FC<ISelectorSearchParamsProps> = memo(({textCategory, menuItems, value, setValue}) => {

    const handleChoose = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value);
    }
    return (
        <>
            <Typography sx={{fontSize: '24px', p: 1}}>{textCategory}</Typography>
            <Select sx={{width: {md: 200, sm: 200, xs: '100%'}, fontSize: 20, backgroundColor: 'white'}}
                    value={value}
                    onChange={handleChoose}
            >
                {menuItems.map((item, ind) =>
                    <MenuItem key={ind} value={item}>{item}</MenuItem>
                )}
            </Select>
        </>
    );
})

export default SelectorSearchParams;