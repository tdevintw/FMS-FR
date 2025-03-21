import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { useUser } from "../../context/UserContext.tsx";

const ProfileAside = () => {
    const { deleteUser, user } = useUser();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getRolePath = () => {
        if (user?.role === "ADMIN") return "/admin";
        if (user?.role === "MANAGER") return "/manager";
        if (user?.role === "SUPPLIER") return "/supplier";
        return "/profile";
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmDelete) {
            try {
                await deleteUser();
                alert('Account deleted successfully.');
                window.location.href = '/login';
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("Account deletion canceled.");
        }
    };

    return (
        <div className="col-lg-3 col-md-4 col-custom">
            <div className="myaccount-tab-menu nav" role="tablist">
                <Link to="/profile">
                    <i className="fa fa-user"></i> Account Details
                </Link>
                <Link to={getRolePath()}>
                    <i className="fa fa-dashboard"></i> Panel
                </Link>

                <a onClick={handleDelete}>
                    <i className="fa fa-trash"></i> Delete Account
                </a>
                <a onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i> Logout
                </a>
            </div>
        </div>
    );
};

export default ProfileAside;
