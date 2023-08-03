import { Icon } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export default function CardIcon({ title, description, icon }: Props) {
  return (
    <>
      <div className="overflow-hidden text-center bg-white rounded cursor-pointer shadow-lg hover:border-2 hover:border-black text-slate-500 border-gray-600 shadow-slate-200 transition-all duration-300 ease-in-out transform  ">
        <figure className="p-6 pb-0 flex items-center justify-center ">
          {icon}
        </figure>

        <div className="p-6">
          <h3 className="mb-4 text-xl font-medium text-slate-700">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
