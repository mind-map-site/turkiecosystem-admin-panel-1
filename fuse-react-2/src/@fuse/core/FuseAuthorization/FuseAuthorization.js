import FuseUtils from "@fuse/utils";
import AppContext from "app/AppContext";
import { Component } from "react";
import { matchRoutes } from "react-router-dom";
import withRouter from "@fuse/core/withRouter";
import history from "@history";

const loginRedirectUrl = null;

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      // routes,
    };
    this.defaultLoginRedirectUrl = props.loginRedirectUrl || "/";
  }

  componentDidMount() {
    this.checkAccess();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  checkAccess() {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      this.setState({ accessGranted: !!token }); // true if token exists, false otherwise
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { location, userRole } = props;
  //   const { pathname } = location;

  //   const matchedRoutes = matchRoutes(state.routes, pathname);

  //   const matched = matchedRoutes ? matchedRoutes[0] : false;
  //   return {
  //     accessGranted: matched
  //       ? FuseUtils.hasPermission(matched.route.auth, userRole)
  //       : true,
  //   };
  // }

  redirectRoute() {
    if (!this.state.accessGranted) {
      history.push("/sign-in");
    }
    //  const { location, userRole } = this.props;
    //   const { pathname } = location;
    //   const redirectUrl = loginRedirectUrl || this.defaultLoginRedirectUrl;
    //   console.log(pathname);
    //   cons ole.log(this.state.accessGranted);

    //   if (typeof window !== "undefined") {
    //     const token = JSON.parse(localStorage.getItem("accessToken"));

    //     if (!token) {
    //       history.push("/sign-in");
    //     }
    //   }

    // setTimeout(() => history.push("dashboard/about"), 0);

    // User is guest
    // Redirect to Login Page
    // */
    //  if (!userRole || userRole.length === 0) {
    //    setTimeout(() => history.push('/sign-in'), 0);
    //    loginRedirectUrl = pathname;
    //  } else {

    // User is member
    // User mus8t be on unAuthorized page or just logged in
    // Redirect to dashboard or loginRedirectUrl
    // */
    //  setTimeout(() => history.push(redirectUrl), 0);
    //  loginRedirectUrl = this.defaultLoginRedirectUrl;
    //  }
  }

  render() {
    // console.info('Fuse Authorization rendered', this.state.accessGranted);
    return <>{this.props.children}</>;
  }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(FuseAuthorization);
