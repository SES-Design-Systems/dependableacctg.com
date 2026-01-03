import Link from "next/link";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] h-fit flex items-center justify-between p-6 lg:p-8 xl:p-10 2xl:px-18 bg-primary">
      <div>
        <Link href="/" className="cursor-pointer ">
          <span className="">
            <Image
              src="/logos/full_logo_white.svg"
              alt="Dependable Accounting Logo - Tax services SI"
              width="750"
              height="250"
              className="h-auto w-40 md:w-45 lg:w-55 xl:w-60 2xl:w-70 "
            />
          </span>
        </Link>
      </div>
      <div className="xl:hidden">
        <Sidebar />
      </div>
      <div className="hidden xl:flex">
        <Nav />
      </div>
    </header>
  );
}
