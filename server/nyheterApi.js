import {Router} from "express";

export function NyheterApi(mongoDatabase) {
    const router = new Router();


    router.get("/", async (req, res) => {
      const nyheter = await mongoDatabase.collection("nyheter")
            .find()
            .toArray();
        res.json(nyheter);
    });
    router.post("/ny", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}