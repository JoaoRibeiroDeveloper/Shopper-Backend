import { IPack } from '@modules/packs/domain/entities/IPack';
import { IProduct } from '@modules/products/domain/entities/IProduct';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('packs')
export class Pack implements IPack {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Product, product => product.code)
  @JoinColumn({ name: 'pack_id' })
  packId: IProduct;

  @ManyToOne(() => Product, product => product.code)
  @JoinColumn({ name: 'product_id' })
  productId: IProduct;

  @Column()
  qty: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
