import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { Location } from "history";
import { CATALOG } from "../../../routes";

interface StateLocation extends Location {
    error: {
        detail?: string;
        title?: string;
    }
}

export default function ServerError() {
    const { state } = useLocation<StateLocation>();

    return (
        <Container component={Paper} sx={{ py: 2 }}>
            {state?.error ? (
                <>
                    <Typography variant="h3" color="error" gutterBottom>{state.error.title}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography>{state.error.detail || "Internal server error"}</Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server Error</Typography>
            )}
            <Button component={Link} to={CATALOG}>Back to Store</Button>
        </Container>
    )
}
