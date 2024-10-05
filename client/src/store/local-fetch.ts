import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { v4 as uuid } from 'uuid';

export const localFetch: BaseQueryFn = async (args, api) => {
  if (api.type === 'query') {
    return getData(args.url ? args.url : args);
  }
  console.log(args)

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

  if (!id) {
    const key = `${model}-`;
    const data = Object.keys(localStorage)
      .filter(x => x.startsWith(key))
      .map(x => JSON.parse(localStorage.getItem(x)!));
    return { data };
  } else {
    const key = `${model}-${id}`;
    const rawData = localStorage.getItem(key);
    const data = rawData ? JSON.parse(rawData) : undefined;
    return { data };
  }
}

const postData = async ({ url, body }: { url: string; body: object }) => {
  const { model } = parseUrl(url);
  const id = uuid();
  const key = `${model}-${id}`;
  localStorage.setItem(key, JSON.stringify({ _id: id, ...body }));
  return { data: id };
}

const putData = async ({ url, body }: { url: string; body: { _id: string } }) => {
  const { model } = parseUrl(url);
  const id = body._id;
  const key = `${model}-${id}`;
  localStorage.setItem(key, JSON.stringify(body));
  return { data: id };

}

const deleteData = async ({ url }: { url: string; body: unknown }) => {
  const { model, id } = parseUrl(url);
  const key = `${model}-${id}`;
  localStorage.removeItem(key);
  return { data: id };
}


const parseUrl = (url: string) => {
  console.log(url)
  const [pathname, search] = url.split('?');
  const pathSegments = pathname.split('/').filter(segment => segment);
  const model = pathSegments[0];
  const id = pathSegments[1];
  const filter = search?.split("tabletopId=")[1];
  return { model, id, filter };
}