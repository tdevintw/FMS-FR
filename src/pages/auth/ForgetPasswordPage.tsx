
import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import ForgetPassword from "../../components/auth/ForgetPassword.tsx";



const ForgetPasswordPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header />

            <main>
                <ForgetPassword />
            </main>

            <Footer />

        </div>
    );
};

export default ForgetPasswordPage;