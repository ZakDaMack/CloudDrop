import { useContext } from "react";

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SadIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { AuthContext } from '../AuthContext';
import Droppable from "../Components/Droppable";
import AuthDialog from "../Components/AuthDialog";

export default function Home() {
    const { auth } = useContext(AuthContext);

    return ( 
        <Box className="Home" sx={{
            display: 'grid',
            placeSelf: 'center',
            height: '100vh',
            width: '100%'
        }}>
            {auth.error ? 
            (<Box sx={{placeSelf: 'center', textAlign: 'center'}}>
                <Typography variant="h2">{auth.error}</Typography>
                <SadIcon sx={{fontSize: 84, mt: 4}} />
            </Box>): 
            (<Droppable />)}
            <AuthDialog />
        </Box>
    );
}