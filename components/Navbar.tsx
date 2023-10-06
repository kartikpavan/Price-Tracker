import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";

const iconData = [
  { icon: <AiOutlineSearch size={24} />, name: "Search" },
  { icon: <AiOutlineUser size={24} />, name: "User" },
  { icon: <AiOutlineHeart size={24} />, name: "Heart" },
];

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between px-6 py-4 md:px-20">
        <Link href="/" className="flex items-center gap-1">
          <Image src={"/assets/logo.png"} alt="Logo" width={27} height={27} />
          <p className="text-2xl font-semibold text-primary-content ">
            Price<span className="text-primary">Tracker</span>
          </p>
        </Link>
        <div className="flex items-center justify-center gap-6">
          {iconData.map((item, idx) => {
            return <div key={item.name}>{item.icon}</div>;
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
