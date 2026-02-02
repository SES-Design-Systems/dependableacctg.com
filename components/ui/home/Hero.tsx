import PrimaryButton from "../../Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-[url('/best_tax_returns_staten_island.jpg')] bg-cover bg-center h-fit flex flex-col items-start justify-center gap-4 lg:gap-6 px-4 py-10 md:px-10 md:py-12 lg:px-14 lg:py-20 2xl:px-20 2xl:py-30"
    >
      <h1 className="max-w-lg md:max-w-2xl lg:max-w-5xl 2xl:max-w-6xl">
        Empowering Your Business <br />
        with Expert Accounting &amp; Tax Services
      </h1>
      <p className="max-w-md md:max-w-xl 2xl:max-w-3xl text-white">
        Dependable Accounting Co. partners with individuals and small businesses
        for reliable tax, accounting, and advisory solutions by professionals
        you can trust.
      </p>
      <PrimaryButton />
    </section>
  );
}
