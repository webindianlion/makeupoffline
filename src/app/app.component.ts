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

      if(this.allsortedData.length == 0) {
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

      if(this.allsortedData.length == 0) {
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

    this.allProducts20 = this.allsortedData.slice(0,20);

  }

  /***************************************************************************************/
  resetAllProductsList() {
    this.allProducts20 = this.productService.products.slice(0,20);
    this.ifBrandSorted = false; this.ifCategorySorted = false; this.ifTypeSorted = false;
    this.brand.nativeElement.value = "";
    this.category.nativeElement.value = "";
    this.type.nativeElement.value = "";
  }
  getSingleProduct() {};
   
}

 