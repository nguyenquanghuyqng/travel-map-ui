import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { Container, Row, Col } from 'react-grid-system';
import LoginProfile from './LoginProfile';
import SearchBox from '../../views/FeatureComponents/Search'
import Map from '../../views/FeatureComponents/Map';
import { connect } from 'react-redux';
class DefaultLayout extends Component {
  Logo = () => {
    return (
      <div>
        <img className="logo" src={logo} width="100" height="50" alt="gogo.vn" />
      </div>
    )
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <this.Logo />
            <SearchBox />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <LoginProfile />
          </AppSidebar>
          <main className="main" style={(this.props.regionReducer.clickRegion === true || this.props.pageReducer.isExplore === true) ? { flexDirection: 'row-reverse' } : { flexDirection: 'initial' }}>
            {/* <div className="main-content"> */}
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                  <route.component {...props} />
                )} />)
                  : (null);
              },
              )}
              <Redirect from="/" to="/about" />
            </Switch>
            {/* </div> */}
            <Map style={(this.props.regionReducer.clickRegion === true || this.props.pageReducer.isExplore === true) ? { width: '-webkit-fill-available', maxWidth: '-webkit-fill-available' } : { width: '35%' }} reload={this.props.regionReducer.reloadMap} />
            <div id="modalDiv"></div> {/* To inject CommonModal here*/}
          </main>
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    regionReducer: state.regionReducer,
    pageReducer: state.pageReducer
  }
}

export default connect(mapStateToProps)(DefaultLayout);
