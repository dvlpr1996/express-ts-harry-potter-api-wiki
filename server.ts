// Server setup and app initialization
import app from "./src/app";
import 'dotenv/config';

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`API running on : http://localhost:${PORT}/api/v1`);
});
