const { Model, DataTypes } = require('sequelize');

class Attachment extends Model {
  static associate(models) {
    // Assuming you have a User model and a Theory model
    this.belongsTo(models.User, { foreignKey: 'uploadedBy', as: 'uploader' });
    // The association with Theory or any other table that might use attachments would be handled differently,
    // possibly with a polymorphic association if you're using different types of associated entities.
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(attachment) {
    return this.create(attachment);
  }

  static async findByTheoryId(theoryId) {
    return this.findAll({ where: { associatedWithId: theoryId } }); // This assumes that only theories use attachments.
  }

  static async findById(attachmentId) {
    return this.findByPk(attachmentId);
  }

  static async update(attachmentId, newFileLink) {
    const foundAttachment = await this.findByPk(attachmentId);
    if (foundAttachment) {
      return foundAttachment.update({ fileLink: newFileLink });
    }
    return null;
  }

  static async delete(attachmentId) {
    const foundAttachment = await this.findByPk(attachmentId);
    if (foundAttachment) {
      return foundAttachment.destroy();
    }
    return null;
  }
}

module.exports = (sequelize) => {
  Attachment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: DataTypes.STRING,
      fileURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      uploadedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      associatedWithId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Attachment',
      tableName: 'attachment',
      underscored: true,
      timestamps: false,
    },
  );

  return Attachment;
};
