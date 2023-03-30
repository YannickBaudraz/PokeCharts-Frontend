import React from 'react';
import ReactDOM from 'react-dom/client';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '/src/assets/style/index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Search from "./pages/search";
import Compare from "./pages/compare";
import Detail from './pages/detail';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/"} element={<Layout/>}>
                    <Route path={"search"} element={<Search/>}/>
                    <Route path={"compare"} element={<Compare/>}/>
                    <Route path={"detail"} element={<Detail/>}/>
                    <Route path={"/detail/:name"} element={<Detail/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container!);
root.render(<App/>);
