"use client";
import Link from "next/link";

// ✅ Slugify function
const slugify = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[\s&']+/g, "-") // Convert spaces, "&", and apostrophes to "-"
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters
};

const AllPageList = () => {
  const listOfPage = [
    { label: "All", href: "all" },
    { label: "Bags", href: "bag & wallet" },
    { label: "Clothes", href: "men's fashions" },
    { label: "Shoes", href: "shoes" },
    { label: "Men", href: "belt & wallet" },
    { label: "Women", href: "women" },
    { label: "Kids", href: "kids" },
    { label: "Baby", href: "baby" },
    { label: "Beauty", href: "beauty" },
    { label: "Health", href: "health" },
  ];


  return (
    <div className='flex items-center gap-4 overflow-x-scroll hidden-scroll py-1'>
      {listOfPage.map((list, i) => (
        <Link
          key={i}
          className='text-gray-500 font-semibold text-lg max-[350px]:text-sm'
          href={`/category/${slugify(list.href)}`} // Slugify the href and append to /category/
        >
          {list.label}
        </Link>
      ))}
    </div>
  );
};

export default AllPageList;