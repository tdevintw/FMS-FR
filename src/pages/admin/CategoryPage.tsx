import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import Category from "../../components/admin/category/Category.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import AddCategory from "../../components/admin/category/AddCategory.tsx";


const CategoryPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Category"}/>
                <AddCategory />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div  className="container container-default-2 custom-area d-flex justify-content-center text-center">
                            <Category  />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default CategoryPage;