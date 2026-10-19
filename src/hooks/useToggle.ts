import { useCallback, useMemo, useState } from 'react';

interface ToggleControls {
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
  set: (value: boolean) => void;
}

export function useToggle(initialValue = false): [boolean, ToggleControls] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((current) => !current), []);
  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);

  const controls = useMemo(
    () => ({ toggle, setOn, setOff, set: setValue }),
    [toggle, setOn, setOff],
  );

  return [value, controls];
}
