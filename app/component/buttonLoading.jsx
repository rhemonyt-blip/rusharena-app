import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ButtonLoading = (
  { type, text, loading, className, onclick = null },
  ...proops
) => {
  return (
    <Button
      className={cn("", className)}
      type={type}
      disabled={loading}
      onClick={onclick}
      {...proops}
    >
      {loading && <Loader2 className="animate-spin" />}
      {text}
    </Button>
  );
};

export default ButtonLoading;
