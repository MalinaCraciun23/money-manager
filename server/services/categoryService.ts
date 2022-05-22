import fs from 'fs';
import exitHook from 'async-exit-hook';
import { randomUUID } from 'crypto';

import { ICategory, CategoryType } from '../types/category';

class CategoryService {
  categories: ICategory[];

  constructor() {
    this.categories = [];
  }

  readData() {
    const data = fs.readFileSync('./data/categories.json');
    this.categories = JSON.parse(data.toString());
  }

  writeData() {
    const data = JSON.stringify(this.categories, null, 2);
    fs.writeFileSync('./data/categories.json', data);
  }

  init() {
    this.readData();
    exitHook(this.writeData.bind(this));
  }

  addCategory(name: string, type: CategoryType): ICategory {
    if (this.categories.find((category) => category.name === name)) {
      throw {
        status: 409,
        message: `Category with name ${name} already exists`,
      };
    }
    const category: ICategory = {
      id: randomUUID(),
      name,
      type,
    };

    this.categories.push(category);
    return category;
  }

  getCategories(): ICategory[] {
    return this.categories;
  }

  deleteCategory(id: string): ICategory {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );
    if (categoryIndex < 0) {
      throw { status: 404, message: 'Category not found' };
    }
    const category = this.categories[categoryIndex];
    this.categories.splice(categoryIndex, 1);
    return category;
  }

  updateCategory(id: string, name: string, type: CategoryType): ICategory {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );
    if (categoryIndex < 0) {
      throw { status: 404, message: 'Category not found' };
    }

    if (this.categories.find((category) => category.name === name)) {
      throw {
        status: 409,
        message: `Category with name ${name} already exists`,
      };
    }

    const newCategory = { id, name, type };
    this.categories[categoryIndex] = newCategory;
    return newCategory;
  }

  requireCategory(name: string) {
    if (!this.categories.find((category) => category.name === name)) {
      throw { status: 404, message: 'Category not found' };
    }
  }
}

export default new CategoryService();
