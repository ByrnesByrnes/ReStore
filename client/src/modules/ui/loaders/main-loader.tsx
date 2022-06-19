import { Backdrop, Box } from "@mui/material";
import "./styles/main-loader.css";

export default function MainLoader() {
    return (
        <Backdrop open={true} invisible={true}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </Box>
        </Backdrop>
    );
}
