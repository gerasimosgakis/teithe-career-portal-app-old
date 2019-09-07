import React from "react";
import { Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AppliedRoute from "./components/AppliedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";
import Chat from "./components/chat/Chat";
import Settings from "./components/settings/Settings";

export default function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Landing} props={childProps} />
      <AppliedRoute
        exact
        path="/register"
        component={Register}
        props={childProps}
      />
      <AppliedRoute exact path="/login" component={Login} props={childProps} />
      <AppliedRoute
        exact
        path="/profiles"
        component={Profiles}
        props={childProps}
      />
      <AppliedRoute
        exact
        path="/profiles-by-handle/:handle"
        component={Profile}
        props={childProps}
      />
      <AppliedRoute
        exact
        path="/not-found"
        component={NotFound}
        props={childProps}
      />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
      <PrivateRoute exact path="/feed" component={Posts} />
      <PrivateRoute exact path="/post/:id" component={Post} />
      <PrivateRoute exact path="/chat" component={Chat} />
      <PrivateRoute exact path="/settings" component={Settings} />
    </Switch>
  );
}
