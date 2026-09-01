import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import * as yup from "yup";
import toast from "react-hot-toast";
import { loginUser, signUp } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";

export default function AuthForm({ onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";
  const [loading, setLoading] = useState(false);
  const [visibleField, setVisibleField] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const signupSchema = yup.object({
    fullName: yup
      .string()
      .min(2, "Name is too short")
      .required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm your password"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setFieldErrors({});

    try {
      const schema = isLogin ? loginSchema : signupSchema;

      await schema.validate(formData, {
        abortEarly: false,
      });

      if (isLogin) {
        const body = {
          email: formData.email,
          password: formData.password,
        };

        await dispatch(loginUser(body)).unwrap();

        navigate("/");
      } else {
        const body = {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        };

        await dispatch(signUp(body)).unwrap();

      }
    } catch (error) {
      if (error?.name === "ValidationError") {
        const errors = {};

        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });

        setFieldErrors(errors);
      } else {
        toast.error(
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong",
        );
      }
    } finally {
      setLoading(false);
    }
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
        bg-transparent backdrop-blur-xl
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
              value={formData?.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`
                w-full
                py-3 sm:py-4
                px-4 sm:px-5
                rounded-xl
                text-black
                border ${
                  fieldErrors.fullName ? "border-red-500" : "border-gray-500"
                }
                transition-all duration-300
                placeholder:text-black
              `}
            />
            {fieldErrors?.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors?.fullName}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`
              w-full
              py-3 sm:py-4
              px-4 sm:px-5
              rounded-xl
              text-black
              border ${fieldErrors.email ? "border-red-500" : "border-gray-500"}
              transition-all duration-300
              placeholder:text-black
            `}
          />
          {fieldErrors?.email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors?.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={visibleField === "password" ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleChange}
              className={`
              w-full
              py-3 sm:py-4
              px-4 sm:px-5
              rounded-xl
              text-black
              border ${
                fieldErrors.password ? "border-red-500" : "border-gray-500"
              }
              transition-all duration-300
              placeholder:text-black
            `}
            />
            <button
              type="button"
              onClick={() =>
                setVisibleField((prev) =>
                  prev === "password" ? null : "password",
                )
              }
              className="
              absolute right-3 sm:right-4
              top-1/2 -translate-y-1/2
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
          {fieldErrors?.password && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors?.password}</p>
          )}
        </div>

        {!isLogin && (
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm sm:text-lg lg:text-xl font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={visibleField === "confirmPassword" ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData?.confirmPassword}
                onChange={handleChange}
                className={`
                w-full
                py-3 sm:py-4
                px-4 sm:px-5
                rounded-xl
                text-black
                border ${
                  fieldErrors?.confirmPassword
                    ? "border-red-500"
                    : "border-gray-500"
                }
                transition-all duration-300
                placeholder:text-black
              `}
              />
              <button
                type="button"
                onClick={() =>
                  setVisibleField((prev) =>
                    prev === "confirmPassword" ? null : "confirmPassword",
                  )
                }
                className="
                absolute right-3 sm:right-4
                top-1/2 -translate-y-1/2
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
            {fieldErrors?.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors?.confirmPassword}
              </p>
            )}
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
            active:scale-95 cursor-pointer
            disabled:opacity-50
          "
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-5 sm:mt-6 text-sm sm:text-lg">
        <p className="text-black font-bold">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(isLogin ? "signup" : "login");
              setFieldErrors({});
              setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
            className="text-[#3b82f6] font-bold hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
