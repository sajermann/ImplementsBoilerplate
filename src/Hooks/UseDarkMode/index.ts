import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { _handleChangeDarkModeInDom } from '~/Hooks/UseDarkMode/Utils';

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeZustand = create<Props>()(
  persist(
    set => ({
      darkMode: true,
      toggleDarkMode: () =>
        set(state => {
          _handleChangeDarkModeInDom(!state.darkMode);
          return {
            ...state,
            darkMode: !state.darkMode,
          };
        }),
    }),
    {
      name: '@sajermann/ui-react:darkMode-zustand', // name of the item in the storage (must be unique)
    },
  ),
);

window.store = useDarkModeZustand;
