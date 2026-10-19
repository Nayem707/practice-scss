interface FieldDescriptors {
  error?: string;
  helperText?: string;
}

export function getFieldIds(id: string) {
  return { helperId: `${id}-helper`, errorId: `${id}-error` };
}

/** Builds the `aria-describedby` value pointing at visible helper/error text. */
export function getDescribedBy(id: string, { error, helperText }: FieldDescriptors) {
  const { helperId, errorId } = getFieldIds(id);
  const ids = [helperText && helperId, error && errorId].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}
