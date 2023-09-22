// import { isUndefined } from 'lodash'
export default async function ({ $auth, redirect, route }) {
  // const token = $auth.$storage._useVuex.state.user.user.success
  // let user = $auth.$storage._useVuex.state.user.user
  // if ($auth.loggedIn && user.user && token) {
  //   if (user.user.role_id) {
  //     if (user.user.role_id === 3) {
  //       if (route.name === 'index') return redirect({ name: 'index-dashboard' })
  //       return redirect()
  //     } else {
  //       return redirect('/')
  //     }
  //   } else {
  //     return redirect('/')
  //   }
  // } else {
  //   return redirect('/')
  // }
  // if already has backend login uncomment code above and modify according to routes
  if (route.name === 'index') return redirect({ name: 'index-dashboard' })
}
