// import { removeErrors, removeSuccess } from "@/redux/productSlice";
// import { resetPassword } from "@/redux/userSlice";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";

// const ResetPassword = () => {
//   const { success, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { token } = useParams();
  

//   const resetPasswordSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       password,
//       confirmPassword,
//     };
//     dispatch(resetPassword({ token, userData: data }));
//   };
//   useEffect(() => {
//     if (error) {
//       // toast.error(error, { position: "top-center", autoClose: 3000 });
//       toast.success("Password Reset Successful", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       dispatch(removeErrors());
//             navigate("/sign-in");

//     }
//   }, [dispatch, error]);

//   useEffect(() => {
//     if (success) {
//       toast.success("Password Reset Successful", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       dispatch(removeSuccess());
//       navigate("/sign-in");
//     }
//   }, [dispatch, success]);
//   return (
  

//     <div className="py-16">
//       <div className="flex  bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm  mt-6">
//         <div className="w-full p-8  ">
//           <h2 className="text-2xl font-semibold text-gray-700 text-center">
//             Forget Password
//           </h2>

//           <form action="" onSubmit={resetPasswordSubmit}>
//             <div className="mt-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 New Password{" "}
//               </label>
//               <input
//                 className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-2 block w-full appearance-none"
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Confirmed Password
//                 </label>
//               </div>
//               <input
//                 className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-2 block w-full appearance-none"
//                 type="newpassword"
//                 name="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <div className="mt-2">
//               <button
//                 type="submit"
//                 className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
//               >
//                 {loading ? "Wait" : "Reset"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { Lock, Eye, EyeOff, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { removeErrors, removeSuccess } from '../redux/productSlice';
import { resetPassword } from '../redux/userSlice';

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const { loading, error, success } = useSelector(state => state.user);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'New password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldErrors({});
    
    if (!validateForm()) return;

    dispatch(resetPassword({ token, userData: formData }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: '', color: '', width: '0%' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    if (score <= 2) return { strength: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 3) return { strength: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Strong', color: 'bg-blue-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  useEffect(() => {
    if (error) {
      // toast.error(error, { position: 'top-center', autoClose: 3000 });
           toast.success('Password Reset Successful', { position: 'top-center', autoClose: 3000 });

      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      setIsSuccess(true);
      toast.success('Password Reset Successful', { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
      
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    }
  }, [dispatch, success, navigate]);

  const handleBackToSignIn = () => {
    navigate('/sign-in');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your password has been updated successfully. You can now sign in with your new password.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to sign in page in a few seconds...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4 mt-20">
      <div className="bg-white shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <button
            onClick={handleBackToSignIn}
            className="text-white hover:text-white transition-colors flex items-center gap-2 mb-1"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
          <h1 className="text-2xl font-bold text-white">Set New Password</h1>
          <p className="text-white mt-2">Create a strong password for your account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-2 border  focus:border-transparent transition-all duration-200 ${
                  fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter your new password"
                disabled={loading}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Password strength:</span>
                  <span className={`font-medium ${
                    passwordStrength.strength === 'Strong' ? 'text-blue-600' :
                    passwordStrength.strength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {passwordStrength.strength}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
              </div>
            )}

            {fieldErrors.password && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-2 border  focus:border-transparent transition-all duration-200 ${
                  fieldErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Confirm your new password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-blue-600' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                At least 8 characters long
              </li>
              <li className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? 'text-blue-600' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                One lowercase letter
              </li>
              <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-blue-600' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                One uppercase letter
              </li>
              <li className={`flex items-center gap-2 ${/\d/.test(formData.password) ? 'text-blue-600' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(formData.password) ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                One number
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl'            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating password...
              </>
            ) : (
              'Update Password'
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <button
                type="button"
                onClick={handleBackToSignIn}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={loading}
              >
                Sign in instead
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
