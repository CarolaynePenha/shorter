import connection from "../db.js";

export async function getUserUrls(req, res) {
  const { userId } = res.locals;

  try {
    const queryUsers = await connection.query(
      `
        SELECT users.id AS id, users.name AS name, SUM(links."urlVisits") AS visitCount
        FROM users
        JOIN links ON links."userId"=users.id
        WHERE users.id=$1
        GROUP BY users.id
        
          `,
      [userId.userId]
    );

    if (queryUsers.rowCount) {
      const queryUrls = await connection.query(
        `
            SELECT id,"shortUrl",url,"urlVisits" AS "visitCount"
            FROM links
            WHERE "userId"=$1
              `,
        [userId.userId]
      );
      const userInfos = {
        ...queryUsers.rows[0],
        shortenedUrls: queryUrls.rows,
      };
      console.log("userInfos: ", userInfos);
      return res.status(200).send(userInfos);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const queryRanking = await connection.query(
      `
          SELECT users.id AS id, users.name AS name, COUNT(links."shortUrl") AS linksCount, SUM(links."urlVisits") AS visitCount
          FROM users
          LEFT JOIN links
          ON users.id=links."userId"
          GROUP BY users.id
          
            `
    );

    if (queryRanking.rowCount) {
      return res.status(200).send(queryRanking.rows);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
