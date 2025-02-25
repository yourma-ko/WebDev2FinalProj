import { CssBaseline } from "@mui/material"
import Header from "../layout/Header"

export default function Layout(props){
 
    return(
          <div>
            <CssBaseline />
              <Header />
              {props.children}
            </div>
    )
}