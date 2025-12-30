import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-8">
        <span className="text-xl font-bold">DrawLive</span>
        <ModeToggle />
      </div>
    </header>
  );
}