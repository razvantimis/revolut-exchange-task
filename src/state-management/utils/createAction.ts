export type Action<T extends string> = { type: T };
export type ActionWithPayload<
  T extends string,
  P extends Record<Exclude<string, 'type'>, unknown>,
  > = {
    type: T;
  } & P;

export function createAction<T extends string>(action: {
  type: T;
}): { type: T };

export function createAction<
  T extends string,
  P extends Record<Exclude<string, 'type'>, unknown>,
>(action: ActionWithPayload<T, P>): ActionWithPayload<T, P>;

export function createAction<
  T extends string,
  P extends Record<Exclude<string, 'type'>, unknown>,
>(action: Action<T> | ActionWithPayload<T, P>) {
  return action;
}
