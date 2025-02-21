import { DataTypes, Sequelize, Model, Optional } from 'sequelize';


interface ProductAttributes {
  id: number;
  sku: string; 
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string; 
  image?: string | null; 
  createdAt?: Date; 
  updatedAt?: Date;
}


interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}


export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public sku!: string; 
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public category!: string; 
  public image?: string | null; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export function ProductFactory(sequelize: Sequelize): typeof Product {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sku: {
        type: DataTypes.STRING(50), 
        allowNull: false,
        unique: true, 
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, 
        allowNull: true, 
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
      category: {
        type: DataTypes.STRING(50), 
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT, 
        allowNull: true, 
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
    },
    {
      tableName: 'products',
      sequelize,
      timestamps: true, 
    }
  );

  return Product;
}
