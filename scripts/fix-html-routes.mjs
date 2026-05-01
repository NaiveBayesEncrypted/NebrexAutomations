import { readdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const entries = await readdir(dist, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory() || !entry.name.endsWith(".html")) continue;

  const directoryPath = join(dist, entry.name);
  const generatedIndex = join(directoryPath, "index.html");
  const finalPath = join(dist, entry.name);

  await rename(generatedIndex, `${finalPath}.tmp`);
  await rm(directoryPath, { recursive: true, force: true });
  await rename(`${finalPath}.tmp`, finalPath);
}
