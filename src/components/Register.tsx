import axiosInstance from "@/axiosInstance/AxiosInstance";
import { useState } from "react";

const Register = ({
  image,
  setImageInLeft,
}: {
  image: boolean;
  setImageInLeft: (image: boolean) => void;
}) => {
  const movetoLogin = () => {
    setImageInLeft(!image);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!userName || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        username: userName,
        email,
        password,
      });
      console.log(response);
      // Handle successful registration (e.g., redirect or show a success message)
    } catch (err) {
      setError("An error occurred during registration.");
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 bg-green-950 text-amber-50">
      <form
        onSubmit={handelRegister}
        className="w-full flex justify-center items-center flex-col h-fit gap-5"
      >
        <h1 className="text-4xl">Sign up</h1>
        <div className="flex flex-col gap-5 w-[80%]">
          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm mb-2">
              <p>{error}</p>
            </div>
          )}
          {/* User name */}
          <span className="flex flex-col gap-2 w-full">
            <label htmlFor="userName">User Name</label>
            <input
              className="bg-green-200/10 focus:bg-green-200 outline-none w-[80%] rounded-3xl p-2 px-5 focus:text-amber-900 font-bold"
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User Name"
            />
          </span>
          {/* email */}
          <span className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="ENTER YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-green-200/10 focus:bg-green-200 outline-none w-[80%] rounded-3xl p-2 px-5 focus:text-amber-900 font-bold"
            />
          </span>
          {/* password */}
          <span className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="ENTER YOUR PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-green-200/10 focus:bg-green-200 outline-none w-[80%] rounded-3xl p-2 px-5 focus:text-amber-900 font-bold"
            />
          </span>

          {/* submit */}
          <button
            type="submit"
            className="bg-green-700/90 w-[80%] rounded-3xl p-2 hover:bg-green-700 transition-all duration-300 mt-2"
          >
            SignUp
          </button>
        </div>
      </form>
      <div className="w-full px-[10%] text-xl">
        <h1>
          Already have an account?{" "}
          <button
            onClick={movetoLogin}
            className="font-bold text-green-100 bg-green-800/25 hover:bg-green-800 px-2 py-1.5 rounded-xl transition-all duration-300"
          >
            Login
          </button>
        </h1>
      </div>
    </div>
  );
};

export default Register;
