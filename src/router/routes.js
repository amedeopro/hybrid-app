
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/post/:id',
    component: () => import('layouts/MyLayout.vue'),
    name: 'post',
    props: true,
    children: [
      { path: '', component: () => import('pages/Articolo.vue') }
    ] 
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
