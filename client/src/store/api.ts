import { PublicClientApplication } from '@azure/msal-browser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Tabletop,
  CreateTabletop,
  UpdateTabletop,
  Note,
  CreateNote,
  UpdateNote,
  UpdateHistoryEntry,
  CreateHistoryEntry,
  HistoryEntry,
  Entity,
  CreateEntity,
  UpdateEntity,
  ValueMap,
  Layout,
  CreateLayout,
  CreateValueMap,
  UpdateLayout,
  UpdateValueMap,
  TemplateImport,
  TemplateSummary,
  TemplateRoot,
} from 'tabletop-assistant-common';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID ?? '',
    authority: process.env.REACT_APP_AUTH_AUTHORITY ?? '',
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI ?? '',
  },
});

export const api = createApi({
  tagTypes: ['Tabletop', 'Entity', 'Values', 'Layout', 'History', 'Note', 'Template', 'TemplateEntity'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL ?? '',
    prepareHeaders: async (headers) => {
      const account = msalInstance.getAllAccounts()[0];
      const response = await msalInstance.acquireTokenSilent({
        account,
        scopes: ['User.Read'],
      });
      headers.set('authorization', `Bearer ${response.idToken}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    // Tabletops
    getTabletops: build.query<Tabletop[], void>({
      query: () => '/tabletops',
      providesTags: ['Tabletop'],
    }),
    getTabletop: build.query<Tabletop, string>({
      query: (id) => ({ url: `/tabletops/${id}` }),
      providesTags: ['Tabletop'],
    }),
    createTabletop: build.mutation<Tabletop, CreateTabletop>({
      query: (body) => ({ url: '/tabletops', method: 'POST', body }),
      invalidatesTags: ['Tabletop'],
    }),
    updateTabletop: build.mutation<Tabletop, UpdateTabletop>({
      query: (body) => ({ url: '/tabletops', method: 'PUT', body }),
      invalidatesTags: ['Tabletop'],
    }),
    deleteTabletop: build.mutation<void, string>({
      query: (id) => ({ url: `/tabletops/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Tabletop'],
    }),

    // Entities
    getEntities: build.query<Entity[], string>({
      query: (tabletopId) => `/entities?tabletopId=${tabletopId}`,
      providesTags: ['Entity'],
    }),
    getEntity: build.query<Entity, string>({
      query: (id) => ({ url: `/entities/${id}` }),
      providesTags: ['Entity'],
    }),
    createEntity: build.mutation<Entity, CreateEntity>({
      query: (body) => ({ url: '/entities', method: 'POST', body }),
      invalidatesTags: ['Entity'],
    }),
    updateEntity: build.mutation<Entity, UpdateEntity>({
      query: (body) => ({ url: '/entities', method: 'PUT', body }),
      invalidatesTags: ['Entity'],
    }),
    deleteEntity: build.mutation<void, string>({
      query: (id) => ({ url: `/entities/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Entity'],
    }),

    // ValueMaps
    getValueMaps: build.query<ValueMap[], string>({
      query: (tabletopId) => `/value-maps?tabletopId=${tabletopId}`,
      providesTags: ['Values'],
    }),
    getValueMap: build.query<ValueMap, string>({
      query: (entityId) => ({ url: `/value-maps/${entityId}` }),
      providesTags: ['Values'],
    }),
    createValueMaps: build.mutation<ValueMap, CreateValueMap[]>({
      query: (body) => ({ url: '/value-maps', method: 'POST', body }),
      invalidatesTags: ['Values', 'Entity'],
    }),
    updateValueMaps: build.mutation<ValueMap, UpdateValueMap[]>({
      query: (body) => ({ url: '/value-maps', method: 'PUT', body }),
      invalidatesTags: [], // Invalidating Value Maps here would be very chatty
    }),
    deleteValueMap: build.mutation<void, string>({
      query: (entityId) => ({ url: `/value-maps/${entityId}`, method: 'DELETE' }),
      invalidatesTags: ['Values', 'Entity'],
    }),

    // Layouts
    getLayouts: build.query<Layout[], string>({
      query: (tabletopId) => `/layouts?tabletopId=${tabletopId}`,
      providesTags: ['Layout'],
    }),
    getLayout: build.query<Layout, string>({
      query: (id) => ({ url: `/layouts/${id}` }),
      providesTags: ['Layout'],
    }),
    createLayout: build.mutation<Layout, CreateLayout>({
      query: (body) => ({ url: '/layouts', method: 'POST', body }),
      invalidatesTags: ['Layout'],
    }),
    updateLayout: build.mutation<Layout, UpdateLayout>({
      query: (body) => ({ url: '/layouts', method: 'PUT', body }),
      invalidatesTags: ['Layout'],
    }),
    deleteLayout: build.mutation<void, string>({
      query: (id) => ({ url: `/layouts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Layout'],
    }),
    updateLayoutOrder: build.mutation<Layout, string[]>({
      query: (body) => ({ url: '/layouts/order', method: 'POST', body }),
      invalidatesTags: ['Layout'],
    }),

    // History
    getHistory: build.query<HistoryEntry[], string>({
      query: (tabletopId) => `/history?tabletopId=${tabletopId}`,
      providesTags: ['History'],
    }),
    getHistoryEntry: build.query<HistoryEntry, string>({
      query: (id) => ({ url: `/history/${id}` }),
      providesTags: ['History'],
    }),
    createHistoryEntry: build.mutation<HistoryEntry, CreateHistoryEntry>({
      query: (body) => ({ url: '/history', method: 'POST', body }),
      invalidatesTags: ['History'],
    }),
    updateHistoryEntry: build.mutation<HistoryEntry, UpdateHistoryEntry>({
      query: (body) => ({ url: '/history', method: 'PUT', body }),
      invalidatesTags: ['History'],
    }),
    deleteHistoryEntry: build.mutation<void, string>({
      query: (id) => ({ url: `/history/${id}`, method: 'DELETE' }),
      invalidatesTags: ['History'],
    }),

    // Notes
    getNotes: build.query<Note[], string>({
      query: (tabletopId) => `/notes?tabletopId=${tabletopId}`,
      providesTags: ['Note'],
    }),
    getNote: build.query<Note, string>({
      query: (id) => ({ url: `/notes/${id}` }),
      providesTags: ['Note'],
    }),
    createNote: build.mutation<Note, CreateNote>({
      query: (body) => ({ url: '/notes', method: 'POST', body }),
      invalidatesTags: ['Note'],
    }),
    updateNote: build.mutation<Note, UpdateNote>({
      query: (body) => ({ url: '/notes', method: 'PUT', body }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: build.mutation<void, string>({
      query: (id) => ({ url: `/notes/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Note'],
    }),

    // Templates
    getEntityTemplates: build.query<Entity[], string>({
      query: (tag) => ({ url: `/entities/templates?tags=${encodeURIComponent(tag)}` }),
      providesTags: ['TemplateEntity'],
    }),
    getTemplateRoots: build.query<TemplateRoot[], void>({
      query: () => '/templates',
    }),
    getTemplateSummary: build.query<TemplateSummary, string>({
      query: (templateRootId) => `/templates/summary?templateRootId=${templateRootId}`,
    }),
    importTemplate: build.mutation<void, TemplateImport>({
      query: (body) => ({ url: '/templates/import', method: 'POST', body }),
      invalidatesTags: ['Entity', 'Values', 'Layout'],
    }),

    // Images
    uploadImage: build.mutation<{ filename: string }, FormData>({
      query: (body) => ({ url: '/images', method: 'POST', body }),
    }),
    deleteImage: build.mutation<void, string>({
      query: (filename) => ({ url: `/images/${filename}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetTabletopsQuery,
  useGetTabletopQuery,
  useCreateTabletopMutation,
  useUpdateTabletopMutation,
  useDeleteTabletopMutation,

  useGetEntitiesQuery,
  useGetEntityQuery,
  useCreateEntityMutation,
  useUpdateEntityMutation,
  useDeleteEntityMutation,

  useGetValueMapsQuery,
  useGetValueMapQuery,
  useCreateValueMapsMutation,
  useUpdateValueMapsMutation,
  useDeleteValueMapMutation,

  useGetLayoutsQuery,
  useGetLayoutQuery,
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
  useDeleteLayoutMutation,
  useUpdateLayoutOrderMutation,

  useGetHistoryQuery,
  useGetHistoryEntryQuery,
  useCreateHistoryEntryMutation,
  useUpdateHistoryEntryMutation,
  useDeleteHistoryEntryMutation,

  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,

  useGetEntityTemplatesQuery,
  useGetTemplateRootsQuery,
  useGetTemplateSummaryQuery,
  useImportTemplateMutation,

  useUploadImageMutation,
  useDeleteImageMutation,
} = api;
