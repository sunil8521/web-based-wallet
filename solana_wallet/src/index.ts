import express,{Request,Response} from "express";
import { config } from "dotenv";
config();
import cors from "cors"
import walletRoutes from "./view/routes"
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
res.json({message:"server is running👍"})
})
app.use("/api",walletRoutes)

app.all("*",(req:Request,res:Response)=>{
res.json({message:"there is no route"})
})

app.listen(PORT, () => {
  console.log(`server is running -> http://localhost:${PORT}`);
});
