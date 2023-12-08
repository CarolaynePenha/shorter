import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import connection from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 10);
  try {
    const querySignUp = await connection.query(
      `INSERT INTO users (name,email,password)
    SELECT $1,$2,$3
    WHERE NOT EXISTS (SELECT email FROM users WHERE email=$2)
    `,
      [user.name, user.email, passwordHash]
    );
    res.status(201).send("user registered");
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { password, email } = req.body;

  try {
    const queryInfoUser = await connection.query(
      `
    SELECT * FROM users 
    WHERE email=$1
    `,
      [email]
    );
    if (
      queryInfoUser.rowCount === 1 &&
      bcrypt.compareSync(password, queryInfoUser.rows[0].password)
    ) {
      const token = uuid();
      const queryToken = await connection.query(
        `
      INSERT INTO sessions 
      (token,"userId")
      VALUES ($1,$2)
      `,
        [token, queryInfoUser.rows[0].id]
      );
      res.status(200).send(token);
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
