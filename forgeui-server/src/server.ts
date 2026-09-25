import { createApp } from "./app";
import { initSchema } from "./db";

const PORT = Number(process.env.PORT ?? 4000);

initSchema();

const app = createApp();

app.listen(PORT, () => {
  console.log(`ForgeUI server listening on http://localhost:${PORT}`);
});
