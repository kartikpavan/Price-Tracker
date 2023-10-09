import React from "react";
import { IconType } from "react-icons";

interface props {
  title: string;
  Icon: IconType;
  value: string;
  iconColor: string;
}

const PriceInfoCard = ({ title, Icon, value, iconColor }: props) => {
  return (
    <div className="flex-1 min-w-[200px] px-5 py-4 bg-base-200 flex flex-col gap-2 border-l-2 border-l-black rounded-lg">
      <p>{title}</p>
      <div className="flex items-center gap-2">
        <Icon className={`${iconColor} text-2xl`} />
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
