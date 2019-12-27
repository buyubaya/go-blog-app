import React, {
  useContext,
} from "react";
import { NavLink, withRouter } from "react-router-dom";
import AppContext from "@/contexts/AppContext";
import {
  Site,
  Nav,
  Grid,
  Button,
  RouterContextProvider,
} from "tabler-react";
import {
  signOut,
} from "@/helpers/firebase";


const navBarItems = [
  {
    value: "Home",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Blogs",
    icon: "database",
    subItems: [
      { value: "Table", to: "/blogs/table", LinkComponent: withRouter(NavLink) },
      { value: "List", to: "/blogs/list", LinkComponent: withRouter(NavLink) },
      { value: "Add Blog", to: "/blogs/add", LinkComponent: withRouter(NavLink) },
    ],
  },
];


// class SiteWrapper extends React.Component {
//   state = {
//     notificationsObjects: [
//       {
//         unread: true,
//         avatarURL: "demo/faces/male/41.jpg",
//         message: (
//           <React.Fragment>
//             <strong>Nathan</strong> pushed new commit: Fix page load performance
//             issue.
//           </React.Fragment>
//         ),
//         time: "10 minutes ago",
//       },
//       {
//         unread: true,
//         avatarURL: "demo/faces/female/1.jpg",
//         message: (
//           <React.Fragment>
//             <strong>Alice</strong> started new task: Tabler UI design.
//           </React.Fragment>
//         ),
//         time: "1 hour ago",
//       },
//       {
//         unread: false,
//         avatarURL: "demo/faces/female/18.jpg",
//         message: (
//           <React.Fragment>
//             <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
//           </React.Fragment>
//         ),
//         time: "2 hours ago",
//       },
//     ],
//   };

//   render() {
//     const notificationsObjects = this.state.notificationsObjects || [];
//     const unreadCount = this.state.notificationsObjects.reduce(
//       (a, v) => a || v.unread,
//       false
//     );
//     return (
      
//     );
//   }
// }


const SiteWrapper = ({
  history,
  children,
}) => {

  const {
    userContext,
  } = useContext(AppContext);

  const userInfo = (userContext && userContext.data) || {};


  const _handleClickProfile = () => {
    history.push("/profile");
  };


  const _handleClickSettings = () => {
    console.log("_handleClickSettings");
  };


  const accountDropdownProps = {
    avatarURL: userInfo.photoURL || "https://pickaface.net/assets/images/slides/slide2.png",
    name:  userInfo.displayName,
    description: userInfo.email,
    options: [
      {
        icon: "user",
        value: "Profile",
        onClick: _handleClickProfile,
      },
      {
        icon: "settings",
        value: "Settings",
        onClick: _handleClickSettings,
      },
      { isDivider: true },
      {
        icon: "log-out",
        value: "Sign out",
        onClick: signOut,
      },
    ],
  };


  return (
    <Site.Wrapper
      headerProps={{
        href: "/",
        alt: "Go Blog",
        imageURL: "/demo/brand/tabler.svg",
        navItems: (
          <Nav.Item type="div" className="d-none d-md-flex">
            <Button
              href="https://github.com/buyubaya/go-blog-app"
              target="_blank"
              outline
              size="sm"
              RootComponent="a"
              color="primary"
            >
              Source code
            </Button>
          </Nav.Item>
        ),
        accountDropdown: accountDropdownProps,
      }}
      navProps={{ itemsObjects: navBarItems }}
      routerContextComponentType={withRouter(RouterContextProvider)}
      footerProps={{
        nav: (
          <React.Fragment>
            <Grid.Col auto={true}>
              <Button
                href="https://github.com/buyubaya/go-blog-app"
                size="sm"
                outline
                color="primary"
                RootComponent="a"
              >
                Source code
              </Button>
            </Grid.Col>
          </React.Fragment>
        ),
      }}
    >
      {children}
    </Site.Wrapper>
  );
};


export default withRouter(SiteWrapper);
