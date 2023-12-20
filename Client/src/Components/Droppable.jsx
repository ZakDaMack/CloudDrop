import { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DroppableItem from './DroppableItem';

export default function Droppable() {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef();

    const handleFileAdd = (e) => setFiles([...files, ...e.target.files]);
    const handleFileRemove = (file) => setFiles(files.filter(f => f !== file));
    const handleOnDragover = (e) => e.preventDefault();

    const handleOnDrop = (e) => {
        e.preventDefault();
        if(e.dataTransfer && e.dataTransfer.files.length != 0){
            setFiles([...files, ...e.dataTransfer.files]);
        }
    }

    return (
      <Box className="Droppable__container" 
      onClick={()=>fileInputRef.current.click()}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragover}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        cursor: 'pointer',
        placeSelf: 'center',
        p: 2, m: 2
      }}>
        <input type="file" name="file" onInput={handleFileAdd} ref={fileInputRef} multiple hidden />
        { files.length === 0 ? (
            <div className="Droppable__cta">
                <CloudUploadIcon sx={{ m: 'auto', fontSize: 48 }} />
                <Typography variant="h5">Drag files here to upload</Typography>
                <TextButton
                    className="Droppable__btn" variant="text"
                    onClick={()=>fileInputRef.current.click()}
                >or click here</TextButton> 
            </div>
        ) : files.map((f, i) => (
            <DroppableItem key={i} file={f} progress={0} onClose={handleFileRemove} />
        ))}
      </Box>
    );
}

const TextButton = styled(Button)(({ theme }) => ({
    ...theme.typography.h5,
    textTransform: 'none',
    letterSpacing: 'normal',
    textDecoration: 'underline'
  }));