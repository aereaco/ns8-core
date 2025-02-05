import Vue from "vue";
import VueRouter from "vue-router";
import ClusterStatus from "../views/ClusterStatus";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Applications from "../views/Applications";
import SystemLogs from "../views/SystemLogs";
import SettingsCluster from "../views/SettingsCluster";
import SoftwareCenterAppInstances from "../views/SoftwareCenterAppInstances";
import Domains from "../views/Domains";
import Nodes from "../views/Nodes";
import NodeDetail from "../views/NodeDetail";
import DomainUsersAndGroups from "../views/DomainUsersAndGroups";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/status" },
  {
    path: "/status",
    name: "ClusterStatus",
    component: ClusterStatus,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/init",
    name: "InitializeCluster",
    component: () =>
      import(
        /* webpackChunkName: "initialize-cluster" */ "../views/InitializeCluster.vue"
      ),
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/settings/cluster",
    name: "SettingsCluster",
    component: SettingsCluster,
  },
  {
    path: "/settings/software-repository",
    name: "SettingsSoftwareRepositories",
    component: () =>
      import(
        /* webpackChunkName: "settings-software-repositories" */ "../views/SettingsSoftwareRepositories.vue"
      ),
  },
  {
    path: "/apps/:appId",
    name: "Applications",
    component: Applications,
  },
  {
    path: "/software-center",
    name: "SoftwareCenter",
    component: () =>
      import(
        /* webpackChunkName: "software-center" */ "../views/SoftwareCenter.vue"
      ),
  },
  {
    path: "/software-center/app-instances/:appName",
    name: "SoftwareCenterAppInstances",
    component: SoftwareCenterAppInstances,
  },
  {
    path: "/system-logs",
    name: "SystemLogs",
    component: SystemLogs,
  },
  {
    path: "/audit-trail",
    name: "AuditTrail",
    component: () =>
      import(/* webpackChunkName: "audit-trail" */ "../views/AuditTrail.vue"),
  },
  {
    path: "/domains",
    name: "Domains",
    component: Domains,
  },
  {
    path: "/nodes",
    name: "Nodes",
    component: Nodes,
  },
  {
    path: "/nodes/:nodeId",
    name: "NodeDetail",
    component: NodeDetail,
  },
  {
    path: "/domains/:domainName",
    name: "DomainUsersAndGroups",
    component: DomainUsersAndGroups,
  },
  {
    path: "/domains/:domainName/configuration",
    name: "DomainConfiguration",
    component: () =>
      import(
        /* webpackChunkName: "domain-configuration" */ "../views/DomainConfiguration.vue"
      ),
  },
  {
    path: "/backup",
    name: "Backup",
    component: () =>
      import(/* webpackChunkName: "backup" */ "../views/Backup.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

// go to login page if there is no auth token in local storage
router.beforeEach((to, from, next) => {
  let isAuthenticated = false;
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  // (token expiration is checked only when invoking server API)
  if (loginInfo && loginInfo.token) {
    isAuthenticated = true;
  }

  if (to.name !== "Login" && !isAuthenticated) {
    console.log("No token in localstorage");

    next({ name: "Login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
