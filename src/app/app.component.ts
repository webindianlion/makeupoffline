import { Component, ElementRef, ViewChild } from '@angular/core';
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

  singleProduct:any;
  singleProductOn:boolean = false;

  ifBrandSorted:boolean = false;
  ifCategorySorted:boolean = false;
  ifTypeSorted:boolean = false;

  nextDisable:boolean=false;
  prevDisable:boolean=false;
  firstDisable:boolean=false;
  lastDisable:boolean=false;

  singleViewProductsCount:any = 25;

  allsortedData:any[] =[];

  @ViewChild('brand') brand:ElementRef;
  @ViewChild('category') category:ElementRef;
  @ViewChild('type') type:ElementRef;
  
  
/***************************************************************************************/
  constructor( private productService: ProductsService) {}
/***************************************************************************************/
  ngOnInit() {
    this.allProducts = this.productService.products;
    this.getAllBrandsName();
    this.getAllCategoriesName();
    this.getAllTypeName();
    this.allProducts20 = this.allProducts.slice(0,this.singleViewProductsCount);
    // singleViewProductsCountChange()
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


    if(name == 'brand'){

      if(this.allsortedData.length == 0 || (this.ifBrandSorted && !this.ifCategorySorted && !this.ifTypeSorted)) {
        this.allsortedData = this.allProducts.filter( function (item:any) {
          return item.brand == value;
        });
      } 

      else if ( (this.ifCategorySorted && !this.ifTypeSorted) || (!this.ifCategorySorted && this.ifTypeSorted) || (this.ifCategorySorted && this.ifTypeSorted)  ) {
        this.allsortedData = this.allsortedData.filter( function (item:any) {
          return item.brand == value;
        });
      }
      
      this.ifBrandSorted = true;
    }
    if(name == 'category'){

      if(this.allsortedData.length == 0 && (!this.ifBrandSorted && !this.ifCategorySorted && !this.ifTypeSorted)) {
        this.allsortedData = this.allProducts.filter( function (item:any) {
          return item.category == value;
        });
      }
      else {
        this.allsortedData = this.allsortedData.filter( function (item:any) {
          return item.category == value;
        });
      }

      this.ifCategorySorted =true;
    }

    if(name == 'type'){

      if(this.allsortedData.length == 0 && (!this.ifBrandSorted && !this.ifCategorySorted && !this.ifTypeSorted)) {
        this.allsortedData = this.allProducts.filter( function (item:any) {
          return item.product_type == value;
        });
      }
      else {
        this.allsortedData = this.allsortedData.filter( function (item:any) {
          return item.product_type == value;
        });
      }
      this.ifTypeSorted =true;
    }
    this.allProducts20 = this.allsortedData.slice(0,this.singleViewProductsCount);
  }

  /***************************************************************************************/
  resetAllProductsList() {
    this.allProducts20 = this.productService.products.slice(0,this.singleViewProductsCount);
    this.ifBrandSorted = false; this.ifCategorySorted = false; this.ifTypeSorted = false;
    this.brand.nativeElement.value = "";
    this.category.nativeElement.value = "";
    this.type.nativeElement.value = "";
  }
  getSingleProduct(i:any) {
     this.singleProduct = this.allProducts20[i];
    this.singleProductOn = true;

    if(this.allProducts20.indexOf(this.singleProduct) == 0){
      this.firstDisable = true;
    }
    if(this.allProducts20.indexOf(this.singleProduct) == this.allProducts20.length - 1){
      this.lastDisable = true;
    }
  };

  backToList(){
    this.singleProductOn = false;

    this.nextDisable=false;
    this.prevDisable=false;
    this.firstDisable=false;
    this.lastDisable=false;
  }
  
   prevProduct(){
    let currentProduct = this.allProducts20.indexOf(this.singleProduct);
    this.singleProduct = this.allProducts20[currentProduct - 1];
    if(this.allProducts20.indexOf(this.singleProduct) == 0){
      this.prevDisable = true;
      this.firstDisable = true;
    }
    this.lastDisable = false;
    this.nextDisable = false;
   }
   FirstProduct(){
    this.singleProduct = this.allProducts20[0];
    if(this.allProducts20.indexOf(this.singleProduct) == 0){
      this.firstDisable = true;
      this.prevDisable = true;
    }
   }
   nextProduct(){
    let currentProduct = this.allProducts20.indexOf(this.singleProduct);
    this.singleProduct = this.allProducts20[currentProduct + 1];
    if((this.allProducts20.indexOf(this.singleProduct) + 1) == this.allProducts20.length){
      this.nextDisable = true;
      this.lastDisable = true;
    }
    this.firstDisable = false;
    this.prevDisable = false;
   }
   LastProduct(){
    this.singleProduct = this.allProducts20[this.allProducts20.length - 1];
    if((this.allProducts20.indexOf(this.singleProduct) + 1) == this.allProducts20.length){
      this.lastDisable = true;
      this.firstDisable = true;
    }
   }

   singleViewProductsCountChange(event:any){
     let value = event.target.value;
     this.singleViewProductsCount = value;
   }
   
}

 