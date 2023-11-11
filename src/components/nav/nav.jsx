import NavClass from "./navmain";

import connection from "@/lib/db";

function queryDatabase() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM mainpages;", function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        let mainData = [];
        if (results.length > 0) {
          let returnJson = [];
          for (let i = 0; i < results.length; i++) {
            const row = results[i];
            mainData.push({
                name: row.name,
                link: row.link
            });
          }
        }
        resolve(mainData);
      }
    });
  });
}

export default async function Home({ params }) {
//   const id = params.id;
  const mainData = await queryDatabase();
  return ( <NavClass links={mainData} /> );
}
