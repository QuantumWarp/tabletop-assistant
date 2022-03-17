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
} from 'tabletop-assistant-common';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID ?? '',
    authority: process.env.REACT_APP_AUTH_AUTHORITY ?? '',
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI ?? '',
  },
});

export const api = createApi({
  tagTypes: ['Tabletop', 'History', 'Note'],
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

    // History
    getHistory: build.query<HistoryEntry[], void>({
      query: () => '/history',
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
    getNotes: build.query<Note[], void>({
      query: () => '/notes',
      providesTags: ['Note'],
    }),
    getNote: build.query<Note, string>({
      query: (id) => ({ url: `/notes/${id}` }),
      providesTags: ['Note'],
    }),
    createNote: build.mutation<Tabletop, CreateNote>({
      query: (body) => ({ url: '/notes', method: 'POST', body }),
      invalidatesTags: ['Note'],
    }),
    updateNote: build.mutation<Tabletop, UpdateNote>({
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
