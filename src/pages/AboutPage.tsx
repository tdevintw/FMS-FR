import About from "../components/About.tsx";
import Footer from "../components/layout/Footer.tsx";
import {DashboardHeader} from "../components/admin/DashboardHeader.tsx";
import Header from "../components/layout/Header.tsx";

const AboutPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"About"}/>
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div  className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <About />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default AboutPage;