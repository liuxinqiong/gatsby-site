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

Gatsby从Relay借用技术在编译期间将我们的源代码转换成AST（abstract syntax tree），所有的graphql标签的模版会被parser.js和query.compiler.js发现，然后将将它们从源代码中移除。这意味着graphql标签并不是在我们期望的地方执行。这就是为什么没有错误，