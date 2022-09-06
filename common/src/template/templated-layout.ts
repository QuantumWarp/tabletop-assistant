import { Layout } from '../layout/layout';

export type TemplatedLayout = Omit<Layout, 'tabletopId' | 'userId'>;
export type UpdateTemplatedLayout = Omit<TemplatedLayout, 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplatedLayout = Omit<UpdateTemplatedLayout, '_id'>;
