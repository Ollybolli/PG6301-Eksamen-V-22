import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Nyheter Database</h1>
        <div>
            <li><Link to={"/login"}>Login</Link></li>
        </div>
        <div>
            <li><Link to={"/profil"}>Profil</Link></li>
        </div>
        <div>
            <li><Link to={"/nyheter"}>Liste over nyheter</Link></li>
        </div>
        <div>
            <li><Link to={"/nyheter/ny"}>Legg til nyhet</Link></li>
        </div>
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

function NyhetCard({ nyhet: {title, article, poster} }) {
        return <>
            <h3>{title}</h3>;
            {poster && <img src={poster} width={300} alt={"Nyhet poster"}/>}
            <div>{article}</div>
            </>
    }


function ListNyheter() {
    const { loading, error, data } = useLoading(async () => fetchJSON("/api/nyheter")
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
        <h1>Nyheter i databasen</h1>

            {data.map((nyhet) => (
                <NyhetCard key={nyhet.title} nyhet={nyhet}/>
            ))}
    </div>;
}



function LeggTilNyNyhet(props) {
    return <form>
        <h1>Legg til Nyhet</h1>
    </form>;
}

function Login() {
    return null;
}

function LoginCallback() {
    return null;
}

function Profil() {
    return null;
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profil"} element={<Profil />} />
            <Route path={"/nyheter"} element={<ListNyheter />} />
            <Route path={"/nyheter/ny"} element={<LeggTilNyNyhet />} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application />, document.getElementById("app"));