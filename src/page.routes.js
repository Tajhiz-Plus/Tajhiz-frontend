/** 
  All of the routes for the page layout of Tajhiz are added here,
  You can add a new route, customize the routes and delete the routes here.

*/

import Profile from "layouts/Profile/Profile";

const pageRoutes = [
  { id: 1, name: "profile", route: "/profile", component: <Profile /> },
];

export default pageRoutes;
