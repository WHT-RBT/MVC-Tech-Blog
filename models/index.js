const Sequelize = require('sequelize');
const sequelize = new Sequelize(/*  MySQL details here */);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user')(sequelize, Sequelize);
db.BlogPost = require('./blogPost')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.BlogPost, { foreignKey: 'userId' });
db.BlogPost.belongsTo(db.User, { foreignKey: 'userId' });
db.BlogPost.hasMany(db.Comment, { foreignKey: 'blogPostId' });
db.Comment.belongsTo(db.BlogPost, { foreignKey: 'blogPostId' });
db.User.hasMany(db.Comment, { foreignKey: 'userId' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
