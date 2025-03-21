import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { 
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../modules/auth/services/auth.service';
import type { User } from '../../modules/auth/types/auth.types';
import clsx from 'clsx';

interface AppHeaderProps {
  user: User | null | undefined;
}

export default function AppHeader({ user }: AppHeaderProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[var(--color-gray-200)] bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-[var(--color-gray-700)] lg:hidden"
        onClick={() => document.dispatchEvent(new Event('toggle-sidebar'))}
      >
        <span className="sr-only">Abrir sidebar</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className="h-6 w-px bg-[var(--color-gray-200)] lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-lg lg:max-w-xl">
            <label htmlFor="search" className="sr-only">Buscar</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-[var(--color-gray-400)]" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-[var(--color-gray-900)] ring-1 ring-inset ring-[var(--color-gray-300)] placeholder:text-[var(--color-gray-400)] focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary-600)] sm:text-sm sm:leading-6"
                placeholder="Buscar..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Abrir menú de usuario</span>
              {user?.avatar ? (
                <img
                  className="h-8 w-8 rounded-full bg-[var(--color-gray-50)]"
                  src={user.avatar}
                  alt=""
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-sm font-medium text-[var(--color-primary-600)]">
                  {user?.name ? getUserInitials(user.name) : '??'}
                </div>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-[var(--color-gray-900)]/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-[var(--color-gray-50)]' : '',
                        'block px-3 py-1 text-sm leading-6 text-[var(--color-gray-900)]'
                      )}
                    >
                      <div className="flex items-center">
                        <UserCircleIcon className="mr-2 h-4 w-4" />
                        Perfil
                      </div>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-[var(--color-gray-50)]' : '',
                        'block px-3 py-1 text-sm leading-6 text-[var(--color-gray-900)]'
                      )}
                    >
                      <div className="flex items-center">
                        <Cog6ToothIcon className="mr-2 h-4 w-4" />
                        Ajustes
                      </div>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={clsx(
                        active ? 'bg-[var(--color-gray-50)]' : '',
                        'block w-full px-3 py-1 text-sm leading-6 text-[var(--color-gray-900)]'
                      )}
                    >
                      <div className="flex items-center">
                        <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                        Salir
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
} 