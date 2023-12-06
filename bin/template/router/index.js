exports.routerMap = (name, uppercaseName, title) => {
  return `export default [
  {
    path: '/${name}',
    redirect: '/${name}/index',
    meta: {
      title: '${title}',
    },
    children: [
      {
        path: 'index',
        name: '${uppercaseName}',
        component: () => import('@v/${name}/index.vue'),
        meta: {
          title: '${title}',
        },
      },
    ],
  },
];;
`;
};
