function envCheck(
  value: string | undefined,
  name: string
): asserts value is string {
  if (value === undefined) {
    throw Error(`Missing \`${name}\` environment variable.`);
  }
}

export default envCheck;
