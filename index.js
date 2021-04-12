"use strict";

const { PurgeCSS } = require("purgecss");
const fromHtml = require("purgecss-from-html");

// removing this require will succeed running this file
require("jsdom");

const html = `
<html>
  <head>
    <style>
    .foo { background: blue; }
    .bar { color: black; }
    </style>
  </head>
  <body><div class="foo">Hello World</div></body>
</html>
`;

async function main() {
  const purger = new PurgeCSS();

  const results = await purger.purge({
    content: [
      {
        raw: html,
        extension: "html",
      },
    ],
    extractors: [
      {
        extractor: fromHtml,
        extensions: ["html"],
      },
    ],
  });

  console.log(results);
}

main()
  .then(() => console.log("done"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
