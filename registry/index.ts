import { blocks } from '@/registry/registry-blocks';
import { charts } from '@/registry/registry-charts';
import { hooks } from '@/registry/registry-hooks';
import { lib } from '@/registry/registry-lib';
import { ui } from '@/registry/registry-ui';
import { Registry } from '@/registry/schema';

export const registry: Registry = [...ui, ...blocks, ...charts, ...lib, ...hooks];
