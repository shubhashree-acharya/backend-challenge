export const NODES_LIST = [
  {
    name: 'AlphaPC',
    id: 1,
    mpath: '1.',
  },
  {
    name: 'Processing',
    id: 2,
    parentId: 1,
    mpath: '1.2.',
  },
  {
    name: 'Storage',
    id: 3,
    parentId: 1,
    mpath: '1.3.',
  },
  {
    name: 'CPU',
    id: 4,
    parentId: 2,
    mpath: '1.2.4.',
  },
  {
    name: 'Graphics',
    id: 5,
    parentId: 2,
    mpath: '1.2.5.',
  },
  {
    name: 'SSD',
    id: 6,
    parentId: 3,
    mpath: '1.3.6.',
  },
  {
    name: 'HDD',
    id: 7,
    parentId: 3,
    mpath: '1.3.7.',
  },
];
