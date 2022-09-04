import { sequelize } from "../../src/database/models";

const truncate = () => {
  return Promise.all(
    Object.keys(sequelize.models).map((key) => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
};

export default truncate;
