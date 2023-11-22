import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/pages/Home"
import Blog from "./components/pages/Blog"
import About from "./components/pages/About"
import Contact from "./components/pages/Contact"
import NotFound from "./components/pages/NotFound"
import {useEffect} from 'react';

function Main() {
    useEffect(() => {
        console.log('rendered');
    });

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="notfound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/notfound" replace />} />
            </Routes>
        </Router>
    )
}

export default Main;

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<Main name='laravel_spa'/>);
}
