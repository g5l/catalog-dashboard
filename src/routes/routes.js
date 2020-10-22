import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import {
  Login,
  SelectCompany,
  CatalogUsers,
  CreateCatalogUser,
  EditCatalogUser,
  Products,
  CreateProduct,
  EditProduct,
  Orders,
  Order,
} from "@/pages";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DashboardLayout,
    redirect: "/Orders",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "CatalogUsers",
        name: "Usuários do Catalogo",
        component: CatalogUsers
      },
      {
        path: "CreateCatalogUser",
        name: "Criar Usuário do Catalogo",
        component: CreateCatalogUser
      },
      {
        path: "EditCatalogUser/:id",
        name: "Editar Produto",
        component: EditCatalogUser
      },
      {
        path: "Products",
        name: "Produtos",
        component: Products
      },
      {
        path: "CreateProduct",
        name: "Cadastrar Produto",
        component: CreateProduct
      },
      {
        path: "EditProduct/:id",
        name: "Editar Produto",
        component: EditProduct
      },
      {
        path: "Orders",
        name: "Pedidos",
        component: Orders
      },
      {
        path: "Order/:id",
        name: "Pedido",
        component: Order
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/SelectCompany",
    name: "SelectCompany",
    component: SelectCompany
  },
];

export default routes;
