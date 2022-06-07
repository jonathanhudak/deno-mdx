import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { run, compile } from "@mdx-js/mdx";
import { CompileOptions } from "@mdx-js/types";
import { makeHTMLPage } from "html_page";
import * as runtime from "react/jsx-runtime";
import codesandboxPlugin from "remark-codesandbox";
import prismPlugin from "rehype-prism";

// // https://github.com/mdx-js/mdx/tree/main/packages/mdx

interface HTMLPageOptions {
  body?: string;
  head?: string;
  title: string;
}
type buildHTMLPageType = (options: HTMLPageOptions) => string;

const defaultCompileConfig: CompileOptions = {
  outputFormat: "function-body",
  remarkPlugins: [[codesandboxPlugin, { mode: "button" }]],
  rehypePlugins: [prismPlugin],
};

export interface Options {
  head?: string;
  title: string;
  buildHTMLPage?: buildHTMLPageType;
  compileConfig?: CompileOptions;
}

export default async function mdxToHTML(
  mdxSrc: string,
  {
    head,
    title,
    buildHTMLPage = makeHTMLPage,
    compileConfig = defaultCompileConfig,
  }: Options
): Promise<string> {
  const MDXSrc = await compile(mdxSrc, compileConfig);

  const { default: MDXComponent } = await run(MDXSrc.value, runtime);

  const body = ReactDOMServer.renderToString(<MDXComponent />);
  const html = buildHTMLPage({
    head,
    title,
    body,
  });

  return html;
}
