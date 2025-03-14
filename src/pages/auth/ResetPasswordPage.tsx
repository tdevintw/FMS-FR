
import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import ResetPassword from "../../components/auth/ResetPassword.tsx";



const ResetPasswordPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header />
            <main>
                <ResetPassword />
            </main>
            <Footer />
        </div>
    );
};

export default ResetPasswordPage;