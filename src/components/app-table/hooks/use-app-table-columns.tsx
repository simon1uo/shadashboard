import type { UniqueIdentifier } from '@dnd-kit/core'
import type { ColumnDef } from '@tanstack/react-table'
import { useSortable } from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface WithId {
  id: UniqueIdentifier
}

interface UseAppTableColumnsProps<TData extends WithId> {
  columns: ColumnDef<TData>[]
  enableRowSelection?: boolean
  enableRowDrag?: boolean
}

function DragHandle({ id }: { id: UniqueIdentifier }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent cursor-move"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

export function useAppTableColumns<TData extends WithId>({
  columns,
  enableRowSelection = true,
  enableRowDrag = true,
}: UseAppTableColumnsProps<TData>) {
  return React.useMemo<ColumnDef<TData>[]>(() => {
    const composedColumns: ColumnDef<TData>[] = []

    if (enableRowDrag) {
      composedColumns.push({
        id: 'drag',
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        enableHiding: false,
        enableSorting: false,
      })
    }

    if (enableRowSelection) {
      composedColumns.push({
        id: 'select',
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected()
                || (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={value =>
                table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={value => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      })
    }

    return [...composedColumns, ...columns]
  }, [columns, enableRowDrag, enableRowSelection])
}
