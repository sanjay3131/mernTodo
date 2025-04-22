import axiosInstance from "@/axiosInstance/AxiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router";
const Login = ({
  image,
  setImageInLeft,
}: {
  image: boolean;
  setImageInLeft: (image: boolean) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const movetoRegister = () => {
    setImageInLeft(!image);
    setEmail("");
    setPassword("");
  };
  const handelLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const respose = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("response : ", respose);

      if (respose.status == 200) {
        localStorage.setItem("token", respose.data.token);

        navigate("/userPage");
      }
    } catch (error) {
      console.error("login failed", error);
    }
  };

  return (
    <section className=" h-full  bg-green-950 px-5 ">
      <div className="w-full h-full flex flex-col justify-center items-center gap-5  text-amber-50">
        <form
          onSubmit={handelLogin}
          className="w-full flex justify-center items-center flex-col  h-fit gap-5 "
        >
          <h1 className="text-4xl">Login</h1>
          <div className="flex flex-col gap-5 w-[80%] ">
            {/* email */}
            <span className="flex flex-col  gap-2 w-full ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-green-200/10 focus:bg-green-200 outline-none w-[80%] rounded-3xl p-2 px-5 focus:text-amber-900 font-bold"
              />
            </span>
            {/* password */}
            <span className="flex flex-col  gap-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="ENTER YOUR PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-green-200/10 focus:bg-green-200 outline-none w-[80%] rounded-3xl p-2 px-5  focus:text-amber-900 font-bold"
              />
            </span>
            {/* submit */}
            <button
              type="submit"
              className="bg-green-700/90 w-[80%] rounded-3xl p-2 hover:bg-green-700 transition-all duration-300 mt-2"
            >
              Login
            </button>
          </div>
        </form>
        <div className="w-full px-[10%] text-xl">
          <h1>
            Having a account{" "}
            <button
              onClick={movetoRegister}
              className="font-bold text-green-100 bg-green-800/25 hover:bg-green-800  px-2 py-1.5 rounded-xl transition-all duration-300"
            >
              sign up
            </button>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Login;
