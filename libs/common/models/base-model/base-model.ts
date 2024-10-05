import { Model } from 'objection';

export abstract class BaseModel extends Model {
  static get tableName() {
    return this.name.charAt(0).toLowerCase() + this.name.slice(1);
  }

  static get idColumn() {
    return 'id';
  }

  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  $beforeInsert() {
    if (typeof this.isActive === 'undefined' || typeof this.isActive === null)
      this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
