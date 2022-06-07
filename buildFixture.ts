import { mdxToHTML } from "./mod.ts";
import fixtureOptions from "./fixtureOptions.ts";
const mdxSrc = Deno.readTextFileSync("fixture.mdx");

await Deno.writeTextFile(
  "./fixture.html",
  await mdxToHTML(mdxSrc, fixtureOptions)
);
