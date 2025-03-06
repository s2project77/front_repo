import { Button } from "@/components/ui/button";

export default function SaveButton({children}) {
  return (
    <Button className="bg-green-100 px-8 md:px-12 text-green-900 hover:bg-green-200">
      {children}
    </Button>
  );
}
