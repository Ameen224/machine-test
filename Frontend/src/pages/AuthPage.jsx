// src/pages/AuthPage.jsx
import React from "react"
import { useState } from "react"
import { Mail, Lock, User } from "lucide-react"
import { API_BASE } from "../utils/api" 
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate() 

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Frontend: Attempting to submit form...", { form, isLogin })
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"
    const url = `${API_BASE}${endpoint}`
    try {
      console.log(`Frontend: Sending POST request to ${url}`)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      console.log("Frontend: Received response from backend:", data)
      if (response.ok) {
        alert(`Successfully ${isLogin ? "logged in" : "signed up"}! Message: ${data.message}`)
        localStorage.setItem("token", data.token) // Store the token
        setForm({ name: "", email: "", password: "" }) // Clear form on success
        navigate("/home") // Redirect to home page on success
      } else {
        alert(`Error ${isLogin ? "logging in" : "signing up"}: ${data.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Frontend: Network or server error:", error)
      alert("Failed to connect to the server. Please ensure your backend is running and accessible.")
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div
          className={`relative flex flex-1 flex-col items-center justify-center p-8 transition-colors duration-700 md:p-12 ${
            isLogin ? "bg-white text-black" : "bg-[#003366] text-white"
          }`}
        >
          {/* Geometric Shapes */}
          {!isLogin && (
            <>
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white opacity-10"></div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rotate-45 bg-white opacity-10"></div>
              <div className="pointer-events-none absolute bottom-10 right-10 h-20 w-20 rotate-12 bg-white opacity-10"></div>
              <div className="pointer-events-none absolute left-20 top-20 h-16 w-16 rotate-90 bg-white opacity-10"></div>
            </>
          )}
          {isLogin ? (
            <form
              onSubmit={handleSubmit}
              className="z-10 flex h-full w-full max-w-md flex-col justify-center space-y-5"
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
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
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
          className={`relative flex flex-1 flex-col items-center justify-center p-8 transition-colors duration-700 md:p-12 ${
            isLogin ? "bg-[#003366] text-white" : "bg-white text-black"
          }`}
        >
          {/* Geometric Shapes */}
          {isLogin && (
            <>
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white opacity-10"></div>
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rotate-45 bg-white opacity-10"></div>
              <div className="pointer-events-none absolute left-10 top-10 h-20 w-20 rotate-12 bg-white opacity-10"></div>
              <div className="pointer-events-none absolute bottom-20 right-20 h-16 w-16 rotate-90 bg-white opacity-10"></div>
            </>
          )}
          {!isLogin ? (
            <form
              onSubmit={handleSubmit}
              className="z-10 flex h-full w-full max-w-md flex-col justify-center space-y-5"
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
