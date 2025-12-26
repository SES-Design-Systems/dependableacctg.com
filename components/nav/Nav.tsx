import { navItems } from "@/data/nav";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex items-center justify-between gap-10 w-full">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-xl 2xl:text-2xl text-primary hover:text-grey"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
