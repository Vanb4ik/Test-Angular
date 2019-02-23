import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConstantsUrl } from "../../../Helper/ConstantsUrl";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseCrudModule } from "../../../modules/BaseCrudModule";
import { ICategory } from "../../../models/ICategory";
import { CategoryClient } from "../../../services/API/Clients/CategoryClient";
import { IAPIResponse } from "../../../models/IAPIResponse";
import { HelperConst } from "../../../Helper/HelperConst";
import { Messager } from 'src/Helper/Messager';
import { debug } from 'util';

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
    private router: Router,
    private fb: FormBuilder,
  ) {
    super();
    this._rootApiClient = categoryClient;
    this.setCategoryToSave();
    this.form = fb.group({
      name: fb.control('', [Validators.required]),
    });
  }

  getEmptyCategory(): ICategory {
    return {
      id: HelperConst.EMPTY_ID,
      userId: HelperConst.EMPTY_ID,
      name: "",
      imageSrc: "",
    }
  }

  setCategoryToSave(category?: ICategory) {
    if (category) {
      this.categoryToSave = { ...category };
    }
    else {
      this.categoryToSave = this.getEmptyCategory()
    }
  }

  generateClickOpenFile() {
    this.inputRef.nativeElement.click();
  }

  onFileSelect(event: any) {
    //console.dir(event)
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
    const { categoryToSave, form, image } = this;
    
    const category = { ...categoryToSave, ...form.value };

    this.createCategory(category, image)
      .then((response: IAPIResponse<ICategory>) => {
        if (response.error) {
          return;
        }
        const savedCategory = response.payload;
        Messager.success(`done`);
        this.router.navigate([this.CategoriesUrl + `/${savedCategory.id}`])
      })
  }

  protected async createCategory(category: ICategory, image?: File): Promise<IAPIResponse> {
    return this.watchAsyncProcess(
      this._rootApiClient.create(category, image)
    )
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

  deleteCategory() {
    this.delete(this.categoryToSave)
     
      .then(() => {
        this.router.navigate([this.CategoriesUrl])
      })
  }


  async initData(catId: string) {
    try {
      this.form.disable();
      const response: IAPIResponse<ICategory> = await this.getCategory(catId);
      const { payload: { name, imageSrc } } = response;
      if (name) {
        this.form.patchValue({ name });
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

  protected getCategory(catId: string) {
    return this.watchAsyncProcess(
      this._rootApiClient.getCategoryById(catId)
    )
  }
}
