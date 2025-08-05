import { Button } from "@/components/ui/button";
import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorComponent() {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-500">Oops! 💥</h1>
      <p className="mt-2 text-muted-foreground max-w-md">{message}</p>
      <Button className="mt-6" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
}
