import lazyLoading from '../utils/lazyLoading'
export default [
  {
    path: '/',
    name: 'root',
    component:lazyLoading('Root')
  },
  {
    path:'/drafts',
    component:lazyLoading('draft/Draft'),
    children:[
      {
        path:'/',
        name:'drafts',
        component:lazyLoading('draft/Index'),
      },
      {
        path:'/drafts/:id/show',
        name:'drafts.show',
        component:lazyLoading('draft/Show'),
      }
    ]
  },
  {
    path:'/customers',
    component:lazyLoading('customer/Customer'),
    children:[
      {
        path:'/',
        name:'customers',
        component:lazyLoading('customer/Index'),
      },
      {
        path:'/customers/create',
        name:'customers.create',
        component:lazyLoading('customer/Create'),
      }
    ]
  }
];
