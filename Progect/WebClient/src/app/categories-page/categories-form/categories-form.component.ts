import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConstantsUrl} from "../../../Helper/ConstantsUrl";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseCrudModule} from "../../../modules/BaseCrudModule";
import {ICategory} from "../../../models/ICategory";
import {CategoryClient} from "../../../services/API/Clients/CategoryClient";
import {IAPIResponse} from "../../../models/IAPIResponse";
import {HelperConst} from "../../../Helper/HelperConst";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent extends BaseCrudModule<ICategory> implements OnInit {
  protected readonly _rootApiClient: CategoryClient;

  @ViewChild('input') inputRef: ElementRef;
  private readonly CategoriesUrl = "/" + ConstantsUrl.CATEGORIES;
  private isNewCategory: boolean = true;
  form: FormGroup;
  imagePreview = "";
  image: File;
  categoryToSave: ICategory;

  constructor(
    private categoryClient: CategoryClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super();
    this._rootApiClient = categoryClient;
    this.setCategoryToSave();
    this.form = fb.group({
      name: fb.control('', [Validators.required]),
    });
  }

  getEmptyCategory(): ICategory{
    return {
      id: HelperConst.EMPTY_ID,
      name: "",
      userId: "",
      imageSrc: "",
    }
  }
  setCategoryToSave(category?: ICategory){
    if(category){
      this.categoryToSave = {...category};
    }
    this.categoryToSave = this.getEmptyCategory()
  }

  generateClickOpenFile(){
    this.inputRef.nativeElement.click();
  }

  onFileSelect(event: any){
    const file = event.target.files[0];
    this.image = file;

    const reader: any = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  getNameErrorMessage() {
    if (this.form.get('name').hasError('required')) {
      return 'Ви повинні ввести значення';
    }
  }

  async onSubmit() {
    const {categoryToSave,form,image} = this;

    console.dir("save!!!");
    console.dir(this.form.value);
    const category = {...categoryToSave, ...form.value};

    this._rootApiClient.create(category, image)
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const catId = params['id'];
      if (catId != ConstantsUrl.NEW_CATEGORIES) {
        this.isNewCategory = false;
        this.initData(catId)
      }
    })
  }

  async initData(catId: string) {
    try {
      this.form.disable();
      const response: IAPIResponse<ICategory> = await this._rootApiClient.getCategoryById(catId);
      const {payload:{name, imageSrc}} = response;
      if (name) {
        this.form.patchValue({name});
        this.imagePreview = imageSrc;

        const category: ICategory = response.payload;
        this.setCategoryToSave(category);
      }
    }
    catch (e) {
      console.dir(e)
    }
    finally {
      this.form.enable();
    }
  }

}
