import "dotenv/config";
import { connectDatabase } from "./config/db.js";
import { app } from "./app.js";

//get port
const PORT = process.env.PORT;

//connect db and start server
const startServer = async () => {
  try {
    //connect db
    await connectDatabase();

    //run server
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
  }
};

//start server
startServer();
