export type IHttpService<T, Params = any> = (params?: Params) => Promise<
  { success: true; data: T } | { success: false; status: number; error: string }
>;
