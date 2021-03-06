module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'rules': {
    /**
		 * off 或 0：表示不验证规则。
		 * warn 或 1：表示验证规则，当不满足时，给警告
		 * error 或 2 ：表示验证规则，不满足时报错
		 */

    ///
    // 代码风格及规范限制.相关 //
    ///
    'quotes': [2, 'single'],   // 单引号
    'no-console': 0,           // 不禁用console
    'no-debugger': 2,          // 禁用debugger
    'semi': 0,                 // 不强制使用分号
    'no-control-regex': 2,     // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'linebreak-style': [0, 'error', 'windows'],            // 强制使用一致的换行风格
    'indent': ['error', 2, { 'SwitchCase': 1 }],           // 空格4个
    'array-bracket-spacing': [2, 'never'],                 // 指定数组的元素之间要以空格隔开(,后面)
    'brace-style': [2, '1tbs', {'allowSingleLine': true}], // if while function 后面的{必须与if在同一行，java风格。
    'no-irregular-whitespace': 0,      // 不规则的空白不允许
    'no-trailing-spaces': 1,           // 一行结束后面有空格就发出警告
    'eol-last': 0,                     // 文件以单一的换行符结束
    'no-unused-vars': [1, {'vars': 'all', 'args': 'after-used'}], // 不能有声明后未被使用的变量或参数
    'no-underscore-dangle': 0,     // 标识符不能以_开头或结尾
    'no-alert': 2,                 // 禁止使用alert confirm prompt
    'no-lone-blocks': 0,           // 禁止不必要的嵌套块
    'no-class-assign': 2,          // 禁止给类赋值
    'no-floating-decimal': 2,      // 禁止数字字面量中使用前导和末尾小数点
    'no-loop-func':1,              // 禁止在循环中出现 function 声明和表达式
    'no-cond-assign': 2,           // 禁止在条件表达式中使用赋值语句
    'no-delete-var': 2,            // 不能对var声明的变量使用delete操作符
    'no-dupe-keys': 2,             // 在创建对象字面量时不允许键重复
    'no-duplicate-case': 2,        // switch中的case标签不能重复
    'no-dupe-args': 2,             // 函数参数不能重复
    'no-empty': 2,                 // 块语句中的内容不能为空
    'no-func-assign': 2,           // 禁止重复的函数声明
    'no-invalid-this': 0,          // 禁止无效的this，只能用在构造器，类，对象字面量
    'no-redeclare': 2,             // 禁止重复声明变量
    'no-spaced-func': 2,           // 函数调用时 函数名与()之间不能有空格
    'no-undef': 1,                 // 不能有未定义的变量
    'no-use-before-define': 2,     // 未定义前不能使用
    'camelcase': 0,                // 强制驼峰法命名


    //
    // React.相关 //
    //
    'jsx-quotes': [2, 'prefer-double'],    // 强制在JSX属性（jsx-quotes）中一致使用双引号
    'react/display-name': 0,               // 防止在React组件定义中丢失displayName
    'react/jsx-no-bind': 0,                // JSX中不允许使用箭头函数和bind
    'react/jsx-no-literals': 0,            // 防止使用未包装的JSX字符串
    'react/jsx-pascal-case': 0,            // 为用户定义的JSX组件强制使用PascalCase
    'react/no-danger': 0,                  // 防止使用危险的JSX属性
    'react/no-did-mount-set-state': 0,     // 防止在componentDidMount中使用setState
    'react/no-set-state': 0,               // 防止使用setState
    'react/prop-types': 0,                 // 防止在React组件定义中丢失props验证
    'react/self-closing-comp': 0,          // 防止没有children的组件的额外结束标签
    'no-extra-boolean-cast': 0,            // 禁止不必要的bool转换
    'react/no-array-index-key': 0,         // 防止在数组中遍历中使用数组key做索引
    'no-unreachable': 1,                   // 不能有无法执行的代码
    'comma-dangle': 2,                     // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
    'comma-spacing': [2, {'before': false, 'after': true}],  // 控制逗号前后的空格
    'no-mixed-spaces-and-tabs': 0,         // 禁止混用tab和空格
    'prefer-arrow-callback': 0,            // 比较喜欢箭头回调

    //
    // ES6.相关 //
    //
    'arrow-body-style': 2,    // 要求箭头函数体使用大括号
    'arrow-parens': 2,        // 要求箭头函数的参数使用圆括号
    'arrow-spacing':[2, { 'before': true, 'after': true }],
    'constructor-super': 0,   // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
    'no-const-assign':2,      // 禁止修改 const 声明的变量
    'no-dupe-class-members':2, // 禁止类成员中出现重复的名称
    'no-this-before-super': 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-var': 0,              // 要求使用 let 或 const 而不是 var
    'object-shorthand': 0,    // 要求或禁止对象字面量中方法和属性使用简写语法
    'prefer-template':0      // 要求使用模板字面量而非字符串连接

  },
  'settings': {
    'import/ignore': [
      'node_modules'
    ]
  }
}