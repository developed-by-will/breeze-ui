/* For the preview */
import codeSource from '!!raw-loader!../data-table.tsx';
import { Button } from '@/components/ui/button';
import {
  componentsMetadata,
  ComponentType,
  REGISTRY_BASE_URL
} from '@/registry/components/metadata';
import { useState } from 'react';
import { columns } from '../config/columns';
import { payments } from '../config/example';
import { DataTable } from '../data-table';

export const codeSnippet = codeSource;

const ExampleComponent = () => {
  const [isFetching, setIsFetching] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
          }, 2000);
        }}
      >
        Test fetching state
      </Button>

      <DataTable
        columns={columns}
        data={payments}
        loading={isFetching}
        pagination={true}
        filterInput={true}
        visibilityToggle={true}
      />
    </>
  );
};

const example = <ExampleComponent />;

const rootLayout = `import { DataTable } from '..';
import { columns } from '../config/columns';
import { payments } from '../config/example';

export default function Payments() {
  const [isFetching, setIsFetching] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
          }, 2000);
        }}
      >
        Test fetching state
      </Button>

      <DataTable
        columns={columns}
        data={payments}
        loading={isFetching}
        pagination={true}
        filterInput={true}
        visibilityToggle={true}
      />
    </>
  );
}`;

const columnsExample = `'use client';

import { DataTableColumnHeader } from '@/components/breeze-ui/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="text-left">{row.getValue('status')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
`;

const exampleSampleData = `type Payment = {
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
`;

export const config: ComponentType = {
  type: 'block',
  slug: componentsMetadata['data-table'].slug,
  name: componentsMetadata['data-table'].name,
  title: componentsMetadata['data-table'].title,
  description: componentsMetadata['data-table'].description,
  codeSnippet,
  example,
  implementation_1: columnsExample,
  implementation_1_title: 'Example of the columns configuration',
  implementation_2: exampleSampleData,
  implementation_2_title: 'Example sample data',
  implementation_3: rootLayout,
  implementation_3_title: 'How to use the component',
  addCommand: `npx shadcn add ${REGISTRY_BASE_URL}/${componentsMetadata['data-table'].name}.json`
};
