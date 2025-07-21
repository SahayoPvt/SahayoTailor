import React, { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaPen,
  FaLock,
  FaCamera,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { 
  removeErrors, 
  removeSuccess, 
  updatePassword,
  updateProfile 
} from "../redux/userSlice";
import toast from "react-hot-toast";

const UserProfileCard = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { user, error, success ,loading} = useSelector((state) => state.user);

const [tempImage, setTempImage] = useState(
  user?.avatar?.url || "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp"
);
  const dispatch = useDispatch();

  const handleImageError = (e) => {
    e.target.src = "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!tempImage) return;
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      if (fileInputRef.current.files[0]) {
        formData.set("avatar", fileInputRef.current.files[0]);
      }
      dispatch(updateProfile(formData));
      
      // Reset the editing state after successful upload
      setIsEditingImage(false);
      setTempImage(null);
    } catch (error) {
      toast.error("Failed to update profile image",error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelImageEdit = () => {
    setIsEditingImage(false);
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(success?.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);





  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-10">
      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Update Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-gray-500  text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700 transition-colors"
                >
                  {loading ? <> <div className="animate-spin">h</div><div class>...updating</div> </>:"Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
        {/* Gradient Header with Profile Image */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
          <div className="relative mx-auto w-32 h-32 mb-4 group">
            <img
              src={
                isEditingImage && tempImage && user 
                  ? tempImage 
                  : user?.avatar?.url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
              }
              alt={`${user?.name}'s profile picture`}
              onError={handleImageError}
              loading="lazy"
              className={`w-full h-full rounded-full border-4 border-white shadow-lg transition-all ${
                isEditingImage ? "ring-2 ring-yellow-400" : ""
              }`}
            />

            {/* Camera button positioned inside the image on right side */}
            <button
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsEditingImage(!isEditingImage)}
              aria-label="Edit profile picture"
            >
              <FaCamera className="text-blue-600" />
            </button>

            {isEditingImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium mb-2"
                >
                  Change Photo
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelImageEdit}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveImage}
                    disabled={!tempImage || isUploading}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-3">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            {user?.name}
          </h1>
      

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-gray-800">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
            >
              <FaLock className="text-blue-500" />
              <span>Update Password</span>
            </button>
            <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
              Edit Profile Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;


// import React, { useState, useRef, useEffect } from "react";
// import { 
//   Mail, 
//   Calendar, 
//   Pen, 
//   Lock, 
//   Camera, 
//   X, 
//   Loader2 
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { 
//   removeErrors, 
//   removeSuccess, 
//   updatePassword,
//   updateProfile 
// } from "@/redux/userSlice";
// import toast from "react-hot-toast";

// const UserProfileCard = () => {
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isEditingImage, setIsEditingImage] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   const { user, error, success, loading } = useSelector((state) => state.user);

//   const [tempImage, setTempImage] = useState(
//     user?.avatar?.url || "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp"
//   );
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleImageError = (e) => {
//     e.target.src = "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp";
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
    
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setTempImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveImage = async () => {
//     if (!tempImage) return;
    
//     try {
//       setIsUploading(true);
//       const formData = new FormData();
//       if (fileInputRef.current.files[0]) {
//         formData.set("avatar", fileInputRef.current.files[0]);
//       }
//       dispatch(updateProfile(formData));
      
//       setIsEditingImage(false);
//       setTempImage(null);
//     } catch (error) {
//       toast.error("Failed to update profile image");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleCancelImageEdit = () => {
//     setIsEditingImage(false);
//     setTempImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handlePasswordUpdate = (e) => {
//     e.preventDefault();
    
//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords don't match");
//       return;
//     }
    
//     const myForm = new FormData();
//     myForm.set("oldPassword", oldPassword);
//     myForm.set("newPassword", newPassword);
//     myForm.set("confirmPassword", confirmPassword);

//     dispatch(updatePassword(myForm));
//     setShowPasswordModal(false);
//     setOldPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   useEffect(() => {
//     if (error) {
//       // Handle all errors except the password success message
//       if (error.message !== "Password updated successfully") {
//         toast.error(error.message, { position: 'top-center', autoClose: 3000 });
//       }
//       dispatch(removeErrors());
//     }
//   }, [dispatch, error]);

//   useEffect(() => {
//     if (success && success.message !== "Password updated successfully") {
//       toast.success(success.message, { position: 'top-center', autoClose: 3000 });
//       dispatch(removeSuccess());
//     }
//   }, [dispatch, success]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-18">
//       {/* Password Update Modal */}
//       {showPasswordModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Update Password
//               </h3>
//               <button
//                 onClick={() => setShowPasswordModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <form onSubmit={handlePasswordUpdate}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     value={oldPassword}
//                     onChange={(e) => setOldPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded"
                  
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded"
                    
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm New Password
//                   </label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded"
                  
//                   />
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowPasswordModal(false)}
//                   className="px-4 py-2 border border-gray-500 text-gray-700 hover:bg-gray-50 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded flex items-center gap-2"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="animate-spin" size={18} />
//                       Updating...
//                     </>
//                   ) : (
//                     "Update Password"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Profile Card */}
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
//         {/* Gradient Header with Profile Image */}
//         <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
//           <div className="relative mx-auto w-32 h-32 mb-4 group">
//             <img
//               src={
//                 isEditingImage && tempImage && user 
//                   ? tempImage 
//                   : user?.avatar?.url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
//               }
//               alt={`${user?.name}'s profile picture`}
//               onError={handleImageError}
//               loading="lazy"
//               className={`w-full h-full rounded-full object-cover border-4 border-white shadow-lg transition-all ${
//                 isEditingImage ? "ring-2 ring-yellow-400" : ""
//               }`}
//             />

//             {/* Camera button positioned inside the image on right side */}
//             <button
//               className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
//               onClick={() => setIsEditingImage(!isEditingImage)}
//               aria-label="Edit profile picture"
//             >
//               <Camera className="text-blue-600" size={16} />
//             </button>

//             {isEditingImage && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//                 <button
//                   onClick={() => fileInputRef.current.click()}
//                   className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium mb-2"
//                 >
//                   Change Photo
//                 </button>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleCancelImageEdit}
//                     className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveImage}
//                     disabled={!tempImage || isUploading}
//                     className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium flex items-center gap-1 disabled:opacity-50"
//                   >
//                     {isUploading ? (
//                       <>
//                         <Loader2 className="animate-spin" size={14} />
//                         Saving...
//                       </>
//                     ) : (
//                       "Save"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="p-3">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
//             {user?.name}
//           </h1>
//           <p className="text-center text-blue-600 text-sm font-medium mb-6">
//             Professional Title
//           </p>

//           <div className="space-y-4 mb-6">
//             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//               <Mail className="text-blue-500 flex-shrink-0" size={18} />
//               <div>
//                 <p className="text-xs text-gray-500">Email</p>
//                 <p className="text-gray-800">{user?.email}</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//               <Calendar className="text-blue-500 flex-shrink-0" size={18} />
//               <div>
//                 <p className="text-xs text-gray-500">Member Since</p>
//                 <p className="text-gray-800">
//                   {user?.createdAt
//                     ? new Date(user.createdAt).toLocaleDateString("en-GB", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })
//                     : "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col space-y-3">
//             <button
//               onClick={() => setShowPasswordModal(true)}
//               className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
//             >
//               <Lock className="text-blue-500" size={18} />
//               <span>Update Password</span>
//             </button>
//             <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center justify-center gap-2">
//               <Pen size={18} />
//               Edit Profile Information
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileCard;




