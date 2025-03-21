import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { classService } from '../services/class.service';
import type { GymClass } from '../types/class.types';

const difficultyColors = {
  beginner: { bg: 'bg-[var(--color-success-50)]', text: 'text-[var(--color-success-600)]' },
  intermediate: { bg: 'bg-[var(--color-warning-50)]', text: 'text-[var(--color-warning-600)]' },
  advanced: { bg: 'bg-[var(--color-error-50)]', text: 'text-[var(--color-error-600)]' },
};

export default function ClassList() {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await classService.getAll();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-600)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-[var(--color-error-50)] p-4">
        <div className="text-[var(--color-error-600)]">
          Error al cargar las clases. Por favor, intenta de nuevo.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)]">
          Clases disponibles
        </h2>
        <button className="btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nueva Clase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes?.map((gymClass: GymClass) => (
          <div key={gymClass.id} className="card">
            <div className="relative">
              <img
                src={gymClass.image || 'https://via.placeholder.com/300x200'}
                alt={gymClass.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium
                  ${difficultyColors[gymClass.difficulty].bg}
                  ${difficultyColors[gymClass.difficulty].text}`}
              >
                {gymClass.difficulty}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                {gymClass.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                {gymClass.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)]">
              <div className="flex items-center text-sm text-[var(--color-gray-500)]">
                <span className="font-medium text-[var(--color-gray-900)]">
                  Instructor:
                </span>
                <span className="ml-2">{gymClass.trainer.name}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-[var(--color-gray-500)]">
                <span className="font-medium text-[var(--color-gray-900)]">
                  Horarios:
                </span>
                <span className="ml-2">
                  {gymClass.schedules.length} disponibles
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="btn-secondary">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 