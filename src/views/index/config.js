export const formJson = [
  {
    label: '客户名称',
    type: 'input',
    key: 'customerName',
    placeholder: '请输入'
  },
  {
    label: '登录账号',
    type: 'input',
    key: 'account',
    placeholder: '请输入'
  },
  {
    label: '状态',
    type: 'select',
    key: 'isValid',
    placeholder: '请选择',
    option: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '停用',
        value: 0
      }
    ]
  }
]

export const tableJson = {
  thead: [
    {
      label: '客户名称',
      column: 'customerName',
      width: 'auto',
      align: 'left'
    },
    {
      label: '登录账号',
      column: 'account',
      width: 'auto',
      align: 'left'
    },
    {
      label: '手机号',
      column: 'tel',
      width: '150',
      align: 'left'
    },
    {
      label: 'email',
      column: 'email',
      width: '220',
      align: 'left'
    },
    {
      label: '激活状态',
      column: 'isValid',
      width: '100',
      align: 'left',
      option: {
        0: '失效',
        1: '生效'
      }
    },
    {
      label: 'token',
      column: 'token',
      width: '220',
      align: 'left'
    },
    {
      label: '生效时间',
      column: 'validTime',
      width: '120',
      align: 'left',
      fixed: 'right'
    },
    {
      label: '失效时间',
      column: 'failureTime',
      width: '120',
      align: 'left',
      fixed: 'right'
    },
    {
      label: '创建时间',
      column: 'cTime',
      width: '120',
      align: 'left',
      fixed: 'right'
    },
    {
      label: '账户余额',
      column: 'balance',
      width: '120',
      align: 'left',
      fixed: 'right'
    },
    {
      column: 'control',
      label: '操作',
      width: '120',
      align: 'left',
      slot: true,
      fixed: 'right'
    }
  ],
  tbody: []
}

export const editForm = [
  {
    label: '客户名称',
    type: 'input',
    key: 'customerName',
    placeholder: '请输入',
    validate: { required: true, message: '请输入', trigger: 'blur' }
  },
  {
    label: '客户账号',
    type: 'input',
    key: 'account',
    placeholder: '请输入',
    validate: { required: true, message: '请输入', trigger: 'blur' }
  },
  {
    label: '手机号',
    type: 'input',
    key: 'tel',
    placeholder: '请输入',
    validate: { required: true, message: '请输入', trigger: 'blur' }
  },
  {
    label: '邮箱',
    type: 'input',
    key: 'email',
    placeholder: '请输入',
    validate: { required: true, message: '请输入', trigger: 'blur' }
  },
  {
    label: '生效时间',
    type: 'datePicker',
    key: 'date',
    componentType: 'daterange',
    format: 'yyyy-MM-dd HH:mm:ss',
    validate: { required: true, message: '请选择', trigger: 'blur' }
  },
  {
    label: '激活状态',
    type: 'radio',
    key: 'isValid',
    placeholder: '请选择',
    option: [
      {
        label: '生效',
        value: 1
      },
      {
        label: '失效',
        value: 0
      }
    ],
    validate: { required: true, message: '请选择', trigger: 'blur' }
  }
]
