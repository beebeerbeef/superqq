const Sequelize = require('sequelize')
const sequelize = new Sequelize(
	'vue_chat', //数据库名
	'root', //用户名
	'a88875717', //用户密码
	{
		'dialect': 'mysql', //数据库使用mysql
		'host': 'localhost', //数据库服务器ip
		'port': 3306,
		'define': {
			// 字段以下划线（_）来分割（默认是驼峰命名风格）
      'underscored': true
		},
    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,//禁止mysql的转换
      typeCast(field, next) {//覆盖了sequelize的转换
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      }
    },
    timezone: '+08:00', //for writing to database
	}
)
const account = sequelize.define(
	// tablename
  'account',
  {
    'user_name': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'pwd': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'email': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'avatar': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'user_info': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'user_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false,
      'unique': true
    },
    'socketid': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'online': {
      'type': Sequelize.BOOLEAN,
      'defaultValue': false
    },
    'token': {
      'type': Sequelize.TEXT,
      'allowNull': true
    }
  }
)
// account.sync({ force: true })//强制同步数据表结构
// account.sync({ alter: true })//这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
account.sync()

const tlchat = sequelize.define(
  // 聊天记录列表
  'tlchat',
  {
    'from': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'to': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'content': {
      'type': Sequelize.TEXT,
      'defaultValue': ''
    }
  }
)

// tlchat.sync()
tlchat.sync()
const chat = sequelize.define(
  // 聊天记录列表
  'chat',
  {
    'chatid': {
      'type': Sequelize.TEXT,
      'allowNull': true
    },
    'from': {
      'type': Sequelize.STRING,
      'allowNull': false,
      // 'references': {
      //   'model': 'accounts',
      //   'key': 'user_id'
      // }
    },
    'to': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'received': {
      'type': Sequelize.BOOLEAN,
      'defaultValue': false
    },
    'content': {
      'type': Sequelize.TEXT,
      'defaultValue': ''
    }
  }
)
// chat.sync({ force: true })
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
});



module.exports = sequelize