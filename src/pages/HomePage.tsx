
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

const HomePage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header />
            <main>
                <HeroSlider />
                <FeatureCallouts />
                <BannerArea />
                <Newsletter />
                <FeatureContent />
                <FlashDeal />
            </main>
            <Footer />
            <QuickViewModal />
            <ScrollToTop />
        </div>
    );
};

export default HomePage;