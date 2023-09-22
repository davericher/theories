const { Model, DataTypes } = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

class User extends Model {
  static associate(models) {
    // Relationships
    this.hasMany(models.Theory, { foreignKey: 'proposedBy' });
    this.hasMany(models.Evidence, { foreignKey: 'presentedBy' });
    this.hasMany(models.Notification, { foreignKey: 'userId' });
    this.hasMany(models.Comment, { foreignKey: 'userId' });
    this.belongsToMany(models.Role, {
      through: 'userRoles',
      foreignKey: 'userId',
    });
    this.belongsToMany(models.Group, {
      through: 'userGroups',
      foreignKey: 'userId',
    });
  }

  // Basic CRUD
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(user) {
    return this.create(user);
  }

  static async update(id, user) {
    const foundUser = await this.findByPk(id);
    if (foundUser) {
      return foundUser.update(user);
    }
    return null;
  }

  static async delete(id) {
    const foundUser = await this.findByPk(id);
    if (foundUser) {
      return foundUser.destroy();
    }
    return null;
  }

  // Relationships
  static async findTheories(userId) {
    return this.sequelize.models.Theory.findAll({
      where: { proposedBy: userId },
    });
  }

  static async findEvidences(userId) {
    return this.sequelize.models.Evidence.findAll({
      where: { presentedBy: userId },
    });
  }

  // Convenience functions
  static async findByUsername(username) {
    return this.findOne({ where: { username } });
  }

  static async login(username, passwordHash) {
    return this.findOne({ where: { username, passwordHash } });
  }

  static async updateLastLogin(id) {
    const foundUser = await this.findByPk(id);
    if (foundUser) {
      return foundUser.update({ lastLogin: new Date() });
    }
    return null;
  }

  // Fetch all notifications for a user
  static async findNotifications(userId) {
    return this.sequelize.models.Notification.findAll({ where: { userId } });
  }

  // Fetch all comments made by a user
  static async findComments(userId) {
    return this.sequelize.models.Comment.findAll({ where: { userId } });
  }

  static async getRolesByUserId(userId) {
    const user = await this.findByPk(userId, {
      include: [{ model: this.sequelize.models.Role }],
    });
    return user ? user.Roles : [];
  }

  static async getGroupsByUserId(userId) {
    const user = await this.findByPk(userId, {
      include: [{ model: this.sequelize.models.Group }],
    });
    return user ? user.Groups : [];
  }

  // ... [Other methods related to roles and groups]
}

module.exports = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      timestamps: true,
      paranoid: true, // Enables soft deletes
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  // Use Bcrypt to hash passwords
  useBcrypt(User, {
    field: 'password', // secret field to hash, default: 'password'
    rounds: 12, // used to generate bcrypt salt, default: 12
    compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
  });

  return User;
};
