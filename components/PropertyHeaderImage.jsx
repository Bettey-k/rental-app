import React from "react";
import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover h-[400px]"
            width={1000}
            height={500}
            priority={true}
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
