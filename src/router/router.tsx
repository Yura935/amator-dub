import { BrowserRouter, Route, Routes } from "react-router-dom";

import EditUserProfilePage from "../pages/user/edit/EditUserProfile";
import GameDetailsPage from "../pages/games/gameDetails/GameDetails";
import GamesPage from "../pages/games/Games";
import { Guard } from "../guards/Guard";
import LoginPage from "../pages/sign-in/SignIn";
import MainPage from "../pages/main/Main";
import NotFoundPage from "../pages/not-found/Not-found";
import OverallRatingPage from "../pages/overall-rating/OverallRating";
import SignUpPage from "../pages/sign-up/SignUp";
import UserProfilePage from "../pages/user/UserProfile";
import ViewUserProfilePage from "../pages/user/view/ViewUserProfile";

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
          <Route path="games/:docId" element={<GameDetailsPage />} />
          <Route path="overall-rating" element={<OverallRatingPage />} />
        </Route>
      </Route>
      <Route path="/signIn" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
);

export default router;
