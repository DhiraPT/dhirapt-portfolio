"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { SectionHeading } from "@/app/components/section-heading";
import { motion } from "framer-motion";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input, Button } from "@headlessui/react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types/database.types";

type OpenSourceProject =
  Database["public"]["Tables"]["OpenSourceProjects"]["Row"];
type OSSContributionType =
  Database["public"]["Tables"]["OSSContributionTypes"]["Row"];
type OSSContribution = Database["public"]["Tables"]["OSSContributions"]["Row"];
type ContributionWithRelations = Omit<OSSContribution, "project_id"> & {
  project: OpenSourceProject;
};

const PAGE_SIZE = 10;

export default function OSSContributions() {
  const [contributions, setContributions] = useState<
    ContributionWithRelations[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [contributionTypes, setContributionTypes] = useState<
    OSSContributionType[]
  >([]);

  const fetchContributionTypes = async () => {
    try {
      const { data, error } = await supabase
        .from("OSSContributionTypes")
        .select("*");

      if (error) throw error;
      setContributionTypes(data || []);
    } catch (error) {
      console.error("Error fetching contribution types:", error);
    }
  };

  const fetchContributions = useCallback(async () => {
    try {
      setLoading(true);

      let query = supabase
        .from("OSSContributions")
        .select("id, date, title, link, type, project:OpenSourceProjects(*)", {
          count: "exact",
        });

      // Apply search filter
      if (search) {
        const { data: projects } = await supabase
          .from("OpenSourceProjects")
          .select("id")
          .ilike("project_name", `%${search}%`);

        const projectIds = projects?.map((p) => p.id) || [];

        if (search) {
          const searchConditions = [
            `title.ilike.%${search}%`,
            ...(projectIds.length > 0
              ? [`project_id.in.(${projectIds.join(",")})`]
              : []),
          ];
          query = query.or(searchConditions.join(","));
        }
      }

      // Apply type filter
      if (typeFilter) {
        query = query.eq("type", typeFilter);
      }

      // Apply pagination
      const { data, count, error } = await query
        .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1)
        .order("date", { ascending: false });

      if (error) throw error;

      setContributions(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, pageIndex]);

  useEffect(() => {
    fetchContributionTypes();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchContributions();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fetchContributions]);

  // Define table columns
  const columns = useMemo<ColumnDef<ContributionWithRelations>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
      },
      {
        accessorKey: "project_name",
        header: "Project Name",
        cell: ({ row }) => (
          <a
            href={row.original.project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              font-medium text-indigo-600
              hover:underline
              dark:text-indigo-300
            `}
          >
            {row.original.project.project_name}
          </a>
        ),
      },
      {
        accessorKey: "title",
        header: "Issue/PR Title",
        cell: ({ row }) => (
          <a
            href={row.original.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              text-indigo-600
              hover:underline
              dark:text-indigo-300
            `}
            title={row.getValue("title")}
          >
            {row.getValue("title")}
          </a>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <span
            className={`
              inline-flex rounded-full px-2 py-1 text-center text-xs font-medium
              ${
                row.original.type === "Merged PR"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : row.original.type === "Submitted Issue"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : row.original.type === "Reviewed PR"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              }
            `}
          >
            {row.original.type}
          </span>
        ),
      },
    ],
    [],
  );

  // Initialize react-table with pagination
  const table = useReactTable<ContributionWithRelations>({
    data: contributions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / PAGE_SIZE),
    state: {
      pagination: {
        pageIndex,
        pageSize: PAGE_SIZE,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        updater instanceof Function
          ? updater({ pageIndex, pageSize: PAGE_SIZE })
          : updater;
      setPageIndex(newState.pageIndex);
    },
  });

  return (
    <section
      id="oss-contributions"
      className={`
        flex w-full flex-col items-center justify-between px-12 pt-20
        sm:px-16
        xl:px-24
      `}
    >
      <SectionHeading>My Open Source Contributions</SectionHeading>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`
          mb-6 flex w-full max-w-6xl flex-col gap-4
          sm:flex-row
        `}
      >
        <Input
          type="text"
          placeholder="Search contributions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`
            w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900
            hover:border-indigo-600
            focus:ring-2 focus:ring-indigo-600 focus:outline-none
            sm:w-1/3
            dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-indigo-400
            dark:focus:ring-indigo-400
          `}
          aria-label="Search contributions"
        />
        <div className="flex gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`
              cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900
              hover:border-indigo-600
              focus:ring-2 focus:ring-indigo-600
              dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-indigo-400
              dark:focus:ring-indigo-400
            `}
            aria-label="Filter by contribution type"
          >
            <option value="">All Types</option>
            {contributionTypes.map((type) => (
              <option key={type.type} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`relative w-full max-w-6xl overflow-x-auto`}
      >
        {/* Loading Overlay */}
        {loading && (
          <div
            className={`
              absolute inset-0 z-10 flex items-center justify-center bg-white/50
              dark:bg-slate-800/50
            `}
          >
            <div
              className={`
                h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent
                dark:border-indigo-400
              `}
            />
          </div>
        )}

        <table className="w-full min-w-[480px] table-fixed border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={`
                  border-b border-slate-200
                  dark:border-slate-700
                `}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`
                      px-2 py-2 text-left text-xs font-semibold wrap-break-word text-slate-900
                      sm:px-3 sm:py-2 sm:text-sm
                      dark:text-slate-100
                      ${
                        header.id === "date"
                          ? `
                            w-[80px] whitespace-nowrap
                            sm:w-[100px]
                          `
                          : ""
                      }
                      ${
                        header.id === "project_name"
                          ? `
                            w-28
                            md:w-36
                          `
                          : ""
                      }
                      ${
                        header.id === "title"
                          ? `
                            w-[calc(100%-80px-112px-112px)]
                            sm:w-[calc(100%-100px-112px-112px)]
                            md:w-[calc(100%-100px-144px-144px)]
                          `
                          : ""
                      }
                      ${
                        header.id === "type"
                          ? `
                            w-28
                            md:w-36
                          `
                          : ""
                      }
                    `}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {contributions.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`
                    py-8 text-center text-slate-500
                    dark:text-slate-400
                  `}
                >
                  No contributions found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-slate-200
                    hover:bg-indigo-50 hover:shadow-sm
                    dark:border-slate-700 dark:hover:bg-indigo-900/20 dark:hover:shadow-slate-700
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`
                        px-2 py-1 text-xs wrap-break-word text-slate-900
                        sm:px-3 sm:py-2 sm:text-sm
                        dark:text-slate-100
                        ${
                          cell.id.includes("date")
                            ? `
                              w-[80px] whitespace-nowrap
                              sm:w-[100px]
                            `
                            : ""
                        }
                        ${
                          cell.id.includes("project_name")
                            ? `
                              w-28
                              md:w-36
                            `
                            : ""
                        }
                        ${
                          cell.id.includes("title")
                            ? `
                              w-[calc(100%-80px-112px-112px)]
                              sm:w-[calc(100%-100px-112px-112px)]
                              md:w-[calc(100%-100px-144px-144px)]
                            `
                            : ""
                        }
                        ${
                          cell.id.includes("type")
                            ? `
                              w-28
                              md:w-36
                            `
                            : ""
                        }
                      `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`
          mt-6 flex w-full max-w-6xl flex-col items-center justify-between gap-4
          sm:flex-row
        `}
      >
        <div className="flex items-center gap-2">
          {/* First Page Button */}
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className={`
              cursor-pointer rounded-md border border-slate-300 p-2 text-indigo-600
              hover:border-indigo-600 hover:bg-indigo-50
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-slate-600 dark:text-indigo-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-900/20
            `}
            aria-label="First page"
          >
            <BsChevronDoubleLeft size={16} />
          </Button>

          {/* Previous Page Button */}
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`
              cursor-pointer rounded-md border border-slate-300 p-2 text-indigo-600
              hover:border-indigo-600 hover:bg-indigo-50
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-slate-600 dark:text-indigo-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-900/20
            `}
            aria-label="Previous page"
          >
            <BsChevronLeft size={16} />
          </Button>

          {/* Current Page Indicator */}
          <span
            className={`
              mx-2 text-xs font-medium text-slate-700
              sm:text-sm
              dark:text-slate-300
            `}
          >
            Page{" "}
            {totalCount > 0 ? table.getState().pagination.pageIndex + 1 : 0} of{" "}
            {table.getPageCount()}
          </span>

          {/* Next Page Button */}
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`
              cursor-pointer rounded-md border border-slate-300 p-2 text-indigo-600
              hover:border-indigo-600 hover:bg-indigo-50
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-slate-600 dark:text-indigo-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-900/20
            `}
            aria-label="Next page"
          >
            <BsChevronRight size={16} />
          </Button>

          {/* Last Page Button */}
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className={`
              cursor-pointer rounded-md border border-slate-300 p-2 text-indigo-600
              hover:border-indigo-600 hover:bg-indigo-50
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-slate-600 dark:text-indigo-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-900/20
            `}
            aria-label="Last page"
          >
            <BsChevronDoubleRight size={16} />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
