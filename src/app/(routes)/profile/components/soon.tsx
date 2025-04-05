import Image from "next/image";
import React from "react";

const Soon = () => {
  return (
    <div className="w-full h-full min-h-96 flex justify-center items-center">
      <Image
        src={"/assets/soon.png"}
        alt="comming soon"
        width={300}
        height={300}
        className="w-96 object-cover"
      />
    </div>
  );
};

export default Soon;
