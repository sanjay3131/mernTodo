import Image from "@/components/Image";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useState } from "react";

const Home = () => {
  const [imageInLeft, setImageInLeft] = useState<boolean>(true);
  console.log(imageInLeft);

  return (
    <div className="w-full h-screen flex relative">
      {/* login */}
      <section className="w-1/2">
        <Login image={imageInLeft} setImageInLeft={setImageInLeft} />
      </section>
      {/* image */}
      <section
        className={`absolute w-1/2 bg-amber-50 h-full  transition-all duration-300${
          imageInLeft ? " translate-x-[100%]" : ""
        }`}
      >
        <Image />
      </section>
      {/* register */}

      <section className="w-1/2">
        <Register image={imageInLeft} setImageInLeft={setImageInLeft} />
      </section>
    </div>
  );
};

export default Home;
