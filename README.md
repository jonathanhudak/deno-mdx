# Convert an MDX to HTML String

Work in progress. Explorations of converting .mdx files into static HTML

Other deno modules probably do this much better.

```ts
import { mdxToHTML } from "https://deno.land/x/mdx_to_html/mod.ts";

const mdxSrc = `
export const Thing = () => <>World!</>

# Hello, <Thing />
`;

await Deno.writeTextFile("./hello-world.html", await mdxToHTML(mdxSrc, {
    head: "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.css' />",
    title: "Hello Word Page",
}));
```

