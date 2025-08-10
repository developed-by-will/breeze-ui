type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d42s',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d42z',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d42b',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d42ca',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d42eqw',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d42n',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '728ed52favzxgw',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '489e1d4ba2',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489wae1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1bad42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e132d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1ntfnd42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1d76542',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  },
  {
    id: '489e1du6ng42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  }
];
