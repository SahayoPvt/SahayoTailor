
import express from 'express';
import {deleteUser, getSingleUser, getUserDetails, getUsersList, loginUser, logout, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole} from '../controllers/userController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { upload } from '../middleware/multer.js';

const router=express.Router();
router.route("/register").post(upload.single("avatar"),registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(requestPasswordReset)
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUserAuth, getUserDetails);
router.route("/password/update").put(verifyUserAuth, updatePassword);
router.route("/profile/update").patch(verifyUserAuth, updateProfile);
router.route("/admin/users").get(verifyUserAuth, roleBasedAccess('admin'), getUsersList);
router.route("/admin/user/:id")
.get(verifyUserAuth, roleBasedAccess('admin'), getSingleUser)
.put(verifyUserAuth, roleBasedAccess('admin'),updateUserRole)
.delete(verifyUserAuth, roleBasedAccess('admin'),deleteUser)
export default router;
