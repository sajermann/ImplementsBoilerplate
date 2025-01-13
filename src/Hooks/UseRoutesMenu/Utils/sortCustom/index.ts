import { TRoutesMenu } from '~/Types/TRoutesMenu';

export const _sortCustom = (a: TRoutesMenu, b: TRoutesMenu) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
