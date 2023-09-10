import React, {FC, memo} from 'react';
import {Typography} from "@mui/material";

const Title: FC = memo(() => {
    return (
        <Typography sx={{mt: 3, textAlign: 'center', mb: 1, fontSize: {md: 90, sm: 60, xs: 60}, lineHeight: {sm: 1, xs: 1 }}}component={"h1"} gutterBottom>
            Search for books
        </Typography>
    );
})

export default Title;