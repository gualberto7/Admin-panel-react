import { Fragment, useState, useEffect } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authService } from '../../modules/auth/services/auth.service';
import AppHeader from '../components/AppHeader';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Clientes', href: '/subscriptions', icon: UsersIcon },
  { name: 'Clases', href: '/classes', icon: CalendarIcon },
  { name: 'Entrenadores', href: '/trainers', icon: UserGroupIcon },
  { name: 'Membresías', href: '/memberships', icon: CreditCardIcon },
  { name: 'Reportes', href: '/reports', icon: ChartBarIcon },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const { data: profile } = useQuery({
    queryKey: ['auth-profile'],
    queryFn: async () => {
      const response = await authService.getProfile();
      return response.data.user;
    },
  });

  useEffect(() => {
    const handleToggleSidebar = () => setSidebarOpen(true);
    document.addEventListener('toggle-sidebar', handleToggleSidebar);
    return () => {
      document.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, []);

  return (
    <>
      <div>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[var(--color-gray-900)]/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="GymAdmin"
                      />
                      <span className="ml-2 text-xl font-semibold text-[var(--color-gray-900)]">
                        GymAdmin
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={clsx(
                                    location.pathname === item.href
                                      ? 'bg-[var(--color-gray-50)] text-[var(--color-primary-600)]'
                                      : 'text-[var(--color-gray-700)] hover:text-[var(--color-primary-600)] hover:bg-[var(--color-gray-50)]',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={clsx(
                                      location.pathname === item.href
                                        ? 'text-[var(--color-primary-600)]'
                                        : 'text-[var(--color-gray-400)] group-hover:text-[var(--color-primary-600)]',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-[var(--color-gray-200)] bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="GymAdmin"
              />
              <span className="ml-2 text-xl font-semibold text-[var(--color-gray-900)]">
                GymAdmin
              </span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={clsx(
                            location.pathname === item.href
                              ? 'bg-[var(--color-gray-50)] text-[var(--color-primary-600)]'
                              : 'text-[var(--color-gray-700)] hover:text-[var(--color-primary-600)] hover:bg-[var(--color-gray-50)]',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={clsx(
                              location.pathname === item.href
                                ? 'text-[var(--color-primary-600)]'
                                : 'text-[var(--color-gray-400)] group-hover:text-[var(--color-primary-600)]',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <AppHeader user={profile} />
          <main className="py-6">
            <div className="px-4 sm:px-6 lg:px-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
} 