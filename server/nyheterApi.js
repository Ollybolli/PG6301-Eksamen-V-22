import {Router} from "express";

export function NyheterApi(mongoDatabase) {
    const router = new Router();


    router.get("/", async (req, res) => {
      const nyheter = await mongoDatabase
          .collection("nyheter")
          .find()
          .map(({title, poster, article, author, date}) => ({
              title,
              poster,
              article,
              author,
              date,
          }))
          .limit(100)
          .toArray();
        res.json(nyheter);
    });
    router.post("/ny", (req, res) => {
        const {title} = req.body;
        const result = mongoDatabase.collection("nyheter").insertOne({
            title,
        });
        res.sendStatus(500);
    });

    return router;
}