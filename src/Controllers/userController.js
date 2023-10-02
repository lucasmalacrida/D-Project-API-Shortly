import db from "../Database/databaseConnection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validations
        if (password !== confirmPassword) { return res.status(422).send("As senhas não coincidem!") }
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (user.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        const hash = bcrypt.hashSync(password, 4);
        await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1,$2,$3);`,
            [name, email, hash]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        // Validations
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (user.rowCount === 0) { return res.sendStatus(401) }
        const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
        if (!isPasswordCorrect) { return res.sendStatus(401) }

        // Post DB
        const userId = user.rows[0].id;
        const token = uuid();
        await db.query(
            `INSERT INTO sessions ("userId", token) VALUES ($1,$2);`,
            [userId, token]
        );

        res.status(200).send({token});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getMyData(req, res) {
    try {

        res.status(200).send({token});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res) {
    try {

        res.status(200).send({token});
    } catch (err) {
        res.status(500).send(err.message);
    }
}