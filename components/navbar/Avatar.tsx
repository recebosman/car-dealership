import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarNav() {
  return (
    <Avatar className="hidden md:flex">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
