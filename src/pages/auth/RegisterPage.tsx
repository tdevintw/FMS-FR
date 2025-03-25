
import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import {AuthHeader} from "../../components/auth/AuthHeader.tsx";
import Register from "../../components/auth/Register.tsx";



const RegisterPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header />

            <main>
                <AuthHeader />
                <Register />
            </main>

            <Footer />

        </div>
    );
};

export default RegisterPage;