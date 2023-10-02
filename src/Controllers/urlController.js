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

        res.status(201).send({ id, shortUrl });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrl(req, res) {
    const { id } = req.params;
    try {
        const urlData = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if (urlData.rowCount === 0) { return res.sendStatus(404) }
        const { id, shortUrl, url } = urlData.rows[0];
        res.status(200).send({ id, shortUrl, url });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function accessUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        // Finding the Url
        const urlData = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        if (urlData.rowCount === 0) { return res.sendStatus(404) }
        const url = urlData.rows[0].url;
        const id = urlData.rows[0].id;

        // Count++
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1;`, [id]);

        res.redirect(url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    try {
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}