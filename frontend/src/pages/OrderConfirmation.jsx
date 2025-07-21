// import React from "react";
// import { MapPin, Package, CreditCard, Check } from "lucide-react";
// import { useSelector } from "react-redux";

// const OrderConfirmation = ({ onConfirmOrder }) => {
//   // Dummy data matching your backend structure

//   const cartItems=JSON.parse(localStorage.getItem('cartItems'))


//   console.log("cart--",cartItems);
//   const subtotal = cartItems
//     .reduce((acc, item) => acc + item.price * item.quantity, 0)
//     .toFixed(2);
//  const total=Number(subtotal)+12+20;
//   const {user}=useSelector(state=>state.user)
//   const {shippingInfo}=useSelector(state=>state.cart)
//   const orderData = {
//     shippingInfo: {
//       name: user.name,
//       address: shippingInfo.address,
//       city: shippingInfo.city,
//       state: shippingInfo.state,
//       country: shippingInfo.country,
//       pinCode: shippingInfo.pinCode,
//       phoneNo: shippingInfo.phoneNo
//     },
//     orderItems: cartItems,
//     paymentMethod: "Credit Card (ending in 4242)",
//     subtotal: 1557,
//     shipping: 20,
//     tax: 140.13,
//     total: 1717.13
//   };

  
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>
      
//       {/* Shipping Information */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <MapPin className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="font-medium text-gray-700">{shippingInfo.name}</p>
//               <p className="text-gray-600">{shippingInfo.address}</p>
//               <p className="text-gray-600">
//                 {orderData.shippingInfo.city}, {shippingInfo.state} {orderData.shippingInfo.pinCode}
//               </p>
//               <p className="text-gray-600">{shippingInfo.country}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">
//                 <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-medium">Delivery Method:</span> Standard Shipping (3-5 business days)
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Order Items */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Package className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Your Items</h3>
//         </div>
//         <div className="border rounded-lg overflow-hidden">
//           {cartItems?.map((item, index) => (
//             <div key={index} className="p-2 border-b last:border-b-0 flex items-start gap-4">
//               <img 
//                 src={item.image} 
//                 alt={item.name} 
//                 className="w-20~ h-18 object-contain"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/80";
//                 }}
//               />
//               <div className="flex-1">
//                 <h4 className="font-medium text-gray-800">{item.name}</h4>
//                 <p className="text-sm text-gray-500">Size: {item.size}</p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                 <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Payment Method */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <CreditCard className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="font-medium">{orderData.paymentMethod}</p>
//           <p className="text-sm text-gray-600 mt-1">Billing address same as shipping</p>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Subtotal</span>
//             <span>₹{Number(subtotal)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Shipping</span>
//             <span>₹{20}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Tax</span>
//             <span>₹{12}</span>
//           </div>
//           <div className="border-t border-gray-200 pt-3 flex justify-between">
//             <span className="font-bold text-gray-800">Total</span>
//             <span className="font-bold text-blue-600">₹{Number(total)}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Button */}
//       <button
//         onClick={onConfirmOrder}
//         className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
//       >
//         <Check size={18} />
//         Confirm and Place Order
//       </button>

//       <p className="text-sm text-gray-500 mt-4 text-center">
//         By placing your order, you agree to our Terms of Service and Privacy Policy.
//       </p>
//     </div>
//   );
// };

// export default OrderConfirmation;



// import React from "react";
// import { MapPin, Package, CreditCard, Check } from "lucide-react";
// import { useSelector ,useDispatch} from "react-redux";
// import { createOrder } from "../redux/orderSlice";

// const OrderConfirmation = ({ onConfirmOrder }) => {
//   const dispatch = useDispatch();
//   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   const { user } = useSelector((state) => state.user);
//   const { shippingInfo } = useSelector((state) => state.cart);

//   const subtotal = cartItems
//     .reduce((acc, item) => acc + item.price * item.quantity, 0)
//     .toFixed(2);
//   const tax = (subtotal * 0.1).toFixed(2); // 10% tax
//   const shipping = 20;
//   const total = (Number(subtotal) + Number(tax) + shipping).toFixed(2);

//   const handleConfirmOrder = async () => {
//     try {
//       const orderData = {
//         shippingInfo: {
//           address: shippingInfo.address,
//           city: shippingInfo.city,
//           state: shippingInfo.state,
//           country: shippingInfo.country,
//           pinCode: shippingInfo.pinCode,
//           phoneNo: shippingInfo.phoneNo
//         },
//         orderItems: cartItems.map(item => ({
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image,
//           product: item.product || item._id // Use product ID or fallback to item ID
//         })),
//         paymentInfo: {
//           id: `pay_${Math.random().toString(36).substr(2, 9)}`, // Generate a random payment ID
//           status: "succeeded"
//         },
//         itemPrice: subtotal,
//         taxPrice: tax,
//         shippingPrice: shipping,
//         totalPrice: total
//       };

