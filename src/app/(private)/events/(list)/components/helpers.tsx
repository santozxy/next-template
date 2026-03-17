import { ColumnDef } from "@/components/ui/data-table"
import { TagsList } from "@/components/ui/tags";
import { formatDate } from "date-fns"
import { Event } from "@/domains/events/types";

  export const columns: ColumnDef<Event>[] =  [
      {
        key: "name",
        header: "Nome",
        className: "w-60 max-w-48 truncate",
      },
      {
        key: "startDate",
        header: "Início",
        className: "w-32",
        render: (value) => formatDate(String(value), "dd/MM/yyyy"),
      },
      {
        key: "endDate",
        header: "Fim",
        className: "w-32",
        render: (value) => formatDate(String(value), "dd/MM/yyyy"),
      },
      {
        key: "tags",
        header: "Tags",
        render: (_, row: Event) => (
          <div className="flex gap-1">
            <TagsList tags={row.tags} limit={2} />
          </div>
        ),
      },
      {
        key: "address.municipality.name",
        header: "Município",
      },
    ]

