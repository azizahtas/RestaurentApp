import { Component } from '@angular/core';
import {MenuItem, MenuItemSearchModel} from "./item.modal";
import {Message} from "../Shared/Message.modal";
import {ItemService} from "./item.service";
import {CategoryService} from "../Category/category.service";
import {Category} from "../Category/category.modal";
import {Auth} from "../Auth/auth.service";
import * as _ from "lodash"

@Component({
    templateUrl: './item.component.html',
    styles :[`
      .image {
    position: relative;
    width: 100%; /* for IE 6 */
}

.cap {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
}      
.err{
padding: 5px;
}
`]
})
export class ItemComponent {
    constructor(private _itm:ItemService,private _cat:CategoryService,public _auth:Auth){}

     menuItem : MenuItem;
     menuItemEdit : MenuItem;
     menuItemDelete : MenuItem;
     menuItemView : MenuItem;

    menuItems : MenuItem[];
    searchedMenuItems : MenuItem[];
    categories : Category[];
    messages : Message[];
    searchModal:MenuItemSearchModel;

    checking_Name : boolean = false;
    checking_Name_Error : boolean = false;
    view_Details:boolean = false;

    ngOnInit() {
        this.menuItem = new MenuItem();
        this.menuItemEdit = new MenuItem();
        this.menuItemDelete = new MenuItem();
        this.menuItemView = new MenuItem();
        this.searchModal = new MenuItemSearchModel();
        this.getAllCategories();
        this.getAllMenuItems();
        /* Short
        * this.myForm = this._fb.group({
         name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
         address: this._fb.group({
         street: ['', <any>Validators.required],
         postcode: ['']
         })
         });

         Long
         this.myForm = new FormGroup({
         name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
         address: new FormGroup({
         street: new FormControl('', <any>Validators.required),
         postcode: new FormControl('8000')
         })
         });
        *
        * */

    }

    ViewDetails(item:MenuItem){
        this.menuItemView = item;
        this.view_Details = true;
    }
    BackToSearch(){
        this.view_Details = false;
    }

    editMenuItem(menuItem:MenuItem){
        this.menuItemEdit._id = menuItem._id;
        this.menuItemEdit.Category = menuItem.Category;
        this.menuItemEdit.Desc = menuItem.Desc;
        this.menuItemEdit.FPrice = menuItem.FPrice;
        this.menuItemEdit.HPrice = menuItem.HPrice;
        this.menuItemEdit.Img_Url = menuItem.Img_Url;
        this.menuItemEdit.Name = menuItem.Name;
        this.menuItemEdit.Type = menuItem.Type;
    }
    deleteMenuItem(menuItem:MenuItem){
        this.menuItemDelete._id = menuItem._id;
        this.menuItemDelete.Name = menuItem.Name;
    }
    Delete(id:string){
        this.messages = [];
        this._itm.deleteItem(id)
            .subscribe(
                data => {
                    if(data.success){
                        this.messages.push({type:'success',title:this.menuItemDelete.Name+' Deleted Successfully!',message:''});
                        this.getAllMenuItems();
                    }
                    else if(!data.success){
                        this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                    }
                },
                err =>{},
                ()=>{}
            )
    }
    public Save(edit){
        this.messages = [];
        if(!edit){
            var newItm = new MenuItem();
            newItm.Name = this.menuItem.Name;
            newItm.HPrice = this.menuItem.HPrice;
            newItm.FPrice = this.menuItem.FPrice;
            newItm.Desc = this.menuItem.Desc;
            newItm.Img_Url = this.menuItem.Img_Url;
            newItm.Category = this.menuItem.Category;
            newItm.Type = this.menuItem.Type;
            this._itm.addItem(newItm)
                .subscribe(
                    data => {
                        if(data.success){
                            this.messages.push({type:'success',title:this.menuItem.Name+' Created Successfully!',message:''});
                            this.getAllMenuItems();
                            this.menuItem.Name = "";
                            this.menuItem.Img_Url = "";
                            this.menuItem.Desc = "";
                        }
                        else if(!data.success){
                            this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                        }
                    },
                    err =>{
                        this.messages.push({type:'danger',title:'Error Occurred!',message:'Please Login Again!'});
                        this._auth.Logout();
                    },
                    ()=>{this.checking_Name = false; this.checking_Name_Error = false;}
                )

        }
        else{
            this._itm.editItem(this.menuItemEdit)
                .subscribe(
                    data => {
                        if(data.success){
                            this.messages.push({type:'success',title:this.menuItemEdit.Name+' Saved Successfully!',message:''});
                        }
                        else if(!data.success){
                            this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                        }
                        console.log(data);
                    },
                    err =>{},
                    ()=>{this.checking_Name = false; this.checking_Name_Error = false;}
                )
        }
    }
    public CheckName(name:string){
         this.checking_Name = false;
        this.checking_Name_Error = false;
        this._itm.checkName(name)
            .subscribe(
                data => {
                    this.checking_Name = true;
                    if(data.success && data.data ==null){
                        this.checking_Name = false;
                        this.checking_Name_Error = false;
                    }
                    else if(data.success && data.data !=""){
                        this.checking_Name_Error = true;
                        this.checking_Name = false;
                    }
                }
            )
    }

    CompositSearch(){
        this.view_Details = false;
        let exp = this.generateExpression();
        if(exp!="") {
            let SrchItms:MenuItem[] = [];
            _(this.menuItems).forEach(function (val:MenuItem) {
                if (eval(exp)) {
                    SrchItms.push(val);
                }
            });
            this.searchedMenuItems = [];
            this.searchedMenuItems = SrchItms;
            console.log("exp is "+exp);
            //this.setPages(this.searchdItems);
        }
        else if(exp==""){
            this.getAllMenuItems();
        }
    }

    generateExpression():string{
        let exp = "";
        if(this.searchModal.Name!=""){
            let patt = new RegExp(this.searchModal.Name,'i');
            exp += patt+".test(val.Name)&&";
        }
        if(this.searchModal.Category!=""){
            exp += "'"+this.searchModal.Category+"'==val.Category&&"
        }
        if(this.searchModal.Type!=""){
            exp += "'"+this.searchModal.Type+"'==val.Type&&"
        }
        if(this.searchModal.Price!=0){
            exp += "'val.FPrice<="+this.searchModal.Price+"'&&"
        }

        exp = exp.substr(0,exp.length-2);
        return exp;
    }

    getAllMenuItems(){
        this._itm.getAllItems()
            .subscribe(
                data=> {
                    if(data.success) {
                        this.menuItems = data.data;
                        this.searchedMenuItems = this.menuItems;
                    }
                },
                err=>{},
                ()=>{}
            )
    }
    getAllCategories(){
        this.menuItem = new MenuItem();
        this._cat.getAllCategories()
            .subscribe(
                data =>{
                    if(data.success) {
                        this.categories = data.data;
                    }
                },
                error =>{

                },
                ()=>{}
            );
    }

}