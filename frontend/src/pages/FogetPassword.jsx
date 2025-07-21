// import { removeErrors, removeSuccess } from '@/redux/productSlice';
// import { forgotPassword } from '@/redux/userSlice';
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';

// const FogetPassword = () => {
//      const {loading,error,success,message}=useSelector(state=>state.user);
//      console.log(error,success,message);
     
//     const dispatch=useDispatch();
//     const [email,setEmail]=useState("");
//     const forgotPasswordEmail=(e)=>{
      
//         e.preventDefault();
//         if(!email){
//         return toast.error("Field is required")
//       }
//         const myForm=new FormData();
//         myForm.set('email',email)
//         dispatch(forgotPassword(myForm))
//         if(loading){
//              setEmail("");
//         }
//     }
//         useEffect(()=>{
//                 if(error){
//                   toast.error(error,{position:'top-center',autoClose:3000});
//                   dispatch(removeErrors())
//                 }
//               },[dispatch,error])

//         useEffect(()=>{
//                 if(success){
//                   toast.success(message,{position:'top-center',autoClose:3000});
//                   dispatch(removeSuccess());
//                 }
//               },[dispatch,success])
   

//   return (
//     <div className="py-16">
//       <div className="flex  bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm  mt-6">
      
//         <div className="w-full p-8  ">
//           <h2 className="text-2xl font-semibold text-gray-700 text-center">
//            Forget Password
//           </h2>

         
//           <form action="" onSubmit={forgotPasswordEmail}>
            
//             <div className="mt-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Email 
//               </label>
//               <input
//                 className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-2 block w-full appearance-none"
//                 type="email"
//                 name="email"
//                 value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//               />
//             </div>
//             {/* <div className="mt-4">
//               <div className="flex justify-between">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   New Password
//                 </label>
//               </div>
//               <input
//                 className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-2 block w-full appearance-none"
//                 type="newpassword"
//                 name="newpassword"
//                 value={formdata.newpassword}
//                 onChange={handleChange}
//               />
//             </div> */}
//             <div className="mt-2">
//               <button
//                 type="submit"
//                 className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
//               >
//                 {loading?"Sending":"Submit"}
//               </button>
//             </div>
//           </form>
         
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FogetPassword



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess } from '../redux/productSlice';
import { forgotPassword } from '../redux/userSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const { loading, error, success, message } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldErrors({});
    
    if (!validateForm()) return;

    const myForm = new FormData();
    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      setIsSuccess(true);
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success, message]);

  const handleBackToSignIn = () => {
    navigate('/sign-in');
  };
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <span className="font-medium">{email}</span>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <button
            onClick={handleBackToSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center p-4 mt-14">
      <div className="bg-white  shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5">
          <button
            onClick={handleBackToSignIn}
            className="text-slate-200 hover:text-white transition-colors flex items-center gap-1"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-slate-100 mt-2">Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border   focus:border-transparent transition-all duration-200 ${
                  fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter your email address"
                disabled={loading}
                autoFocus
              />
            </div>
            {fieldErrors.email && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              We'll send you a secure link to reset your password. The link will expire in 30 min for your security.
            </p>
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
                Sending reset link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <button
                type="button"
                onClick={handleBackToSignIn}
                className="text-slate-600 hover:text-slate-700 font-medium transition-colors"
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

export default ForgotPassword;