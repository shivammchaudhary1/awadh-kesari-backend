// index.js
import app, { PORT } from "./src/config/config.js";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
