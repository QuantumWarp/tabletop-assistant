import { PublicClientApplication } from '@azure/msal-browser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config, ConfigCreate } from 'tabletop-assistant-common';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID ?? '',
    authority: process.env.REACT_APP_AUTH_AUTHORITY ?? '',
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI ?? '',
  },
});

export const api = createApi({
  tagTypes: ['Config'],
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
    getConfigs: build.query<Config[], void>({
      query: () => '/config',
      providesTags: ['Config'],
    }),
    createConfig: build.mutation<string, ConfigCreate>({
      query: (body) => ({ url: '/config', method: 'POST', body }),
      invalidatesTags: ['Config'],
    }),
    updateConfig: build.mutation<void, ConfigCreate>({
      query: (body) => ({ url: '/config', method: 'PUT', body }),
      invalidatesTags: ['Config'],
    }),
    deleteConfig: build.mutation<void, string>({
      query: (id) => ({ url: `/config/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Config'],
    }),
  }),
});

export const {
  useGetConfigsQuery,
  useCreateConfigMutation,
  useUpdateConfigMutation,
  useDeleteConfigMutation,
} = api;
