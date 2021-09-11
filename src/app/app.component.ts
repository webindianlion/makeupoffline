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
  ifDataSorted:boolean = false;

  ifBrandSorted:boolean = false;
  ifCategorySorted:boolean = false;
  ifTypeSorted:boolean = false;
  
  anyIfSorted:any = [this.ifBrandSorted, this.ifCategorySorted, this.ifTypeSorted];

  BrandSortedData:any[] = [];
  categorySortedData:any[] = [];
  typeSortedData:any[] = [];

  allsortedData:any[] =[];

  @ViewChild('brand', {static: true}) brand:ElementRef;
  @ViewChild('category', {static: true}) category:ElementRef;
  @ViewChild('type', {static: true}) type:ElementRef;
  
  
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

    // BrandSortedData:any[] = [];
    // categorySortedData:any[] = [];
    // typeSortedData:any[] = [];

    if(name == 'brand'){

      if(!this.ifCategorySorted && !this.ifTypeSorted ){
        this.allProducts =  this.productService.products;
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.brand ==value;
        });
        this.BrandSortedData = this.allProducts;
        this.ifBrandSorted = true;
      }
      else if(this.ifCategorySorted && !this.ifTypeSorted ) {
        this.allProducts = this.categorySortedData;
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.brand ==value;
        });
        this.BrandSortedData = this.allProducts;
        this.ifBrandSorted = true;
      }
      else if(!this.ifCategorySorted && this.ifTypeSorted ) {
        this.allProducts = this.typeSortedData;
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.brand ==value;
        });
        this.BrandSortedData = this.allProducts;
        this.ifBrandSorted = true;
      }
      else if(this.ifCategorySorted && this.ifTypeSorted ) {
        if(this.categorySortedData.length < this.typeSortedData.length) {
          this.allProducts =   this.categorySortedData;
        }
        if(this.categorySortedData.length > this.typeSortedData.length) {
          this.allProducts =   this.typeSortedData;
        }
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.brand ==value;
        });
        this.BrandSortedData = this.allProducts;
        this.ifBrandSorted = true;
      }
      
      // this.ifBrandSorted = true;
    }
    if(name == 'category'){
      if(!this.ifBrandSorted && !this.ifTypeSorted ){
        this.allProducts =  this.productService.products;
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.category ==value;
        });
        this.categorySortedData = this.allProducts;
        this.ifCategorySorted =true;
      }
    }

    if(name == 'type'){

      if(!this.ifBrandSorted && !this.ifCategorySorted ){
        this.allProducts =  this.productService.products;
        this.allProducts = this.allProducts.filter( function (item:any) {
          return item.product_type ==value;
        });
        this.typeSortedData = this.allProducts;
        this.ifTypeSorted =true;
      }
    }

    this.allProducts20 = this.allProducts 
    this.ifDataSorted = true;
    console.log(this.allProducts20);
  }

  // finalData(array1:any, array2:any) {
  //   // const arrayAllSortedData = [this.BrandSortedData.length, this.categorySortedData.length, this.typeSortedData.length];
  //   if(array1.length < )
  //   return arrayAllSortedData.indexOf( Math.min(...arrayAllSortedData) );
  // }

  // allsorted(){
  //   this.anyIfSorted.filter((item:any) => {return item==true});
  // }
  /***************************************************************************************/
  resetAllProductsList() {
    this.allProducts = this.productService.products;
    this.allProducts20 = this.allProducts;
    this.ifBrandSorted = false; this.ifCategorySorted = false; this.ifTypeSorted = false;
  }

  getFilteredList1(){
    

  }
   
}


