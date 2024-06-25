/*
// App.js
import React, { useState } from 'react';
import Directory from './components/Directory';
import Groups from './components/Groups';
import './bootstrap.css';
import Navigation from './components/Nav/Navigation';
import './App.css';
import Visualization from './components/Visualization';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import config from './config';




const App = () => {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Directory />} />
          <Route path="/Documents" element={<Directory />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Visualization" element={<Visualization />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
*/

import React, { useState } from 'react';




import './App.css';
import './bootstrap.css';
import Navigation from './components/Nav/Navigation';
import Directory from './components/Directory';
import Groups from './components/Groups';
import Visualization from './components/Visualization';
import { BrowserRouter, Routes, Route,useLocation} from 'react-router-dom';
import config from './config';

function App() {

  

  const [content, setContent] = useState(<Directory />);
  


  return (
    <>
      <Navigation content={content} setContent={setContent}/>
      {content}
      </>

  );
}

export default App;