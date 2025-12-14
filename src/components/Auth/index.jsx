import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function AuthForm({ onSubmit }) {
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";
  const [loading, setLoading] = useState(false);
  const [visibleField, setVisibleField] = useState(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit();
  };

  return (
    <div
      className="
        w-full
        max-w-[92%] sm:max-w-lg lg:max-w-2xl
        mx-auto
        px-5 sm:px-10 lg:px-14
        py-8 sm:py-14 lg:py-16
        rounded-3xl
        bg-transparent backdrop-blur-xs
        shadow-2xl
        mt-6 sm:mt-10 lg:mt-12
      "
    >
      <h2
        className="
          text-2xl sm:text-3xl lg:text-4xl
          font-bold text-black
          mb-3 sm:mb-4
          text-center
        "
      >
        {isLogin ? "Login" : "Create Account"}
      </h2>

      <p
        className="
          text-[#475569]
          text-center
          mb-6 sm:mb-8 lg:mb-10
          text-sm sm:text-lg
        "
      >
        {isLogin
          ? "Welcome back! Please login to continue."
          : "Create an account to start planning your trips."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:gap-5 lg:gap-6 text-sm sm:text-lg"
      >
        {!isLogin && (
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="
                w-full
                py-3 sm:py-4
                px-4 sm:px-5
                rounded-xl
                text-black
                border border-gray-500
                transition-all duration-300
                placeholder:text-black
              "
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="
              w-full
              py-3 sm:py-4
              px-4 sm:px-5
              rounded-xl
              text-black
              border border-gray-500
              transition-all duration-300
              placeholder:text-black
            "
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
            Password
          </label>
          <input
            type={visibleField === "password" ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            required
            className="
              w-full
              py-3 sm:py-4
              px-4 sm:px-5
              rounded-xl
              text-black
              border border-gray-500
              transition-all duration-300
              placeholder:text-black
            "
          />
          <button
            type="button"
            onClick={() =>
              setVisibleField((prev) =>
                prev === "password" ? null : "password"
              )
            }
            className="
              absolute right-3 sm:right-4
              top-2/3 -translate-y-1/2
              text-[#475569]
              hover:text-[#3b82f6]
              cursor-pointer
              text-lg
            "
          >
            {visibleField === "password" ? (
              <EyeOutlined />
            ) : (
              <EyeInvisibleOutlined />
            )}
          </button>
        </div>

        {!isLogin && (
          <div className="flex flex-col gap-2 relative">
            <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
              Confirm Password
            </label>
            <input
              type={visibleField === "confirmPassword" ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              className="
                w-full
                py-3 sm:py-4
                px-4 sm:px-5
                rounded-xl
                text-black
                border border-gray-500
                transition-all duration-300
                placeholder:text-black
              "
            />
            <button
              type="button"
              onClick={() =>
                setVisibleField((prev) =>
                  prev === "confirmPassword" ? null : "confirmPassword"
                )
              }
              className="
                absolute right-3 sm:right-4
                top-2/3 -translate-y-1/2
                text-[#475569]
                hover:text-[#3b82f6]
                cursor-pointer
                text-lg
              "
            >
              {visibleField === "confirmPassword" ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3 sm:py-4
            mt-3 sm:mt-4
            rounded-2xl
            text-white
            bg-(--primary) hover:bg-(--primary-hover)
            text-base sm:text-xl font-semibold
            shadow-lg hover:shadow-(--primary)/40
            transition-all duration-300
            active:scale-95
          "
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-5 sm:mt-6 text-sm sm:text-lg">
        {isLogin ? (
          <p className="text-blackfont-bold">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-[#3b82f6] font-bold hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="text-black font-bold">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-[#3b82f6] font-bold hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
