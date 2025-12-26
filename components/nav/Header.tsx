import Link from "next/link";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] h-fit flex items-center justify-between p-6 lg:p-12 xl:p-14 2xl:px-34">
      <div>
        <Link href="/" className="cursor-pointer ">
          <span className="">
            <Image
              src="/full_logo.png"
              alt="Dependable Accounting Co. Logo"
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
