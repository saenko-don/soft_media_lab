import {Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize";

interface ListTypeAcademicPerformanceAttributes {
  id?: number;
  title: string;
}
interface ListTypeAcademicPerformanceAttributes extends Optional<ListTypeAcademicPerformanceAttributes, 'id'> {}

interface ListTypeAcademicPerformanceAttributesInstance
  extends Model<ListTypeAcademicPerformanceAttributes, ListTypeAcademicPerformanceAttributes>,
    ListTypeAcademicPerformanceAttributes {}

export default sequelize.define<ListTypeAcademicPerformanceAttributesInstance>('list_type_academic_performance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'edited_at',
  deletedAt: 'deleted_at',
  freezeTableName: true,
  paranoid: true,
});