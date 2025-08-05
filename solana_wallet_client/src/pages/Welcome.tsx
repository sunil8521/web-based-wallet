import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {useState} from "react"
export default function Welcome() {
  const navigate=useNavigate()

  // const {value}=useSelector((state)=>state.DATA)
  // console.log(value)
  // const [mnemonic, setMnemonic] = useState<string | null>(null);

  const createAndNavigate=()=>{

 fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-mnemonic`)
      .then((res) => res.json())
      .then(({ data }) => {
        // console.log(data)
        // setMnemonic(data);
        // console.log(mnemonic)
        navigate("/create-wallet",{state:data})
      });
  }






  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-6">
      <h1 className="text-3xl font-semibold">Welcome to Solana Wallet</h1>
      <p className="text-muted-foreground">Secure. Simple. Self-Custodial.</p>

      <div className="flex flex-col gap-4 w-full max-w-sm mt-6">
        <Button className="w-full" onClick={createAndNavigate}>Create New Wallet</Button>
        <Button variant="outline" className="w-full">
          Import Existing Wallet
        </Button>
      </div>
    </div>
  );
}
