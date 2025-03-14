import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "../src/assets/css/vendor/bootstrap.min.css";
import "../src/assets/css/vendor/font.awesome.min.css";
import "../src/assets/css/vendor/ionicons.min.css";
import "../src/assets/css/plugins/slick.min.css";
import "../src/assets/css/plugins/animate.min.css";
import "../src/assets/css/plugins/jquery-ui.min.css";
import "../src/assets/css/plugins/nice-select.min.css";
import "../src/assets/css/plugins/magnific-popup.css";
import "../src/assets/css/style.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
