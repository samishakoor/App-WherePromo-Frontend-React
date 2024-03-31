import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Home from './components/pages/basic/home';
import Articles from './components/pages/basic/articles';
import Footer from './components/footer';
import DetailedArticle from './components/pages/basic/detailedarticle';
import Signedin_Home from './components/pages/signedin/signedin_home';
import Signedin_Articles from './components/pages/signedin/signedin_articles';
import Signedin_DetailedArticle from './components/pages/signedin/signedin_detailedarticle';
import Favorites from './components/pages/signedin/favourites';
import Paid_Home from './components/pages/paid/paid_home';
import Admin_Home from './components/pages/admin/admin_home';
import ScrappedSites from './components/pages/admin/scappedsites';


function App() {

  return (
    <>
      
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<DetailedArticle />} />
          <Route path="/signedin_home" element={<Signedin_Home />} />
          <Route path="/signedin_article" element={<Signedin_Articles />} />
  
        

          <Route path="/signedin_articles/:id" element={<Signedin_DetailedArticle />} />
          <Route path="favourites" element={<Favorites />} />
          <Route path="/paid_home" element={<Paid_Home />} />
          <Route path="/admin_home" element={<Admin_Home />} />
          <Route path="/scrappedsites" element={<ScrappedSites />} />







      </Routes>
      </Router>
      <Footer/>

  
      


</>
  )
}

export default App
