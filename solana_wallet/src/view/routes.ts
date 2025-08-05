import {Router} from "express"
import {generate_mnemonic,validate_mnemonic,generate_wallet} from "../controller/create_wallet"

const walletRoutes=Router()
walletRoutes.get("/generate-mnemonic",generate_mnemonic)
walletRoutes.post("/validate-mnemonic",validate_mnemonic)
walletRoutes.post("/generate-wallet",generate_wallet)

export default walletRoutes