import Link from "next/link";

export default function PrimaryButton() {
  return (
    <Link
      href="/contact"
      className="rounded-md bg-accent2 hover:bg-accent2trans text-white leading-wide! px-6 py-1 md:py-2 md:px-8 cursor-pointer"
    >
      <span className="button">Schedule Now</span>
    </Link>
  );
}
