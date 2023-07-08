import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'dafault';
  sellerName: string = '';
  searchResult: undefined | product[];
  name = 'Angular';
  public isCollapsed = true;
  userName: string='';
  cartItems=0;
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {

      let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = "seller";
          }
          else if (localStorage.getItem('user')){
            let userStore =localStorage.getItem('user')
              let userData = userStore && JSON.parse(userStore);
              this.userName= userData.name;
              this.menuType='user';
          }

        else {
        this.menuType = 'default'
        }

      }

    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length

    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
 }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/seller-auth'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;

      this.product.searchProduct(element.value).subscribe((result) => {

        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;

      })

    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }
  redirectToDetail(id:number){
    this.route.navigate(['/details/'+id])
  }

}
