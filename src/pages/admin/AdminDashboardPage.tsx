import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import ProfileHeader from "../../components/profile/ProfileHeader.tsx";
import ProfileAside from "../../components/profile/ProfileAside.tsx";
import Dashboard from "../../components/admin/Dashboard.tsx";

const AdminDashboardPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <ProfileHeader/>
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area">
                        <div className="row">
                            <div className="col-lg-12 col-custom">
                                <div className="myaccount-page-wrapper">
                                    <div className="row">
                                        <ProfileAside/>
                                        <div className="col-lg-9 col-md-8 col-custom">
                                            <Dashboard/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default AdminDashboardPage;