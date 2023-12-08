import connection from "../db.js";
import { nanoid } from "nanoid";

export async function shortUrl(req, res) {
  const url = req.body;
  const shortLink = nanoid();
  const { userId } = res.locals;
  console.log("userId: ", userId);

  try {
    const queryLinks = await connection.query(
      `INSERT INTO links ("completeLink","shortLink","userId")
      VALUES ($1,$2,$3)
      `,
      [url, shortLink, userId.userId]
    );
    res.status(201).send(shortLink);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
