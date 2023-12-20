import React from 'react';
import { closeSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CardAction = snackbarId => (
    <IconButton onClick={() => { closeSnackbar(snackbarId) }}>
      <CloseIcon />
    </IconButton>
  );

const Snackbar = React.forwardRef((props, ref) => {
    const { id, message, action, ...other } = props;

    return (
        <Card ref={ref} {...other}>
            <Box sx={{height: 5, width: '100%', backgroundColor: 'red'}}></Box>
            <Box sx={{py: 1, pl: 2}}>
                <span style={{paddingTop: 2}}>{message}</span> 
                <IconButton sx={{color: 'black'}} onClick={() => closeSnackbar(id)}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </Card>
    );
});

export { CardAction, Snackbar }