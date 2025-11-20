"use client";
import Image from "next/image";
import vendorsData from "@/app/JsonData/Vendors.json";

const Vendors = () => {
  const bgColors = [
    "#F8EAE4",
    "#DEE6F3",
    "#DAF2DB",
    "#EBF1DA",
    "#F4F6E6",
    "#E6F6F6",
    "#F6E6F6",
    "#F8EAE4",
  ];

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="my-10">
        <h1 className="text-5xl Unbounded">Weekly Top Vendors.</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        {vendorsData.map((vendor, index) => (
          <div
            key={vendor.id}
            style={{ backgroundColor: bgColors[index % bgColors.length] }}
            className="rounded-3xl p-7 shadow hover:shadow-xl 
              transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-5">
              <Image
                src={vendor.vendorMain}
                alt={vendor.title}
                width={80}
                height={80}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>

            <h2 className="text-2xl font-semibold text-center">
              {vendor.title}
            </h2>

            <p className="text-gray-600 text-center text-lg mt-1">
              {vendor.time}
            </p>

            {/* OFFER TAG */}
            <p className="bg-[var(--prim-color)] px-4 mt-4 text-white text-lg py-1 rounded text-center">
              {vendor.off}
            </p>

            <div className="flex justify-center gap-3 mt-5">
              {vendor.vendors.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt="small"
                  width={55}
                  height={55}
                  className="bg-white p-3 rounded-full shadow object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
