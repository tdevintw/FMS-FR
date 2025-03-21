import Header from "../components/layout/Header.tsx";
import {DashboardHeader} from "../components/admin/DashboardHeader.tsx";
import Footer from "../components/layout/Footer.tsx";
import ContactUs from "../components/ContactUs.tsx";


const ContactUsPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Contact"}/>
                <ContactUs />
            </main>
            <Footer/>
        </div>

    )
}

export default ContactUsPage;