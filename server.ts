// Server setup and app initialization
import app from "./src/app";

const PORT = process.env.APP_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
