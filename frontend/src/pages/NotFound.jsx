import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import GlitchText from '../components/misc/GlitchText';
import Header from '../components/Header';

export default function NotFound() {
    return (
        <>
        <Header />
        <Container component="main" maxWidth="xl" sx={{ mt: 16, textAlign: 'center' }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <Typography variant="h1" component="h2" sx={{ fontSize: '5rem', color: '#f44336' }}>
                        <GlitchText text="404"/>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" component="h2">
                        Page Not Found
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                        Sorry, the page you are looking for does not exist.
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" component={Link} to="/">
                        Go to Home
                    </Button>
                </Grid>
            </Grid>
        </Container>
        </>
    );
}
