import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function CreateWallet() {
  const nav = useNavigate();
  const { state } = useLocation();



  const data: { phrase: string } = { phrase: state };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-sm w-full p-6 flex flex-col gap-6">
        <button
          className="text-sm text-muted-foreground flex items-center gap-1  cursor-pointer"
          onClick={() => nav(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-2xl font-semibold text-center">
          Your Recovery Phrase
        </h2>
        <p className="text-muted-foreground text-center text-sm">
          Please write down this 12-word phrase and keep it safe. Anyone with
          this phrase can access your wallet.
        </p>

        <Card>
          <CardContent className="p-4 grid grid-cols-3 gap-2 text-sm">
            {!data.phrase ? (
              <div className="text-center w-full text-sm text-muted-foreground">
                Loading phrase...
              </div>
            ) : (
              data.phrase.split(" ").map((word, i) => (
                <div key={i} className="bg-gray-100 p-2 rounded text-center">
                  {word}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Button
          onClick={() => {
            nav("/set-passwd", { state: data });
          }}
          className="w-full mt-4 cursor-pointer"
        >
          I Wrote It Down
        </Button>
      </div>
    </div>
  );
}

export default CreateWallet;
