import tsd from "tsd";

type Diagnostics = ReturnType<typeof tsd> extends Promise<infer T> ? T : never;

describe("types", () => {
  let diagnostics: Diagnostics;

  beforeAll(async function() {
    diagnostics = await tsd({ cwd: ".", testFiles: ["test/typescript/index-test.ts"], typingsFile: "index.d.ts" });
  });

  it("types", () => {
    if(! diagnostics.length) return;

    throw new Error("types\n\n" + diagnostics.map(_ => `${_.fileName}:${_.line}:${_.column}:${_.severity}:${_.message}`).join("\n") + "\n");
  });
});