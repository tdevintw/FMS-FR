
import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import {AuthHeader} from "../../components/auth/AuthHeader.tsx";
import Login from "../../components/auth/Login.tsx";



const HomePage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header />

            <main>
                <AuthHeader />
                <Login />
            </main>

            <Footer />

        </div>
    );
};

export default HomePage;