import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div className="footer_position">
            <Link to="/upload"><h4 className="footer_text">Want to Earn? Upload Question Papers. Click here</h4></Link>
        </div>
    )
}

export default Footer;