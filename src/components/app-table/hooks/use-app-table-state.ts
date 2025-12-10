import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

interface WithId {
  id: UniqueIdentifier
}

interface UseAppTableStateProps<TData extends WithId> {
  data: TData[]
  columns: ColumnDef<TData>[]
  initialPagination?: PaginationState
  enableRowSelection?: boolean
  onDataChange?: (next: TData[]) => void
}

export function useAppTableState<TData extends WithId>({
  data: initialData,
  columns,
  initialPagination = { pageIndex: 0, pageSize: 10 },
  enableRowSelection = true,
  onDataChange,
}: UseAppTableStateProps<TData>) {
  const [data, setData] = React.useState<TData[]>(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility]
    = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters]
    = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>(
    initialPagination,
  )

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )
  const sortableId = React.useId()

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data],
  )

  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: row => row.id.toString(),
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over || active.id === over.id)
      return

    setData((current) => {
      const ids = current.map(r => r.id)
      const oldIndex = ids.indexOf(active.id)
      const newIndex = ids.indexOf(over.id)
      if (oldIndex === -1 || newIndex === -1)
        return current

      const next = arrayMove(current, oldIndex, newIndex)
      onDataChange?.(next)
      return next
    })
  }, [onDataChange])

  return {
    table,
    data,
    setData,
    dataIds,
    handleDragEnd,
    sensors,
    sortableId,
    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
      sorting,
      pagination,
    },
  }
}
