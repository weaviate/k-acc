import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { RouterContext } from "./useRouter";

interface SubMenuProps {}

export default function SubMenu({}: SubMenuProps) {
  const { routeTo } = useContext(RouterContext);

  return (
    <Sheet>
      <SheetTrigger>
        <IoMenu size={24} />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-center gap-2">
        <SheetHeader>
          <SheetTitle>glowyou</SheetTitle>
        </SheetHeader>
        <div className="flex flex-grow flex-col w-full items-center justify-end gap-2">
          <Button
            size="lg"
            variant="glass"
            className="w-full"
            onClick={() => routeTo("/login")}
          >
            Log in
          </Button>
          <Button
            size="lg"
            variant="glass"
            className="w-full"
            onClick={() => routeTo("/signup")}
          >
            Sign up
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
