exports.routerMap = (name, uppercaseName, title) => {
  return `const ${name} = () => import('@v/${name}');
const lists = [
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
        component: ${name},
        meta: {
          title: '${title}',
        },
      },
    ],
  },
];
export default lists;
`;
};
