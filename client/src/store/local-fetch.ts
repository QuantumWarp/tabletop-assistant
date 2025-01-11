import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { v4 as uuid } from 'uuid';
import { templateRoots } from "@tabletop-assistant/templates";

const prefix = "tabletop-assistant";

export const localFetch: BaseQueryFn = async (args, api) => {
  if (api.type === 'query') {
    return getData(args.url ? args.url : args);
  }

  switch (args.method) {
    case 'POST':
      return postData(args);
    case 'PUT':
      return putData(args);
    case 'DELETE':
      return deleteData(args);
  }

  throw new Error(`Unsupported method: ${args.method}`);
}

const getData = async (url: string) => {
  const { model, id } = parseUrl(url);
  
  if (model === "templates") {
    return getTemplates(id);
  }

  if (!id) {
    const key = `${prefix}-${model}-`;
    const data = Object.keys(localStorage)
      .filter(x => x.startsWith(key))
      .map(x => JSON.parse(localStorage.getItem(x)!));
    return { data };
  } else {
    const key = `${prefix}-${model}-${id}`;
    const rawData = localStorage.getItem(key);
    const data = rawData ? JSON.parse(rawData) : undefined;
    return { data };
  }
}

const postData = async ({ url, body }: { url: string; body: object & { createdAt?: Date } }) => {
  const { model } = parseUrl(url);
  const id = uuid();
  const key = `${prefix}-${model}-${id}`;
  const date = body.createdAt || Date.now();
  const data = { id: id, ...body, createdAt: date, updatedAt: date };
  localStorage.setItem(key, JSON.stringify(data));
  return { data };
}

const putData = async ({ url, body }: { url: string; body: { id: string } }) => {
  const { model } = parseUrl(url);
  const id = body.id;
  const key = `${prefix}-${model}-${id}`;
  const data = { ...body, updatedAt: Date.now() };
  localStorage.setItem(key, JSON.stringify(data));
  return { data };

}

const deleteData = async ({ url }: { url: string }) => {
  const { model, id } = parseUrl(url);
  const key = `${prefix}-${model}-${id}`;
  localStorage.removeItem(key);
  return { data: id };
}


const parseUrl = (url: string) => {
  const [pathname, search] = url.split('?');
  const pathSegments = pathname.split('/').filter(segment => segment);
  const model = pathSegments[0];
  const id = pathSegments[1];
  const filter = search?.split("tabletopId=")[1];
  return { model, id, filter };
}

const getTemplates = (id?: string) => {
  if (id) {
    return { data: templateRoots.find(x => x.id === id) };
  } else {
    return { data: templateRoots };
  }
}