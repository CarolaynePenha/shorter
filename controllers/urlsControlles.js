import connection from "../db.js";
import { nanoid } from "nanoid";

export async function shortUrl(req, res) {
  const { url } = req.body;

  const shortLink = nanoid();
  const { userId } = res.locals;
  console.log("userId: ", userId);
  console.log("url: ", url);

  try {
    const queryLinks = await connection.query(
      `INSERT INTO links (url,"shortUrl","userId")
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

export async function getLink(req, res) {
  const { id } = req.params;
  try {
    const queryLink = await connection.query(
      `SELECT id,url,"shortUrl" FROM links 
      WHERE id=$1
      `,
      [id]
    );
    if (queryLink.rowCount === 1) {
      return res.status(201).send(queryLink.rows[0]);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const queryUrlSelect = await connection.query(
      `SELECT url FROM links 
      WHERE "shortUrl"=$1 
      `,
      [shortUrl]
    );

    if (queryUrlSelect.rowCount === 1) {
      const queryUpdateVisits = await connection.query(
        `UPDATE links 
        SET "urlVisits"="urlVisits"+1
        WHERE "shortUrl"=$1 
        `,
        [shortUrl]
      );
      return res.redirect(queryUrlSelect.rows[0].url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function deleteLink(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;
  try {
    const queryDelete = await connection.query(
      `DELETE FROM links
      WHERE id=$1 AND "userId"=$2
      `,
      [id, userId.userId]
    );
    if (queryDelete.rowCount === 1) {
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
