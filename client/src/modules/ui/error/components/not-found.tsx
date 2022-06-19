import React from "react";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CATALOG } from "../../../routes";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400, py: 2 }}>
            <Typography gutterBottom variant="h3">Oops - we could not find what you are looking for</Typography>
            <Divider />
            <Button sx={{ mt: 2 }} variant="outlined" fullWidth component={Link} to={CATALOG}>Back to Store</Button>
        </Container>
    );
}
