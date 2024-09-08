import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';

export const Column = ({ className, id, classColor, classCode, children }: ColumnProps) => {

  const {
    setNodeRef,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
      name: className,
      classCode: classCode,
      classId: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn('flex flex-col gap-3 min-w-52 rounded-md border border-gray-200',)}>
      <header className={cn(
        'p-2 rounded-t-md border-b border-gray-200',
      )}
        style={{
          backgroundColor: classColor ? classColor : '#fff',
          color: classColor ? '#fff' : '#000'
        }}
      >
        <h3 className='text-lg font-semibold text-center'>CLass: {className}</h3>
      </header>
      <div className={'flex flex-col gap-3 px-4 pt-1 pb-5'}>
        {children}
      </div>
    </div>
  )
}

interface ColumnProps {
  id: string;
  className: string;
  classCode: string
  classId: number
  classColor?: string
  children: React.ReactNode
}