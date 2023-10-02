import db from "../Database/databaseConnection.js";
import { nanoid } from 'nanoid';

export async function postUrl(req, res) {
    try {
        const { url } = req.body;
        const userId = res.locals.userId;

        // Post DB
        const shortUrl = nanoid();
        await db.query(
            `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1,$2,$3);`,
            [userId, shortUrl, url]
        );

        // ShortUrl Id
        const urlData = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        const id = urlData.rows[0].id;

        res.status(201).send({id, shortUrl});
    } catch (err) {
        res.status(500).send(err.message);
    }
}