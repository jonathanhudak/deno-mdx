import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import mdxToHTML from "./mod.ts";

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

const html: string = await mdxToHTML(MDXFile);

serve(
  async (req) => {
    const url = new URL(req.url);
    const { pathname } = url;

    if (pathname === "/mdx-to-html" && req.method === "POST") {
      const mdx = await req.text();
      console.debug(mdx);
      return new Response(await mdxToHTML(mdx), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    return new Response(await mdxToHTML(MDXFile), {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });
  },
  {
    port: 8005,
  }
);
