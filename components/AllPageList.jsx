import Link from "next/link";

const AllPageList = () => {
  const listOfPage = [
    { label: "All", href: "/all" },
    { label: "Bags", href: "/bags" },
    { label: "Clothes", href: "/clothes" },
    { label: "Shoes", href: "/shoes" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Kids", href: "/kids" },
    { label: "Baby", href: "/baby" },
    { label: "Beauty", href: "/beauty" },
    { label: "Health", href: "/health" },
  ];
  return (
    <div className='flex items-center gap-4  overflow-x-scroll py-1'>
      {listOfPage.map((list, i) => (
        <Link
        key={i}
          className='text-gray-500 font-semibold text-lg max-[350px]:text-sm'
          href={list.href}
        >
          {list.label}
        </Link>
      ))}
    </div>
  );
};

export default AllPageList;
