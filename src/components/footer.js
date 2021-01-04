import React, {useState} from 'react';
import { useStateValue } from "../StateProvider";
import {Link} from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


function Footer() {
    const [{ user }] = useStateValue();
    const [isShow, setisShow] = useState(true)
    if(isShow && user){
        // console.log(isShow)
    return (
        <div className="footer_position">
            <Link to="/upload"><h4 className="footer_text">Want to Earn? Upload Question Papers. Click here</h4></Link>
            <button onClick={()=>setisShow(false)}><HighlightOffIcon/></button>
        </div>
    )}
    else{
        return (  
        null
    
    )}
}

export default Footer;