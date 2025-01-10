import { useState } from 'react';

import { Drawer } from '../../Drawer';
import { Icons } from '../../Icons';
import { HeaderButton } from '../HeaderButton';
import MenuAccessOptions from '../MenuAccessOptions';

export default function _MenuAccessOptionsMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderButton onClick={() => setIsOpen(!isOpen)}>
        <Icons nameIcon="list" width="1.5rem" />
      </HeaderButton>
      <Drawer
        openFrom="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sectionInternal={{
          className: 'w-96',
        }}
      >
        <MenuAccessOptions onClick={() => setIsOpen(false)} />
      </Drawer>
    </>
  );
}
