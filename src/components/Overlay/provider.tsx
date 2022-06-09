/* eslint-disable react/no-unused-state */

import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { RouteComponentProps } from "react-router";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "./context";

// export function withRouter( Child ) {
//   return ( props ) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     return <Child { ...props } navigate={ navigate } location={ location } />;
//   }
// }

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
class Provider extends React.Component<
  // RouteComponentProps<{}>,
  any,
  OverlayContextInterface
> {
  notificationCloseDelay = 2500;

  constructor(props) {
    super(props);
    this.state = {
      context: null,
      hide: this.hide,
      show: this.show,
      theme: null,
      type: null,
    };
  }

  componentDidUpdate(prevProps) {
    // console.info("COMPONENT DID UPDATE")
    // console.info(this.props)
    if (
      // this.props.history.location.pathname !== prevProps.history.location.pathname &&
      this.props.router.location.pathname !==
        prevProps.router.location.pathname &&
      this.state.type !== OverlayType.message
    ) {
      this.hide();
    }
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme,
    context?: InnerOverlayContextInterface
  ) => {
    this.setState({ type, theme, context });
    document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
    if (type === OverlayType.message) {
      setTimeout(this.hide, this.notificationCloseDelay);
    }
  };

  hide = () => {
    this.setState({ type: null });
    document.body.style.overflow = "";
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default withRouter(Provider);
// export default Provider;
