// src/pages/AuthPage.jsx
import { useState } from "react"
import { Mail, Lock, User } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", form, "Is Login:", isLogin)
    setForm({ name: "", email: "", password: "" })
    alert(`Successfully ${isLogin ? "logged in" : "signed up"}! (Simulated)`)
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* LEFT PANEL */}
        <div
          className={`relative flex flex-1 flex-col h-full items-center justify-center p-8 md:p-12 transition-colors duration-700 ${
            isLogin ? "bg-white text-black" : "bg-[#003366] text-white"
          }`}
        >
          {/* Geometric Shapes */}
          {!isLogin && (
            <>
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white opacity-10 pointer-events-none"></div>
              <div className="absolute -top-10 -right-10 h-32 w-32 rotate-45 bg-white opacity-10 pointer-events-none"></div>
              <div className="absolute bottom-10 right-10 h-20 w-20 rotate-12 bg-white opacity-10 pointer-events-none"></div>
              <div className="absolute top-20 left-20 h-16 w-16 rotate-90 bg-white opacity-10 pointer-events-none"></div>
            </>
          )}

          {isLogin ? (
            <form
              onSubmit={handleSubmit}
              className="z-10 w-full max-w-md space-y-5 h-full flex flex-col justify-center"
            >
              <h2 className="mb-6 text-center text-3xl font-bold text-[#FF8C00]">Sign In to Your Account</h2>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="text-right text-sm text-gray-500">
                <a href="#" className="hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#FF8C00] py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                SIGN IN
              </button>
              <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="font-semibold text-[#003366] hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            <div className="z-10 max-w-sm text-center">
              <h2 className="mb-4 text-4xl font-bold">Welcome Back!</h2>
              <p className="mb-6">To keep connected with us please login with your personal info</p>
              <button
                onClick={() => setIsLogin(true)}
                className="rounded-full border-2 border-white px-6 py-2 font-semibold text-white transition hover:bg-white hover:text-[#003366]"
              >
                SIGN IN
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`relative flex flex-1 flex-col h-full items-center justify-center p-8 md:p-12 transition-colors duration-700 ${
            isLogin ? "bg-[#003366] text-white" : "bg-white text-black"
          }`}
        >
          {/* Geometric Shapes */}
          {isLogin && (
            <>
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white opacity-10 pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rotate-45 bg-white opacity-10 pointer-events-none"></div>
              <div className="absolute top-10 left-10 h-20 w-20 rotate-12 bg-white opacity-10 pointer-events-none"></div>
              <div className="absolute bottom-20 right-20 h-16 w-16 rotate-90 bg-white opacity-10 pointer-events-none"></div>
            </>
          )}

          {!isLogin ? (
            <form
              onSubmit={handleSubmit}
              className="z-10 w-full max-w-md space-y-5 h-full flex flex-col justify-center"
            >
              <h2 className="mb-6 text-center text-3xl font-bold text-[#FF8C00]">Create Account</h2>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  required
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#FF8C00] py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                SIGN UP
              </button>
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="font-semibold text-[#003366] hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <div className="z-10 max-w-sm text-center text-white">
              <h2 className="mb-4 text-4xl font-bold">Hello Friend!</h2>
              <p className="mb-6">Enter your personal details and start your journey with us</p>
              <button
                onClick={() => setIsLogin(false)}
                className="rounded-full border-2 border-white px-6 py-2 font-semibold text-white transition hover:bg-white hover:text-[#003366]"
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
