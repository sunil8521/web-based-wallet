import { useCallback, useEffect, useState } from "react";
import { getAllWallets, getEncryptedWallet } from "../lib/db";

const useFetchdata = (id: string) => {
  const [solWalltets, setSolWallets] = useState<
    { publicKey: string; privatekey: string }[] | [] | undefined
  >([]);
  const getData = useCallback(async () => {
    const wallets = await getEncryptedWallet(id);
    setSolWallets(wallets.wallets!);
  }, [id]);
  useEffect(() => {
    getData();
  }, [getData]);

  return { solWalltets };
};

export default useFetchdata;