//       // Dispatch the createOrder action
//       await dispatch(createOrder(orderData)).unwrap();
      
//       // Call the parent component's confirmation handler if provided
//       if (onConfirmOrder) {
//         onConfirmOrder();
//       }
      
//       // Clear cart items from local storage after successful order
//       localStorage.removeItem('cartItems');
      
//     } catch (error) {
//       console.error("Failed to create order:", error);
//       // You might want to show an error message to the user here
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>
      
//       {/* Shipping Information */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <MapPin className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="font-medium text-gray-700">{user?.name}</p>
//               <p className="text-gray-600">{shippingInfo.address}</p>
//               <p className="text-gray-600">
//                 {shippingInfo.city}, {shippingInfo.state} {shippingInfo.pinCode}
//               </p>
//               <p className="text-gray-600">{shippingInfo.country}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">
//                 <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-medium">Delivery Method:</span> Standard Shipping (3-5 business days)
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Order Items */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Package className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Your Items</h3>
//         </div>
//         <div className="border rounded-lg overflow-hidden">
//           {cartItems?.map((item, index) => (
//             <div key={index} className="p-2 border-b last:border-b-0 flex items-start gap-4">
//               <img 
//                 src={item.image} 
//                 alt={item.name} 
//                 className="w-20 h-18 object-contain"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/80";
//                 }}
//               />
//               <div className="flex-1">
//                 <h4 className="font-medium text-gray-800">{item.name}</h4>
//                 <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
//                 <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Payment Method */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <CreditCard className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="font-medium">Credit/Debit Card</p>
//           <p className="text-sm text-gray-600 mt-1">Billing address same as shipping</p>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Subtotal</span>
//             <span>₹{subtotal}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Shipping</span>
//             <span>₹{shipping.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Tax (10%)</span>
//             <span>₹{tax}</span>
//           </div>
//           <div className="border-t border-gray-200 pt-3 flex justify-between">
//             <span className="font-bold text-gray-800">Total</span>
//             <span className="font-bold text-blue-600">₹{total}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Button */}
//       <button
//         onClick={handleConfirmOrder}
//         className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
//       >
//         <Check size={18} />
//         Confirm and Place Order
//       </button>

//       <p className="text-sm text-gray-500 mt-4 text-center">
//         By placing your order, you agree to our Terms of Service and Privacy Policy.
//       </p>
//     </div>
//   );
// };

// export default OrderConfirmation;





// import React, { useState } from "react";
// import { MapPin, Package, CreditCard, Check, Loader2 } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { createOrder } from "../redux/orderSlice";
// import { useNavigate } from "react-router";

// const OrderConfirmation = ({ onConfirmOrder }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [formErrors, setFormErrors] = useState({});

//   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   const { user } = useSelector((state) => state.user);
//   const { shippingInfo } = useSelector((state) => state.cart);
//   console.log(shippingInfo);
  

//   const subtotal = cartItems
//     .reduce((acc, item) => acc + item.price * item.quantity, 0)
//     .toFixed(2);
//   const tax = (subtotal * 0.1).toFixed(2); // 10% tax
//   const shipping = 20;
//   const total = (Number(subtotal) + Number(tax) + shipping).toFixed(2);

//   const validateForm = () => {
//     const errors = {};
    
//     if (!shippingInfo.pinCode || shippingInfo.pinCode.toString().trim() === '') {
//       errors.pinCode = 'Postal/Zip code is required';
//     }
    
