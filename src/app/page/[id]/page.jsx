import connection from "@/lib/db";

export default async function main({ params }) {
  const id = params.id;
  const page = await getPage(id);
  const createContent = loadPage(page);
  console.log(page);
  return (
      <>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          <div>{id}</div>
          {createContent}
      </>
  );
}

function loadPage(page) {
  let pageText = '';
  for (let i = 0; i < page.layout.text.length; i++) {
    const text = page.layout.text[i];
    const content = text.content;
    pageText = (
      <>
        {pageText}
        {formatText(content)}
        <br></br>
      </>
    )
    console.log(text);
  }
  return pageText
}

function formatText(text) {
  const lines = text.split('\n' + '\n');
  let formatedText = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(line)
    formatedText = (
      <>
        {formatedText}
        {line}
        <br></br>
      </>
    )
  }
  return formatedText;
}

function getPage(name) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM mainpages WHERE link = ?;", [name], function(error, results, fields) {
      if (error) {
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        }
      }
    });
  });
}