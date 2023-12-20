import { useEffect, useState, useContext } from "react";
import { useSnackbar } from 'notistack';
import Axios from 'axios';
import { Box, Typography, LinearProgress, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "../AuthContext";

const ERROR = "error";
const LOADING = "primary";
const COMPLETE = "success";

export default function Droppable(props) {  
    const { file, onClose } = props;

    const { auth } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const [ img, setImg ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ state, setState ] = useState(LOADING);

    // create preview image, and start upload
    useEffect(() => {
        handleUpload();
        setImg(URL.createObjectURL(file))
    }, [])

    const handleUpload = async () => {
        const data = new FormData();
        data.append(`file`, file, file.name);

        try
        {
            const res = await Axios.post('/api/file', data, { 
                onUploadProgress: updateProgress,
                auth: auth.user
            });
            setState(COMPLETE);
        } 
        catch (err) 
        {
            setProgress(100);
            setState(ERROR);
            enqueueSnackbar(`Failed to upload file. ${err.message}`);
        }
    }
  
    const updateProgress = (e) => setProgress(Math.round((e.loaded * 100) / e.total));

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation()
        onClose(file);
    }

    return (
        <Box className={`Droppable__item ${state === ERROR ? 'Droppable__failed' : ''}`}>
            <Box sx={{ 
                aspectRatio: '1', 
                background: 'grey',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <LinearProgress variant={!!progress ? 'determinate':'indeterminate'} 
                value={progress} color={state} sx={{
                    height: 10
                }} />
                <IconButton size="small" sx={{ float: 'right' }} onClick={handleClick}>
                    <CloseIcon color="white" />
                </IconButton>
            </Box>
            <Typography variant="body2" sx={{
                textOverflow: 'ellipsis',
                overflowWrap: 'break-word'
            }}>
                {file.name}
            </Typography>
        </Box>
    );
}