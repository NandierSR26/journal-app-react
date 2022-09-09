import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startLoadingFiles, startSaveNote } from "../../store/journal/thunks"


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {

        const newDate =  new Date( date );

        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ])

    useEffect(() => {
        if( messageSaved.length > 0 ) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [ messageSaved ])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;

        dispatch( startLoadingFiles( target.files ) )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{ dateString }</Typography>
            </Grid>

            <Grid item>

                <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    onClick={ onSaveNote }
                    color='primary' 
                    sx={{ padding: 2 }} 
                    disabled={ isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    placeholder="ingrese un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    value={ title }
                    name="title"
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder="Que sucedio en el dia de hoy"
                    minRows={5}
                    value={ body }
                    name="body"
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container
                justifyContent='end'
            >
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Eliminar
                </Button>
            </Grid>

            {/* image gallery */}
            <ImageGallery images={ note.imageUrls } />
        </Grid>
    )
}
