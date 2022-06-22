import Brand from "#/components/Brand";
import clsx from "clsx";

export default function Navbar() {
  return (
    <nav className={clsx("flex items-center justify-between", "px-8")}>
      <Brand className="text-lg" />
    </nav>
  );
}
