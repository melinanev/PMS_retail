import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Attributes interface for Product
interface ProductAttributes {
  id: number;
  sku: string; // SKU field
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string; // Category field
  image?: string | null; // Image field, optional (null or string)
  createdAt?: Date; // Timestamps optional
  updatedAt?: Date;
}

// Creation attributes, allowing the 'id' to be optional for creation
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

// Define the Product model class
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public sku!: string; // SKU field
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public category!: string; // Category field
  public image?: string | null; // Image field, optional (null or string)

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to initialize the Product model
export function ProductFactory(sequelize: Sequelize): typeof Product {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sku: {
        type: DataTypes.STRING(50), // SKU size
        allowNull: false,
        unique: true, // SKU should be unique
      },
      name: {
        type: DataTypes.STRING(255), // Name size
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, // Description can be TEXT
        allowNull: true, // Optional field
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // Price with two decimal places
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default quantity
      },
      category: {
        type: DataTypes.STRING(50), // Category length
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT, // Store image data (e.g., image URL or base64 data)
        allowNull: true, // Optional field (allows null or undefined values)
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default createdAt timestamp
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default updatedAt timestamp
      },
    },
    {
      tableName: 'products', // Table name in the database
      sequelize,
      timestamps: true, // Enable automatic handling of createdAt and updatedAt
    }
  );

  return Product;
}
