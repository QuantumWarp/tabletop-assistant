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
  Values,
  Layout,
  CreateLayout,
  CreateValues,
  UpdateLayout,
  UpdateValues,
} from 'tabletop-assistant-common';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID ?? '',
    authority: process.env.REACT_APP_AUTH_AUTHORITY ?? '',
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI ?? '',
  },
});

export const api = createApi({
  tagTypes: ['Tabletop', 'Entity', 'Values', 'Layout', 'History', 'Note'],
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

    // Values
    getAllValues: build.query<Values[], string>({
      query: (tabletopId) => `/values?tabletopId=${tabletopId}`,
      providesTags: ['Values'],
    }),
    getValues: build.query<Values, string>({
      query: (entityId) => ({ url: `/values/${entityId}` }),
      providesTags: ['Values'],
    }),
    createValues: build.mutation<Values, CreateValues>({
      query: (body) => ({ url: '/values', method: 'POST', body }),
      invalidatesTags: ['Values'],
    }),
    updateValues: build.mutation<Values, UpdateValues>({
      query: (body) => ({ url: '/values', method: 'PUT', body }),
      invalidatesTags: ['Values'],
    }),
    deleteValues: build.mutation<void, string>({
      query: (entityId) => ({ url: `/values/${entityId}`, method: 'DELETE' }),
      invalidatesTags: ['Values'],
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

    // History
    getHistory: build.query<HistoryEntry[], void>({
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

  useGetAllValuesQuery,
  useGetValuesQuery,
  useCreateValuesMutation,
  useUpdateValuesMutation,
  useDeleteValuesMutation,

  useGetLayoutsQuery,
  useGetLayoutQuery,
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
  useDeleteLayoutMutation,

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
} = api;
