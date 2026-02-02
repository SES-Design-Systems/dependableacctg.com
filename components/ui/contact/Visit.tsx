import Image from "next/image";

export default function Visit() {
  return (
    <div className="contact-container !h-fit md:!h-[215px] lg:!h-[235px] full-shadow">
      <a
        href="https://www.google.com/maps?sca_esv=7670df6d756a93b6&rlz=1C1RXQR_enUS1148US1148&sxsrf=AE3TifOAeikxyYwP-djARpfSBpDKeg88iQ:1767661504582&fbs=AIIjpHzkVKqxs4K0fKwoDSUgo5iVgtvPKblCC_ut5KhulcCahOgZIMGsoElCVNNY-swtn2K7EMAIAZvR2BeUNMDJvucbJKpt9rOTJN9XfzkuxnFgpXTGd7_w-RNw28bADy84cgHCRJ_pn9mIvoygxwYJTZXYz1VWhpKtFYKdqtYm_2E8MD2IWnvFe5kh3gAtek9pvBMTe1Ho1Jk_o0ml_pAf0plNotBEmXPNM8PBqu-qXRw5zcvQoeQ&biw=1391&bih=1270&dpr=1&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KUVdXHH_S8KJMa1Kzstb-kC7&daddr=73+Ottavio+Promenade,+Staten+Island,+NY+10307"
        target="_blank"
        className="cursor-pointer hover:scale-105 transition-all duration-300"
      >
        <Image
          src="/icons/clipboard.svg"
          alt="location"
          height={40}
          width={40}
          className=""
        />
      </a>
      <h3 className="!font-bold">Visit</h3>
      <span className="h-[1px] w-full bg-grey/20" />
      <a
        href="https://www.google.com/maps?sca_esv=7670df6d756a93b6&rlz=1C1RXQR_enUS1148US1148&sxsrf=AE3TifOAeikxyYwP-djARpfSBpDKeg88iQ:1767661504582&fbs=AIIjpHzkVKqxs4K0fKwoDSUgo5iVgtvPKblCC_ut5KhulcCahOgZIMGsoElCVNNY-swtn2K7EMAIAZvR2BeUNMDJvucbJKpt9rOTJN9XfzkuxnFgpXTGd7_w-RNw28bADy84cgHCRJ_pn9mIvoygxwYJTZXYz1VWhpKtFYKdqtYm_2E8MD2IWnvFe5kh3gAtek9pvBMTe1Ho1Jk_o0ml_pAf0plNotBEmXPNM8PBqu-qXRw5zcvQoeQ&biw=1391&bih=1270&dpr=1&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KUVdXHH_S8KJMa1Kzstb-kC7&daddr=73+Ottavio+Promenade,+Staten+Island,+NY+10307"
        target="_blank"
        className="lg:text-center hover:!text-primary/70"
      >
        73 Ottavio Promenade
      </a>
      <p>Staten Island, NY 10307</p>
    </div>
  );
}
