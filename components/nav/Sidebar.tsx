"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data/nav";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const [isShowing, setIsShowing] = useState(false);

  const onClick = () => {
    setIsShowing(!isShowing);
  };

  return (
    <>
      <AnimatePresence>
        {isShowing && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-primary"
          >
            <div className="h-fit flex items-center justify-between p-6 lg:p-12 xl:p-14">
              <span className="">
                <Image
                  src="/logos/logo_icon.png"
                  alt="Dependable Accounting Co. Logo"
                  width="450"
                  height="550"
                  className="h-auto w-10 md:w-15 lg:w-20"
                />
              </span>
              <button onClick={onClick} className="cursor-pointer scale-up">
                <X className="size-8 md:size-10 lg:size-12 text-white" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-10 font-outfit pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClick}
                  className="!text-2xl lg:!text-3xl text-white hover:text-white/80 scale-up"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isShowing && (
        <button onClick={onClick} className="scale-up cursor-pointer">
          <Menu className="size-8 md:size-10 lg:size-12 text-white" />
        </button>
      )}
    </>
  );
}
