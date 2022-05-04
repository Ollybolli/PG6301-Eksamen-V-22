import React, {useEffect, useState} from "react";
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

function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return {
        loading, error, data };
}


async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

function ListNews() {
    const { loading, error, data } = useLoading(async () => fetchJSON("/api/news")
);

if (loading) {
    return <div>Loading...</div>;
}
if(error) {
    return <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
    </div>
}
    return <div>
        <h1>News in the database</h1>

        <ul>
            {data.map(news =>
                <li key={news.title}>{news.title}</li>
            )}
        </ul>
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