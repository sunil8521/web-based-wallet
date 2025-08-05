
import {create} from "zustand"
type dataT={
  network:string
  setNetwork:(val:string)=>void
}
const useZustand=create<dataT>((set, get)=>({
  network:"https://api.mainnet-beta.solana.com",
  setNetwork:(val:string)=>{
    set({network: val})
  }
}))

export default useZustand