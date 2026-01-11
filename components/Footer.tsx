import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-fit bg-primary flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-10 md:gap-15 xl:gap-20 2xl:gap-50 xl:flex-row py-8 xl:py-16">
        <Link href="/" className="cursor-pointer ">
          <Image
            src="/logos/full_logo_white.svg"
            alt="Dependable Accounting Logo - Tax services SI"
            width="750"
            height="250"
            className="h-auto w-60 md:w-65 lg:w-80 2xl:w-100 "
          />
        </Link>
        <div className="flex flex-col gap-10 md:flex-row md:gap-40 xl:gap-20 2xl:gap-50 items-start lg:text-lg">
          <div className="flex flex-col items-start text-white font-sourceSemibold gap-2">
            <a
              href="https://www.google.com/maps?sca_esv=7670df6d756a93b6&rlz=1C1RXQR_enUS1148US1148&sxsrf=AE3TifOAeikxyYwP-djARpfSBpDKeg88iQ:1767661504582&fbs=AIIjpHzkVKqxs4K0fKwoDSUgo5iVgtvPKblCC_ut5KhulcCahOgZIMGsoElCVNNY-swtn2K7EMAIAZvR2BeUNMDJvucbJKpt9rOTJN9XfzkuxnFgpXTGd7_w-RNw28bADy84cgHCRJ_pn9mIvoygxwYJTZXYz1VWhpKtFYKdqtYm_2E8MD2IWnvFe5kh3gAtek9pvBMTe1Ho1Jk_o0ml_pAf0plNotBEmXPNM8PBqu-qXRw5zcvQoeQ&biw=1391&bih=1270&dpr=1&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KUVdXHH_S8KJMa1Kzstb-kC7&daddr=73+Ottavio+Promenade,+Staten+Island,+NY+10307"
              target="_blank"
              className=""
            >
              73 Ottavio Promenade Staten Island, NY 10307
            </a>
            <a href="tel:+17183519201">+1 (718) 351-9201</a>
            <a href="mailto:andrew@dependableacctg.com">
              info@dependableacctg.com
            </a>
          </div>
          <div className="flex flex-col items-start text-white font-sourceSemibold w-full gap-2">
            <Link href="/">Home</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/tax-deadlines">Tax Deadlines</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full pt-10">
        <span className="h-[2px] w-full bg-grey"></span>
        <div className="flex items-center justify-between w-full p-2">
          <p className="text-[10px]! md:text-[14px]! text-white!">
            &copy; {new Date().getFullYear()} Dependable Accounting Co. All
            rights reserved.
          </p>
          <a
            href="https://craigsampson.com"
            target="_blank"
            className="font-sourceLight text-[10px]! md:text-[14px]! text-white!"
          >
            Managed by CS
          </a>
        </div>
      </div>
    </footer>
  );
}
