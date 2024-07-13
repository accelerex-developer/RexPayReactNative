import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    return result;
  };

export const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers) => {
    headers.set(
      "Authorization",
      `Basic a2Vub3ZpZW5hZHVnbWFpbGNvbToyMzA5YjBiNGMyYWIzNzYyN2FhMzk0MGM3MTY4MzQzNGRkNmZlNDAxY2FmOGFjMmQ1NDdhZWRlNDEzNWY=`,
    );
    return headers;
  },
});
