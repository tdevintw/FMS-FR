import {Link} from "react-router-dom";

const ProfileAside = ()=>{
    return (
        <div className="col-lg-3 col-md-4 col-custom">
            <div className="myaccount-tab-menu nav" role="tablist">
                <Link to={"/profile"}  data-bs-toggle="tab"><i className="fa fa-user"></i> Account
                    Details</Link>
                <a href="login.html"><i className="fa fa-sign-out"></i> Logout</a>
            </div>
        </div>
    );
}

export default ProfileAside;