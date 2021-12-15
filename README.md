# xjh-components

#### 介绍
本项目是基于Element-UI扩展的常用组件库。

#### 使用方式
##### 安装：
 ```
npm install xjh-components -S
```
##### 引入:
```
import XJHComponents from 'xjh-components'

Vue.use(XJHComponents)
```

#### 组件

1.  ##### 动态表单组件JsonForm:
    ###### Attributes
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | inline | 行内表单模式 | Boolean | false | - |
    | label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | String | auto | - |
    | json | 表单配置数组[jsonItem]，jsonItem配置详见下表 | Array | [] | - |
    | model | 表单数据对象 | Object | {} | - |
    | label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width | String | right | right/left/top |
    
    ###### jsonItem
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | label | 标签文本 | String | - | - |
    | type | 组件类型 | String | - | text/input/textarea/inputNumber/select/selectRemote/button/switch/checkbox/radio/datePicker/timePicker/cascader/table/image/colorPicker/slider/stake |
    | key | 对应表单数据对象model字段名称 | String | - | - |
    | placeholder | 占位符 | String | - | - |
    | option | 可选项数据源，仅type为select/selectRemote/radio/checkbox/cascader时有效 | Array | [] | - |
    | validate | 表单验证规则 | Object/Array | - | - |
    | disabled | 是否禁用 | Boolean | false | - |
    | maxlength | 最大输入长度，仅type为input/textarea有效 | Number | - | - |
    | readonly | 是否只读，仅type为input/image有效 | Boolean | false | - |
    | min | 设置计数器允许的最小值，仅type为inputNumber有效 | Number | -Infinity | - |
    | max | 设置计数器允许的最大值，仅type为inputNumber有效 | Number | Infinity | - |
    | precision | 数值精度，仅type为inputNumber有效 | Number | - | - |
    | step | 计数器步长，仅type为inputNumber有效 | Number | 1 | - |
    | componentType | 组件二级类型，仅type为select/datePicker | String | - | group/date |
    | hideClear | 是否隐藏清空选项，仅type为select有效 | Boolean | false | - |
    | multiple | 是否可以多选，仅type为select有效 | Boolean | false | - |
    | collapseTags | 多选时是否将选中值按文字的形式展示，仅type为select/cascader有效 | Boolean | false | - |
    | filterable | 是否可搜索，仅type为select有效 | Boolean | false | - |
    | valueKey | 作为 value 唯一标识的键名，绑定值为对象类型时必填，仅type为select有效 | String | value | - |
    | loading | 是否正在从远程获取数据，仅type为selectRemote有效 | Boolean | false | - |
    | onClick | 点击事件，仅type为button有效 | Function | - | - |
    | format | 时间显示格式，形如yyyy-MM-dd hh:mm:ss，仅type为datePicker/timePicker时有效 | String | - | - |
    | arrowControl | 是否使用箭头进行时间选择，仅type为timePicker有效 | Boolean | false | - |
    | pickerOptions | 当前时间日期选择器特有的选项，同<el-time-picker>中picker-options，仅type为datePicker/timePicker有效 | Object | {} | - |
    | isRange | 是否为时间范围选择，仅type为timePicker有效 | Boolean | false | - |
    | startPlaceholder | 范围选择时开始日期的占位内容，仅type为datePicker有效 | String | - | - |
    | endPlaceholder | 范围选择时结束日期的占位内容，仅type为datePicker有效 | String | - | - |
    | props | 级联选择器配置项，同<el-cascader>中props，仅type为cascader有效 | Object | {} | - |
    
2.  ##### 动态表格组件JsonTable:
    ###### Attributes
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。 | String/Number | false | - |
    | loading | 是否显示加载数据动效 | Boolean | false | - |
    | stripe | 是否为斑马纹 table | Boolean | false | - |
    | json | 表格配置项，详见下表 | Object | { tbody: [], thead: [] } | - |
    | highlight | 是否要高亮当前行 | Boolean | false | - |
    | row-key | 行数据的Key，用来优化 Table 的渲染。 | String | - | - |
    | check-on-click | 是否点击行时触发toggleRowSelection事件 | Boolean | false | - |
    
    ###### json
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | thead.label | 显示的标题 | String | - | - |
    | thead.column | 对应列内容的字段名 | String | - | - |
    | thead.width | 对应列的宽度 | String | - | - |
    | thead.align | 对齐方式 | String | left | left/center/right |
    | thead.fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | String/Boolean | false | true/false/left/right |
    | thead.slot | 是否为插槽 | Boolean | false | - |
    | tbody | 表格数据 | Array | [] | - |
    | index | 索引列配置 | Objetc | {} | - |
    | selection | 多选表格配置 | Objetc | {} | - |

    ###### index
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | enable | 是否开启 | Boolean | false | - |
    | width | 索引列宽度 | String/Number | - | - |
    | label | 显示的标题 | String | - | - |
    | formatter | 自定义索引 | number, Function(index) | - | - |
    
    ###### selection
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | enable | 是否开启 | Boolean | false | - |
    | width | 列宽度 | String/Number | - | - |
    | reserveSelection | 在数据更新之后保留之前选中的数据（需指定 row-key） | Boolean | false | - |
    
    ###### Event
    | 事件 | 说明 | 参数 |
    | ---- | ---- | ---- |
    | select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
    | select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
    | selection-change | 当选择项发生变化时会触发该事件 | selection |
    | current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
    | row-click | 当某一行被点击时会触发该事件 | row, column, event |
    | item-click | 当某单元格被点击时会触发该事件 | row |

3.  ##### 分页表格组件PaginationTable:
    ###### Attributes
    | 参数 | 说明 | 类型 | 默认值 | 可选值 |
    | ---- | ---- | ---- | ------ | ------ |
    | table | 表格配置项，同<JsonTable>中json | Object | {} | - |
    | table-height | 表格高度 | String/Number | 300 | - |
    | load-created | 是否在created中触发读取第一页数据操作 | Boolean | true | - |
    | check-on-click | 是否点击行时触发toggleRowSelection事件 | Boolean | true | - |
    | row-key | 行数据的Key，用来优化 Table 的渲染。 | String | id | - |
    | highlight | 是否要高亮当前行 | Boolean | false | - |
    | fetch-data | 获取表格数据方法 | Function | new Promise((resolve, reject) => { resolve({}) }) | - |
    | pagination-center | 分页组件是否居中显示 | Boolean | true | - |
    | page-size | 每页显示条目个数 | Number | 10 | - |

    ###### Event
    | 事件 | 说明 | 参数 |
    | ---- | ---- | ---- |
    | select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
    | select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
    | selection-change | 当选择项发生变化时会触发该事件 | selection |
    | current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
    | row-click | 当某一行被点击时会触发该事件 | row, column, event |
