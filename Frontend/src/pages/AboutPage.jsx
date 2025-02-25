import { Box } from "@mui/joy";
import { Container, Typography } from "@mui/material";
import aboutImage from "../assets/img/abouts.jpg";
export default function AboutPage(){
    return(
        <Container sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh"}}>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <Typography variant="h3" sx={{mb:"24px"}}>This website was created for an educational project and is not a public offer. The rights to the product images belong to Halyk Bank. The creators of the website in telegram @maximohmy, @velocerr</Typography>
            <img src={aboutImage} alt="about us" />
        </Box>
        </Container>
    )
}
