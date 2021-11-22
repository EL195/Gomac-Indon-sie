
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 // { path: '', redirectTo: 'tab', pathMatch: 'full' },

  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'agence-add',
    loadChildren: () => import('./agence-add/agence-add.module').then( m => m.AgenceAddPageModule)
  },
  {
    path: 'agence/:item',
    loadChildren: () => import('./agence/agence.module').then( m => m.AgencePageModule)
  },
  {
    path: 'reserve',
    loadChildren: () => import('./reserve/reserve.module').then( m => m.ReservePageModule)
  },
  {
    path: 'validate-voyage',
    loadChildren: () => import('./validate-voyage/validate-voyage.module').then( m => m.ValidateVoyagePageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'voyage-detail/:item',
    loadChildren: () => import('./voyage-detail/voyage-detail.module').then( m => m.VoyageDetailPageModule)
  },
  {
    path: 'voyage-edit',
    loadChildren: () => import('./voyage-edit/voyage-edit.module').then( m => m.VoyageEditPageModule)
  },
  {
    path: 'voyage-own',
    loadChildren: () => import('./voyage-own/voyage-own.module').then( m => m.VoyageOwnPageModule)
  },
  {
    path: 'villes',
    loadChildren: () => import('./villes/villes.module').then( m => m.VillesPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'orders-products',
    loadChildren: () => import('./orders-products/orders-products.module').then( m => m.OrdersProductsPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'product-form',
    loadChildren: () => import('./product-form/product-form.module').then( m => m.ProductFormPageModule)
  },
  {
    path: 'product-edit',
    loadChildren: () => import('./product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'shop-edit',
    loadChildren: () => import('./shop-edit/shop-edit.module').then( m => m.ShopEditPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./order-success/order-success.module').then( m => m.OrderSuccessPageModule)
  },
  {
    path: 'shoping-cart',
    loadChildren: () => import('./shoping-cart/shoping-cart.module').then( m => m.ShopingCartPageModule)
  },
  {
    path: 'category-product',
    loadChildren: () => import('./category-product/category-product.module').then( m => m.CategoryProductPageModule)
  },
  {
    path: 'category-product-add',
    loadChildren: () => import('./category-product-add/category-product-add.module').then( m => m.CategoryProductAddPageModule)
  },
  {
    path: 'shop-product',
    loadChildren: () => import('./shop-product/shop-product.module').then( m => m.ShopProductPageModule)
  },
  {
    path: 'voyage-add',
    loadChildren: () => import('./voyage-add/voyage-add.module').then( m => m.VoyageAddPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'colis',
    loadChildren: () => import('./colis/colis.module').then( m => m.ColisPageModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then( m => m.CoursePageModule)
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'resetcode',
    loadChildren: () => import('./resetcode/resetcode.module').then( m => m.ResetcodePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./transport/transport.module').then( m => m.TransportPageModule)
  },
  {
    path: 'validate',
    loadChildren: () => import('./validate/validate.module').then( m => m.ValidatePageModule)
  },
  {
    path: 'term',
    loadChildren: () => import('./term/term.module').then( m => m.TermPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'ville-add',
    loadChildren: () => import('./ville-add/ville-add.module').then( m => m.VilleAddPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'card/:item',
    loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'voyage-list',
    loadChildren: () => import('./voyage-list/voyage-list.module').then( m => m.VoyageListPageModule)
  },
  {
    path: 'agence/:item',
    loadChildren: () => import('./agence/agence.module').then( m => m.AgencePageModule)
  },
  {
    path: 'reserve',
    loadChildren: () => import('./reserve/reserve.module').then( m => m.ReservePageModule)
  },
  {
    path: 'validate-voyage',
    loadChildren: () => import('./validate-voyage/validate-voyage.module').then( m => m.ValidateVoyagePageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'voyage-detail',
    loadChildren: () => import('./voyage-detail/voyage-detail.module').then( m => m.VoyageDetailPageModule)
  },
  {
    path: 'voyage-edit',
    loadChildren: () => import('./voyage-edit/voyage-edit.module').then( m => m.VoyageEditPageModule)
  },
  {
    path: 'voyage-own',
    loadChildren: () => import('./voyage-own/voyage-own.module').then( m => m.VoyageOwnPageModule)
  },
  {
    path: 'villes',
    loadChildren: () => import('./villes/villes.module').then( m => m.VillesPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'orders-products',
    loadChildren: () => import('./orders-products/orders-products.module').then( m => m.OrdersProductsPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'product-form',
    loadChildren: () => import('./product-form/product-form.module').then( m => m.ProductFormPageModule)
  },
  {
    path: 'product-edit',
    loadChildren: () => import('./product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'shop-edit',
    loadChildren: () => import('./shop-edit/shop-edit.module').then( m => m.ShopEditPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./order-success/order-success.module').then( m => m.OrderSuccessPageModule)
  },
  {
    path: 'shoping-cart',
    loadChildren: () => import('./shoping-cart/shoping-cart.module').then( m => m.ShopingCartPageModule)
  },
  { 
    path: '',
     loadChildren: './tabs/tabs.module#TabsPageModule'
     },
  {
    path: 'category-product',
    loadChildren: () => import('./category-product/category-product.module').then( m => m.CategoryProductPageModule)
  },
  {
    path: 'category-product-add',
    loadChildren: () => import('./category-product-add/category-product-add.module').then( m => m.CategoryProductAddPageModule)
  },
  {
    path: 'shop-product',
    loadChildren: () => import('./shop-product/shop-product.module').then( m => m.ShopProductPageModule)
  },
  {
    path: 'voyage-add',
    loadChildren: () => import('./voyage-add/voyage-add.module').then( m => m.VoyageAddPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'colis',
    loadChildren: () => import('./colis/colis.module').then( m => m.ColisPageModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then( m => m.CoursePageModule)
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'resetcode',
    loadChildren: () => import('./resetcode/resetcode.module').then( m => m.ResetcodePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./transport/transport.module').then( m => m.TransportPageModule)
  },
  {
    path: 'validate',
    loadChildren: () => import('./validate/validate.module').then( m => m.ValidatePageModule)
  },
  {
    path: 'term',
    loadChildren: () => import('./term/term.module').then( m => m.TermPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'ville-add',
    loadChildren: () => import('./ville-add/ville-add.module').then( m => m.VilleAddPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'creditation',
    loadChildren: () => import('./creditation/creditation.module').then( m => m.CreditationPageModule)
  },
  {
    path: 'transfert',
    loadChildren: () => import('./transfert/transfert.module').then( m => m.TransfertPageModule)
  },
  {
    path: 'suggestion',
    loadChildren: () => import('./suggestion/suggestion.module').then( m => m.SuggestionPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'plat',
    loadChildren: () => import('./plat/plat.module').then( m => m.PlatPageModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./platform/platform.module').then( m => m.PlatformPageModule)
  },
  {
    path: 'plat-list',
    loadChildren: () => import('./plat-list/plat-list.module').then( m => m.PlatListPageModule)
  },
  {
    path: 'restaurant-list',
    loadChildren: () => import('./restaurant-list/restaurant-list.module').then( m => m.RestaurantListPageModule)
  },
  {
    path: 'restaurant-add',
    loadChildren: () => import('./restaurant-add/restaurant-add.module').then( m => m.RestaurantAddPageModule)
  },
  {
    path: 'category-plat',
    loadChildren: () => import('./category-plat/category-plat.module').then( m => m.CategoryPlatPageModule)
  },
  {
    path: 'category-plat-list',
    loadChildren: () => import('./category-plat-list/category-plat-list.module').then( m => m.CategoryPlatListPageModule)
  },
  {
    path: 'category-plat-add',
    loadChildren: () => import('./category-plat-add/category-plat-add.module').then( m => m.CategoryPlatAddPageModule)
  },
  {
    path: 'menu-restaurant',
    loadChildren: () => import('./menu-restaurant/menu-restaurant.module').then( m => m.MenuRestaurantPageModule)
  },
  {
    path: 'menu-restaurant-add',
    loadChildren: () => import('./menu-restaurant-add/menu-restaurant-add.module').then( m => m.MenuRestaurantAddPageModule)
  },
  {
    path: 'places/:item',
    loadChildren: () => import('./places/places.module').then( m => m.PlacesPageModule)
  },
  {
    path: 'vol',
    loadChildren: () => import('./vol/vol.module').then( m => m.VolPageModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./hotel/hotel.module').then( m => m.HotelPageModule)
  },
  {
    path: 'bus',
    loadChildren: () => import('./bus/bus.module').then( m => m.BusPageModule)
  },
  {
    path: 'check',
    loadChildren: () => import('./check/check.module').then( m => m.CheckPageModule)
  },
  {
    path: 'checkin/:item',
    loadChildren: () => import('./checkin/checkin.module').then( m => m.CheckinPageModule)
  },
  {
    path: 'bloque',
    loadChildren: () => import('./bloque/bloque.module').then( m => m.BloquePageModule)
  },
  {
    path: 'listusers',
    loadChildren: () => import('./listusers/listusers.module').then( m => m.ListusersPageModule)
  },





];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
