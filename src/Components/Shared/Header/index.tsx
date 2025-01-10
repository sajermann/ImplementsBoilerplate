import { Link } from 'react-router-dom';

import { Nav } from '../Nav';
import MenuAccessOptionsMobile from './MenuAccessOptionsMobile';
import MenuSettings from './MenuSettings';

export function Header() {
  return (
    <Nav className="backdrop-blur-md z-50 sticky top-0">
      <div className="w-full flex flex-wrap justify-between items-center mx-auto">
        <MenuAccessOptionsMobile />
        <Link to="/" className="flex items-center">
          <h1 className="text-xl whitespace-nowrap font-bold">
            Implements Boilerplate
          </h1>
        </Link>
        <MenuSettings />
      </div>
    </Nav>
  );
}
