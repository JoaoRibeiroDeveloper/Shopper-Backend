import { IPack } from '@modules/packs/domain/entities/IPack';
import { Pack } from '@modules/packs/infra/typeorm/entities/Pack';
import { IProduct } from '@modules/products/domain/entities/IProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product implements IProduct {
  @PrimaryColumn()
  code: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'cost_price', type: 'decimal', precision: 9, scale: 2 })
  costPrice: number;

  @Column({ name: 'sales_price', type: 'decimal', precision: 9, scale: 2 })
  salesPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Pack, pack => pack.packId)
  packs: IPack[];

  @OneToMany(() => Pack, pack => pack.productId)
  productsPacks: IPack[];
}
