import {Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize";

interface UserAttributes {
  id?: number;
  first_name: string;
  last_name: string;
  second_name: string;
  date_of_birth: string;
  academic_performance_id: number,
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export default sequelize.define<UserInstance>('students', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  second_name: {
    type: DataTypes.STRING,
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  academic_performance_id: {
    type: DataTypes.INTEGER,
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'edited_at',
  deletedAt: 'deleted_at',
  paranoid: true,
});