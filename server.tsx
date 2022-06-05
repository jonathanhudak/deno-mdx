import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { run, compile } from "@mdx-js/mdx";
import { makeHTMLPage } from "html_page";
import * as runtime from "react/jsx-runtime";
import codesandboxPlugin from "remark-codesandbox";
import prismPlugin from "rehype-prism";

// // https://github.com/mdx-js/mdx/tree/main/packages/mdx

const MDXFile = `
export const Thing = ({ Tag = 'span' }) => <Tag>World!</Tag>

# Hello, <Thing Tag="strong" />
# Hello, <Thing Tag="marquee" />

\`\`\`js codesandbox=react
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello remark-codesandbox!</h1>,
  document.getElementById('root')
);
\`\`\`
`;

const MDXSrc = await compile(MDXFile, {
  outputFormat: "function-body",
  remarkPlugins: [[codesandboxPlugin, { mode: "button" }]],
  rehypePlugins: [prismPlugin],
});

const { default: MDXComponent } = await run(MDXSrc.value, runtime);

const body = ReactDOMServer.renderToString(<MDXComponent />);

serve(
  (req) => {
    const url = new URL(req.url);

    switch (url.pathname) {
      default:
        return new Response(
          makeHTMLPage({
            head: "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.css' />",
            title: "Compile MDX",
            body,
          }),
          {
            status: 200,
            headers: {
              "content-type": "text/html",
            },
          }
        );
    }
  },
  {
    port: 8005,
  }
);
