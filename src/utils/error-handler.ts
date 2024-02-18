export function handleError(arg0: string, arg1: Error) {
    throw new Error(arg0 + " " + arg1.message);
}
  