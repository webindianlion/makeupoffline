import { Component } from '@angular/core';
import {ProductsService} from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  // origianlAllProducts:any;
  allProducts:any;
  allProducts20:any;

  allBrandsName:any[]= [];
  allCategoriesName:any[]= [];
  allTypeName:any[]= [];
  ifDataSorted:boolean = false;

  ifBrandSorted:boolean = false;
  ifCategorySorted:boolean = false;
  ifTypeSorted:boolean = false;

  BrandSorted:any[] = [];
  CategorySorted:any[] = [];
  TypeSorted:any[] = [];
/***************************************************************************************/
  constructor( private productService: ProductsService) {}
/***************************************************************************************/
  ngOnInit() {
    this.allProducts = this.productService.products;
    this.getAllBrandsName();
    this.getAllCategoriesName();
    this.getAllTypeName();
    this.allProducts20 = this.allProducts.slice(0,20);
    // console.log(this.allProducts10);
   }
/***************************************************************************************/
   getAllBrandsName(){
     let abn= this.allBrandsName;
      this.allProducts.forEach(
        function (item:any) {
          abn.push(item.brand);
         }
      ); 
      this.allBrandsName =  [...new Set(this.allBrandsName)];
      this.allBrandsName = this.allBrandsName.filter( function(item:any) {
        return item !== null;
      });
      this.allBrandsName = this.allBrandsName.sort();
      // console.log(this.allBrandsName);
   }
   /***************************************************************************************/
   getAllCategoriesName(){
    let acn= this.allCategoriesName;
     this.allProducts.forEach(
       function (item:any) {
         acn.push(item.category);
        }
     ); 
     this.allCategoriesName =  [...new Set(this.allCategoriesName)];
     this.allCategoriesName = this.allCategoriesName.filter(String);
     this.allCategoriesName = this.allCategoriesName.filter( function(item:any) {
       return item !== null;
     });
     this.allCategoriesName = this.allCategoriesName.sort();
  }
  /***************************************************************************************/
  getAllTypeName(){
    let acn= this.allTypeName;
     this.allProducts.forEach(
       function (item:any) {
         acn.push(item.product_type);
        }
     ); 
     this.allTypeName =  [...new Set(this.allTypeName)];
     this.allTypeName = this.allTypeName.sort();
  }
  /***************************************************************************************/
  getFilteredList(event:any){
    let value = event.target.value;
    let name = event.target.name;

    // BrandSorted:any[] = [];
    // CategorySorted:any[] = [];
    // TypeSorted:any[] = [];

    if(name == 'brand'){

      if(this.ifBrandSorted && !this.ifCategorySorted && !this.ifTypeSorted ){
        this.allProducts =  this.productService.products;
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.brand ==value;
        });
      }
      let sortedProducts = this.allProducts; 
      this.allProducts = sortedProducts.filter( function (item:any) {
        return item.brand ==value;
      });
      this.ifBrandSorted = true;
    }
    if(name == 'category'){
      this.allProducts = this.allProducts.filter( function (item:any) {
        return item.category ==value;
      });
      this.ifCategorySorted = true;
    }
    if(name == 'type'){
      this.allProducts = this.allProducts.filter( function (item:any) {
        return item.product_type ==value;
      });
      this.ifTypeSorted = true;
      this.TypeSorted = this.allProducts;
    }
    this.allProducts20 = this.allProducts 
    this.ifDataSorted = true;
    console.log(this.allProducts20);
  }
  /***************************************************************************************/
  resetAllProductsList() {
    this.allProducts = this.productService.products;
    this.allProducts20 = this.allProducts;
    this.ifBrandSorted = false; this.ifCategorySorted = false; this.ifTypeSorted = false;
  }
   
}


