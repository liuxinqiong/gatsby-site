## 基础技能
一下是基本技能，如果提前知道会更好，也可以在学习Gatsby时同步学习。
* HTML/CSS/JS
* React
* GraphQL

## Gatsby介绍
React的基本使用

## 使用CSS
* 组件化开发意识
* 创建全局样式，每个站点都会有自己的一些全局样式
  * 排版
  * 背景色
* 通常人们会使用类似Bootstrap或是其他基础全局库，问题是他们很难定制化，并不能与React组件很好的工作
* 开发Typography.js，产生全局样式且和Gatsby、React配合
  * 不同于为每个元素设置font-size，Typography.js通过你提供的baseFontSize和baseLineHeight，为所有的组件生成基础CSS。
* Gatsby plugins
  * 目标：方便直接安装和使用
  * 安装步骤
    1. 通过 npm 安装插件
    2. 在 gatsby-config.js 中配置
* gatsby-plugin-typography
  * 会在头部插入style标签
  * 注意：如果使用 default starter 模版，需要删除 index.css，因为它覆盖了 Typography.js CSS
  * 有超过30多种主题可供选择，比如 npm install --save typography-theme-bootstrap typography-theme-lawton
* 组件创建：如果你的组件需要用在多个地方，那么他需要有自己独立的文件，如果只用在一个文件中，你可以考虑作为内联组件

## 创建嵌套布局
布局组件是你想要在多个页面共享的部分，比如通常会有共享的header和footer。其他通用的也可以是侧边栏和菜单导航栏等。

注意：不同于绝大多数children属性，在布局组件组件，children属性是一个函数，需要被执行

## 查询数据
Gatsby数据层：是Gatsby十分强大的特性，让你可以轻松地编译Markdown、WordPress、headless CMSs和其他数据来源

注意：Gatsby数据层是借助于GraphQL的能力。

什么是数据？

用计算机科学角度而言，答案是：比如string，integer，object等

在Gatsby中，一个更有用的答案是：任何在React组件外的资源，可以是WordPress，Markdown，CSV等，同样可以来源于数据库或API。

metadata：元数据，帮我们存储共享的数据

graphql 为啥会不报错呢？

Gatsby从Relay借用技术在编译期间将我们的源代码转换成AST（abstract syntax tree），所有的graphql标签的模版会被parser.js和query.compiler.js发现，然后将将它们从源代码中移除。这意味着graphql标签并不是在我们期望的地方执行。这就是为什么没有错误。

## 数据插件
GraphiQL：帮你正确构建查询数据的工具，是GraphQL整合在开发环境的IDE。在你构建Gatsby站点时，这是一个十分有用的工具。

通过访问`http://localhost:8000/___graphql`即可进入。基本使用
* Ctrl + Space 自动提示
* Ctrl + Enter 运行

在Gatsby中，数据可以来源于任何地方，APIs，databases，CMSs，本地文件等。

数据插件从他们的数据源获取数据，比如filesystem插件如何从文件系统中获取数据，WordPress插件如何从WordPress API中获取数据。

比如我们安装并配置gatsby-source-filesystem插件。重启服务，可以在GraphiQL中看到新添加allFile和file两个字段，看下基础查询的例子
```js
{
  allFile {
    edges {
      node {
        relativePath
        prettySize
        extension
        birthTime
      }
    }
  }
}
```

## 转换插件
filesystem插件帮助我们查询关于文件的数据，但如果我们想查询文件内的数据呢？

要实现这个，Gatsby提供转换插件读取原内容，并且可以转换成可用的数据。

比如Markdown文件，你需要将Markdown转换成HTML。

此时我们需要安装并配置gatsby-transformer-remark插件，重启服务发现GraphiQL中新添加了allMarkdownRemark和markdownRemark字段，看例子如何使用
```js
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
        }
        // 摘录
        excerpt
        timeToRead
        html
      }
    }
  }
}
```

看到没，这两个插件的配合将无所不能

提供查询条件，比如sort和filter字段。跳过多少个节点用skip，限制数据量limit

## 编程式创建页面
创建新页面有两个步骤
1. 为page生成path
2. 创建page

我们需要学会如何使用Gatsby的两个API，onCreateNode 和 createPages，这是两个十分常用的 API。我们只需要在 gatsby-node.js 中 export 同样名称的函数即可。

在这里我们使用 onCreateNode API 为每个 markdown 页面增加 path，所有我们在节点增加的数据都是可使用GraphQL查询的。
