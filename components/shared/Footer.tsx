function Footer() {
  return (
    <footer className="mt-5 border-t border-border bg-card text-card-foreground">
      <div className="text-muted-foreground flex page-container flex-col gap-2 px-4 py-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className=" md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}

export default Footer;
