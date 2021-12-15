const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routers,
  rights: state => state.user.power
}

export default getters
