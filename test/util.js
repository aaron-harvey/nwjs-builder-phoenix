import { test } from "ava";

import { remove } from "fs-extra";

import {
  mergeOptions,
  tmpName,
  tmpFile,
  tmpDir,
  compress,
  execAsync,
  findNodeModulesWithBindingDotGyp
} from "../dist/lib/util";

test("mergeOptions", async t => {
  const defaults = {
    a: false,
    b: 123,
    c: "123"
  };

  const options = mergeOptions(defaults, {
    b: undefined,
    c: "456"
  });

  t.deepEqual(options, {
    a: false,
    b: 123,
    c: "456"
  });
});

test("compress", async t => {
  // Don't use `tmpFile`, which keeps the file open and results in exceptions when spawning.
  const path = await tmpName();

  const code = await compress(
    "./assets/",
    ["./project/index.html", "./project/package.json"],
    "zip",
    path
  );
  t.is(code, 0);

  await remove(path);
});

test("findNodeModulesWithBindingDotGyp", async t => {
  // Don't use `tmpFile`, which keeps the file open and results in exceptions when spawning.
  const path = await tmpName();
  const modPath = path.endsWith("/") ? path : `${path}/`;
  const output = await execAsync(
    `mkdir ${modPath} && mkdir ${modPath}node_modules && mkdir ${modPath}node_modules/blah && touch ${modPath}node_modules/blah/binding.gyp`
  );
  const matches = await findNodeModulesWithBindingDotGyp(modPath, {});
  t.deepEqual(matches, ["node_modules/blah"]);
  await remove(path);
});
