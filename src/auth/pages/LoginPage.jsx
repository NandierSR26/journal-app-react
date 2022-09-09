import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { useMemo } from 'react'

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const { email, password, onInputChange, formState } = useForm( formData );

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(startLoginWithEmailPassword(formState))
    }

    const onGoogleSignIn = () => {
        console.log('onGoogleSignIn');
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@correo.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="contraseña"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid 
                        container
                        display={!!errorMessage ? '' : 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                    </Grid>

                    <Grid container
                        spacing={2}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        <Grid item xs={12} sm={6}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticating}
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                onClick={onGoogleSignIn}
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticating}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }} >Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container
                        direction="row"
                        justifyContent='end'
                    >
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
