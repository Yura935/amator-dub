import { BrowserRouter, Route, Routes } from "react-router-dom";

import EditUserProfilePage from "../pages/user/edit/EditUserProfile";
import LoginPage from "../pages/sign-in/SignIn";
import MainPage from "../pages/main/Main";
import NotFoundPage from "../pages/not-found/Not-found";
import SignUpPage from "../pages/sign-up/SignUp";
import UserProfilePage from "../pages/user/UserProfile";
import ViewUserProfilePage from "../pages/user/view/ViewUserProfile";
import { Guard } from "../guards/Guard";
import GamesPage from "../pages/games/Games";
import OverallRatingPage from "../pages/overall-rating/OverallRating";
const router = (
  <BrowserRouter>
    <Routes>
      <Route element={<Guard />}>
        <Route path="/" element={<MainPage />} errorElement={<NotFoundPage />}>
          <Route path="user" element={<UserProfilePage />}>
            <Route path="" element={<ViewUserProfilePage />} />
            <Route path="edit" element={<EditUserProfilePage />} />
          </Route>
          <Route path="games" element={<GamesPage />} />
          <Route path="overall-rating" element={<OverallRatingPage />} />
        </Route>
      </Route>
      <Route path="/signIn" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
);

export default router;
