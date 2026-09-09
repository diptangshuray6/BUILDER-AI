// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connectToDatabase } from "./config/db.js";
// import authRouter from "./Routes/authRoutes.js";

// const app = express();

// await connectToDatabase();

// app.use(cors({origin: process.env.ORIGINS.split(","), credentials: true}))
// app.use(cookieParser())
// app.use(express.json())

// app.get("/", (req,res) => res.send("Server is Live !!!"));
// app.use('/api/auth', authRouter)

// app.use((err,_req,res,_next) => {
//     console.error(`[Error] ${err.message}`);
//     res.status(500).json({error: err.message})
// })

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })

import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import authRouter from "./Routes/authRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.ORIGINS?.split(",") || [],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is Live !!!");
});

app.use("/api/auth", authRouter);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(`[Error] ${err.message}`);
  res.status(500).json({ error: err.message });
});

// Connect to database
await connectToDatabase();

// Export Express app for Vercel
export default app;

// Local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
