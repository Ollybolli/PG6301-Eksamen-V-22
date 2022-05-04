import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>News Database</h1>
        <ul>
            <li><Link to={"/News"}>ListNews</Link></li>
            <li><Link to={"/News/New"}>Add News</Link></li>
        </ul>
    </div>;
}

function ListNews() {
    return <div>
        <h1>News in the database</h1>
    </div>;
}

function AddNewNews() {
    return <form>
        <h1>Add News</h1>
    </form>;
}

function Application(props) {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/news"} element={<ListNews />} />
            <Route path={"/news/new"} element={<AddNewNews />} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application />, document.getElementById("app"));