//     cartItems.forEach((item, index) => {
//       if (!item.product_id && !item._id) {
//         errors[`product_${index}`] = `Product ID is missing for ${item.name}`;
//       }
//     });
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleConfirmOrder = async () => {
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const orderData = {
//         shippingInfo: {
//           address: shippingInfo.address,
//           city: shippingInfo.city,
//           state: shippingInfo.state,
//           country: shippingInfo.country,
//           pinCode: shippingInfo.pinCode.toString(), // Ensure string format
//           phoneNo: shippingInfo.phoneNo
//         },
//         orderItems: cartItems.map(item => ({
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image,
//           product: item.product_id || item._id
//         })),
//         paymentInfo: {
//           id: `pay_${Math.random().toString(36).substr(2, 9)}`,
//           status: "succeeded"
//         },
//         itemPrice: subtotal,
//         taxPrice: tax,
//         shippingPrice: shipping,
//         totalPrice: total
//       };

//       const result = await dispatch(createOrder(orderData)).unwrap();
      
//       localStorage.removeItem('cartItems');
      
//       // if (onConfirmOrder) {
//       //   onConfirmOrder();
//       // } else {
//       //   navigate('/order-success');
//       // }

//       alert("done")
//     } catch (err) {
//       console.error("Order submission failed:", err);
//       setError(err.message || 'Failed to place order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>
      
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Shipping Information */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <MapPin className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="font-medium text-gray-700">{user?.name}</p>
//               <p className="text-gray-600">{shippingInfo.address}</p>
//               <p className="text-gray-600">
//                 {shippingInfo.city}, {shippingInfo.state} {shippingInfo.pinCode}
//                 {formErrors.pinCode && (
//                   <span className="block text-red-500 text-sm mt-1">{formErrors.pinCode}</span>
//                 )}
//               </p>
//               <p className="text-gray-600">{shippingInfo.country}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">
//                 <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-medium">Delivery Method:</span> Standard Shipping (3-5 business days)
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Order Items */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Package className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Your Items</h3>
//         </div>
//         <div className="border rounded-lg overflow-hidden">
//           {cartItems?.map((item, index) => (
//             <div key={index} className="p-2 border-b last:border-b-0 flex items-start gap-4">
//               <img 
//                 src={item.image} 
//                 alt={item.name} 
//                 className="w-20 h-18 object-contain"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/80";
//                 }}
//               />
//               <div className="flex-1">
//                 <h4 className="font-medium text-gray-800">{item.name}</h4>
//                 <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                 {formErrors[`product_${index}`] && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors[`product_${index}`]}</p>
//                 )}
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
//                 <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Payment Method */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <CreditCard className="text-blue-600" size={20} />
//           <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="font-medium">Credit/Debit Card</p>
//           <p className="text-sm text-gray-600 mt-1">Billing address same as shipping</p>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Subtotal</span>
//             <span>₹{subtotal}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Shipping</span>
//             <span>₹{shipping.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Tax (10%)</span>
//             <span>₹{tax}</span>
//           </div>
//           <div className="border-t border-gray-200 pt-3 flex justify-between">
//             <span className="font-bold text-gray-800">Total</span>
//             <span className="font-bold text-blue-600">₹{total}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Button */}
//       <button
//         onClick={handleConfirmOrder}
//         disabled={isSubmitting || cartItems.length === 0}
//         className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md transition-colors ${
//           isSubmitting || cartItems.length === 0
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//       >
//         {isSubmitting ? (
//           <>
//             <Loader2 className="animate-spin mr-2" size={18} />
//             Processing...
//           </>
//         ) : (
//           <>
//             <Check size={18} />
//             Confirm and Place Order
//           </>
//         )}
//       </button>

//       <p className="text-sm text-gray-500 mt-4 text-center">
//         By placing your order, you agree to our Terms of Service and Privacy Policy.
//       </p>
//     </div>
//   );
// };

// export default OrderConfirmation;





import React, { useEffect, useState } from "react";
import { MapPin, Package, CreditCard, Check, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { clearCart } from "../redux/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  // const [formErrors, setFormErrors] = useState({});

  // const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const { user } = useSelector((state) => state.user);
  const { shippingInfo,cartItems } = useSelector((state) => state.cart);
  console.log("item" ,cartItems);
  //useEffect(()=>{
//  const createOrderData=async()=>{
//      try {
     
     
//       dispatch(createOrder(orderData))
      
//     } catch (error) {
//       console.log("Order creation Failed")
//       toast.error(error.message || "order creation failed", { position: 'top-center', autoClose: 3000 })
//     }
//       }
//       createOrderData();
   
//   },[])

   

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const tax = (subtotal * 0.1).toFixed(2);
  const shipping = 20;
  const total = (Number(subtotal) + Number(tax) + shipping).toFixed(2);

  const orderData={
         shippingInfo: {
          address: shippingInfo.address || '',
          city: shippingInfo.city || '',
          state: shippingInfo.state || '',
          country: shippingInfo.country || '',
          pinCode: shippingInfo.pinCode, // Convert to string explicitly
          phoneNo: shippingInfo.phoneNo || ''
        },
        orderItems: cartItems.map(item => ({
          name: item.name || '',
          price: item.price || 0,
          quantity: item.quantity || 1,
          image: item.image || '',
          product: item.product_id || item._id || '' // Ensure product ID exists
        })),
        paymentInfo: {
          id: `pay_${Math.random().toString(36).substr(2, 9)}`,
          status: "succeeded"
        },
        itemPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total
      };
//   const handleSubmit=async(e)=>{
//     e.preventDefault()
// try {
//   alert("hhhh")
//   dispatch(createOrder(orderData))
  
// } catch (error) {
//   console.log(error);
  
// }       
//   }



const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Optionally set a submitting state here
    const result = await dispatch(createOrder(orderData)).unwrap();
    // Success: show a toast or redirect
    toast.success("Order placed successfully!");
    // Optionally navigate to a success page
    // navigate('/order-success');

    // dispatch(clearCart())
  } catch (error) {
    // Show backend error
    toast.error(error?.message || "Order creation failed");
    console.log("Order creation failed:", error);
  }finally{
       setIsSubmitting(false);

  }
};
  // const validateForm = () => {
  //   const errors = {};
    
  //   // Validate pinCode - must exist and be a non-empty string
  //   if (!shippingInfo.pinCode || shippingInfo.pinCode.toString().trim() === '') {
  //     errors.pinCode = 'Postal/Zip code is required';
  //   }
    
  //   // Validate product IDs in cart items
  //   cartItems.forEach((item, index) => {
  //     if (!item.product_id && !item._id) {
  //       errors[`product_${index}`] = `Product ID is missing for ${item.name}`;
  //     }
  //   });
    
  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const handleConfirmOrder = async () => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setError(null);

  //   try {
  //     // Ensure all required fields are properly formatted
  //     const orderData = {
  //       shippingInfo: {
  //         address: shippingInfo.address || '',
  //         city: shippingInfo.city || '',
  //         state: shippingInfo.state || '',
  //         country: shippingInfo.country || '',
  //         pinCode: shippingInfo.pinCode.toString(), // Convert to string explicitly
  //         phoneNo: shippingInfo.phoneNo || ''
  //       },
  //       orderItems: cartItems.map(item => ({
  //         name: item.name || '',
  //         price: item.price || 0,
  //         quantity: item.quantity || 1,
  //         image: item.image || '',
  //         product: item.product || item._id || '' // Ensure product ID exists
  //       })),
  //       paymentInfo: {
  //         id: `pay_${Math.random().toString(36).substr(2, 9)}`,
  //         status: "succeeded"
  //       },
  //       itemPrice: subtotal,
  //       taxPrice: tax,
  //       shippingPrice: shipping,
  //       totalPrice: total
  //     };

  //     // Debug log to verify the data being sent
  //     console.log('Order data being submitted:', orderData);

  //     const result = await dispatch(createOrder(orderData)).unwrap();
      
  //     localStorage.removeItem('cartItems');
      
  //     if (onConfirmOrder) {
  //       onConfirmOrder();
  //     } else {
  //       navigate('/order-success');
  //     }
  //   } catch (err) {
  //     console.error("Order submission failed:", err);
  //     setError(err.message || 'Failed to place order. Please check your information and try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // // Add a check to disable the button if pinCode is missing
  // const ispinCodeValid = shippingInfo.pinCode && shippingInfo.pinCode.toString().trim() !== '';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>
      
      {/* {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )} */}

      {/* Shipping Information Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">{user?.name}</p>
              <p className="text-gray-600">{shippingInfo.address}</p>
              <p className="text-gray-600">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.pinCode}
                {/* {formErrors.pinCode && (
                  <span className="block text-red-500 text-sm mt-1">{formErrors.pinCode}</span>
                )} */}
              </p>
              <p className="text-gray-600">{shippingInfo.country}</p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your component remains the same */}
      {/* ... */}
    {/* Order Items */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Package className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Your Items</h3>
        </div>
        <div className="border rounded-lg overflow-hidden">
          {cartItems?.map((item, index) => (
            <div key={index} className="p-2 border-b last:border-b-0 flex items-start gap-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-18 object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                {/* {formErrors[`product_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{formErrors[`product_${index}`]}</p>
                )} */}
              </div>
              <div className="text-right">
                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">Credit/Debit Card</p>
          <p className="text-sm text-gray-600 mt-1">Billing address same as shipping</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span>₹{tax}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-blue-600">₹{total}</span>
          </div>
        </div>
      </div>
     <button
        onClick={handleSubmit}
        disabled={isSubmitting }
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md transition-colors ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Processing...
          </>
        ) : (
          <>
            <Check size={18} />
            Confirm and Place Order
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 mt-4 text-center">
        By placing your order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default OrderConfirmation;