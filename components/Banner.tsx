import Image from "next/image";
import Link from "next/link";
import CurrentDate from "./CurrentDate";
import { buttonVariants } from "./ui/button";
import BannerImage from "@/public/bazar-hero.png";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative bg-card isolate overflow-hidden rounded-2xl px-6 py-10 sm:px-4 sm:py-14 lg:px-8 lg:py-2">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-green-800 shadow-sm">
            <CurrentDate />
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম
            <span className="mt-1 block text-green-700">এক নজরে দেখুন</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন জানুন এক
            জায়গায়।
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              className={buttonVariants({
                className: "gap-2 rounded-lg",
                size: "lg",
              })}
              href="#সব-পণ্য"
            >
              সব পণ্য দেখুন
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-8 rounded-full bg-green-200/40 blur-3xl" />

          <Image
            src={BannerImage}
            alt="বাজারের বিভিন্ন পণ্য ও নিত্যপ্রয়োজনীয় সামগ্রী"
            priority
            className="relative h-auto w-full object-contain drop-shadow-sm"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
