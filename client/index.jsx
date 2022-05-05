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
            <li><Link to={"/profile"}>Profil</Link></li>
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
    useEffect(async () => {
        const { authorization_endpoint } = await fetchJSON(
            "https://accounts.google.com/.well-known/openid-configuration"
        );

        const parameters = {
            response_type: "token",
            client_id:
                "253331612690-jkc78lg2qsjdi372beot9ppamfam9fj5.apps.googleusercontent.com",
            scope: "email profile",
            redirect_uri: window.location.origin + "/login/callback",
        };

        window.location.href =
            authorization_endpoint + "?" + new URLSearchParams(parameters);
    }, []);

    return (
        <div>
            <h1>Vennligst vent....</h1>
        </div>
    );
}

function LoginCallback() {
    return null;
}

function Profile() {
    return null;
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profil"} element={<Profile />} />
            <Route path={"/nyheter"} element={<ListNyheter />} />
            <Route path={"/nyheter/ny"} element={<LeggTilNyNyhet />} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application />, document.getElementById("app"));