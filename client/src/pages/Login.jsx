import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import API from "../services/api";
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("All fields required");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
      if (!res.data?.token){
        alert("Login failed: Not Token");
        return;
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <Card className="w-full max-w-md shadow-xl animate-fade">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Log In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </CardFooter>

        <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up 
            </Link>
        </p>
      </Card>
    </div>
  );
}

// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       await login(email, password);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDemoLogin = (role) => {
//     if (role === 'admin') {
//       setEmail('admin@bookstore.com');
//       setPassword('admin123');
//     } else {
//       setEmail('buyer@bookstore.com');
//       setPassword('buyer123');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center space-x-2 mb-4">
//             <BookOpen className="h-10 w-10 text-blue-600" />
//             <h1 className="text-2xl font-bold text-gray-900">BookStore</h1>
//           </div>
//           <p className="text-gray-600">Welcome back! Please sign in to your account</p>
//         </div>

//         {/* Demo Accounts */}
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               onClick={() => handleDemoLogin('admin')}
//               className="text-xs bg-blue-100 text-blue-800 px-3 py-2 rounded-md hover:bg-blue-200 transition-colors"
//             >
//               Admin Demo
//             </button>
//             <button
//               onClick={() => handleDemoLogin('buyer')}
//               className="text-xs bg-emerald-100 text-emerald-800 px-3 py-2 rounded-md hover:bg-emerald-200 transition-colors"
//             >
//               Buyer Demo
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-sm text-red-600">{error}</p>
//           </div>
//         )}

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>© 2024 BookStore. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;