import {Router} from "express";

const nyheter = [
    {
        title: "Nyhet 1",
    },
    {
        title: "Nyhet 2",
    },
];

export function NyheterApi() {
    const router = new Router();


    router.get("/", (req, res) => {
        res.json(nyheter);
    });
    router.post("/ny", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}