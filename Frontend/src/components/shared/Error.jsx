import { Container, Typography } from "@mui/material";

export default function Error(){
    return(
        <Container sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Typography variant="h1">Error Occured!</Typography>
        </Container>
    )
}