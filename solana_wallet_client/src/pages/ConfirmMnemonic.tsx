// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConfirmMnemonic() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h2 className="text-2xl font-semibold">Confirm Your Phrase</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Please enter your 12-word recovery phrase to verify you’ve saved it.
      </p>

      <textarea
        rows={3}
        placeholder="Enter your 12-word phrase here"
        className="w-full max-w-md p-3 border rounded text-sm"
        />

      <Button className="mt-4 cursor-pointer">Confirm</Button>
    </div>
    );
}
