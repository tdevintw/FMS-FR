
// Layout components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import QuickViewModal from '../components/layout/QuickViewModal';

// Home section components
import HeroSlider from '../components/home/HeroSlider';
import FeatureCallouts from '../components/home/FeatureCallouts';
import BannerArea from '../components/home/BannerArea';
import Newsletter from '../components/home/Newsletter';
import FeatureContent from '../components/home/FeatureContent';
import FlashDeal from '../components/home/FlashDeal';
import BrandLogos from '../components/home/BrandLogos';
import SupportArea from '../components/home/SupportArea';

// Product components
import ProductSection from '../components/products/ProductSection';

// Blog components
import BlogSection from '../components/blog/BlogSection';

const HomePage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header />

            <main>
                <HeroSlider />
                <FeatureCallouts />
                <BannerArea />

                <ProductSection
                    title="Best Sale"
                    description="All best seller product are now available for you and your can buy this product from here any time any where so shop now"
                />

                <Newsletter />
                <FeatureContent />
                <FlashDeal />

                <ProductSection
                    title="Featured Products"
                    description="All best seller product are now available for you and your can buy this product from here any time any where so shop now"
                />

                <BlogSection />
                <BrandLogos />
                <SupportArea />
            </main>

            <Footer />
            <QuickViewModal />
            <ScrollToTop />
        </div>
    );
};

export default HomePage;