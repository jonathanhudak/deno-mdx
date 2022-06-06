import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { run, compile } from "@mdx-js/mdx";
import { makeHTMLPage } from "html_page";
import * as runtime from "react/jsx-runtime";
import codesandboxPlugin from "remark-codesandbox";
import prismPlugin from "rehype-prism";

// // https://github.com/mdx-js/mdx/tree/main/packages/mdx

export default async function mdxToHTML(mdxSrc: string): Promise<string> {
  const MDXSrc = await compile(mdxSrc, {
    outputFormat: "function-body",
    remarkPlugins: [[codesandboxPlugin, { mode: "button" }]],
    rehypePlugins: [prismPlugin],
  });

  const { default: MDXComponent } = await run(MDXSrc.value, runtime);

  const body = ReactDOMServer.renderToString(<MDXComponent />);
  const html = makeHTMLPage({
    head: "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.css' />",
    title: "Compile MDX",
    body,
  });

  return html;
}
