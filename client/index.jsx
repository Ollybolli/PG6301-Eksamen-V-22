import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

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

function NyhetCard({ nyhet: {title, article, poster, date, author} }) {
        return <>
            <h3>{title}</h3>;
            {poster && <img src={poster} width={300} alt={"Nyhet poster"}/>}
            <br/><br/>
            <div>{article}</div>
            <br/>
            <div>Date: {date}</div>
            <div>Author: {author}</div>
            <div>............................................................................................................................................................</div>
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
        <div>
            <Link to={"/login"}>Tilbake</Link>
        </div>

            {data.map((nyhet) => (
                <NyhetCard key={nyhet.title} nyhet={nyhet}/>
            ))}
    </div>;

}



function LeggTilNyNyhet(props) {
    const [title, setTitle] = useState("");
    const [article, setArticle] = useState("");

    const [newNyhet, setNewNyhet] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setNewNyhet({title, article});
    }, [title, article]);

    function handleSubmit(event) {
        event.preventDefault();
        nyhet.push(newNyhet);
        navigate("..");
    }

    return <form onSubmit={handleSubmit}>
        <h1>Lag en nyhetsartikkel</h1>
        <div>
            Title:
            <input value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
            <div>Article:</div>
            <textarea value={article} onChange={event => setArticle(event.target.value)} />
        </div>
        <button>Save</button>
        <pre>
            {JSON.stringify(newNyhet)}
        </pre>
        <div>
            <Link to={"/login"}>Tilbake</Link>
        </div>
        <br/>
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
    const navigate = useNavigate();
    useEffect(async () => {
        const { access_token } = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1))
        );
        console.log(access_token);

        await fetch("/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ access_token }),
        });
        navigate("/");
        window.location.reload(false);
    });

    return <h1>Vennligst vent...</h1>;
}

function useLoader(loadingFn) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();

    async function load() {
        try {
            setLoading(true);
            setData(await loadingFn());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => load(), []);
    return { loading, data, error };
}

function Profile() {
    const { loading, data, error } = useLoader(async () => {
        return await fetchJSON("/api/login");
    });

    if (loading) {
        return <div>Vennligst vent...</div>;
    }
    if (error) {
        return <div>Error! {error.toString()}</div>;
    }

    return (
        <div>
            <h1>
                Profile name: {data.name}
            </h1>
            <div>
                Email: {data.email}
            </div>
            <br/>
            <div>
                <img src={data.picture} alt={"Profile picture"} />
            </div>
            <div>
                <Link to={"/login"}>Tilbake</Link>
            </div>
        </div>

    );
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/nyheter"} element={<ListNyheter />} />
            <Route path={"/nyheter/ny"} element={<LeggTilNyNyhet />} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application />, document.getElementById("app"));