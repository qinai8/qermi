import {asyncRouterMap,fixedRouter} from '@/router'
import router from '@/router'
var addRouFlag = false

//全局路由守卫
router.beforeEach((to, from, next) => {
	//判断是否登录
	let token = sessionStorage.getItem('token')
	console.log(token,"8555");
	let perms = sessionStorage.getItem('perms')
	//console.log(perms)
	if (perms&&perms!=='') {
		next()
		 // 1.如果路由表 没根据角色进行筛选,就筛选一次
		if (!addRouFlag) {
			addRouFlag = true
			//includes
			let arry=[]
			if(perms[0]=="*"){
				arry = asyncRouterMap
			}else{
				arry = baseRoleGetRouters(asyncRouterMap, perms.split(","))
				}
				//2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
				// 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
				global.antRouter =arry
				// 4.将生成好的路由addRoutes
				router.addRoutes(arry)
				// 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
				router.push({
					path: to.path
				})
				
		}
	} else {
		if (to.path === '/') {
			next()
		} else {
			next('/')
		}
	}
})

function hasPermission(route, perms) {
  if (route.meta && route.meta.perms) {
    return perms.some(role => route.meta.perms.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, perms) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  let rightRoutes = allRoutes.filter((route, index) => {
    if (hasPermission(route, perms)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, perms)
      }
      return true
    }
    return false
  })
  return rightRoutes
}




