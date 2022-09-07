import { Layout } from '../layout/layout';

export type TemplatedLayout = Omit<Layout, 'tabletopId' | 'userId'> & { referencedEntityIds: string[] };
export type UpdateTemplatedLayout = Omit<TemplatedLayout, 'createdAt' | 'updatedAt' | '__v'>;
export type CreateTemplatedLayout = Omit<UpdateTemplatedLayout, '_id'>;
