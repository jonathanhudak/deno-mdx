import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import mdxToHTML from "./mdxToHTML.tsx";
import fixtureOptions from "./fixtureOptions.ts";

Deno.test("mdxToHTML", async (t) => {
  await t.step("result matches fixture", async () => {
    const mdxSrc = Deno.readTextFileSync("./fixture.mdx");
    const result = await mdxToHTML(mdxSrc, fixtureOptions);
    const snapshot = await Deno.readTextFileSync("fixture.html");
    assertEquals(result, snapshot);
  });
});
