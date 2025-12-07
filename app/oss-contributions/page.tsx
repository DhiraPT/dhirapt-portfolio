"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";
import { formatDate } from "@/lib/date";
import { PageShell } from "@/components/custom/page-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  GitMerge,
  GitPullRequest,
  CircleDot,
  Code2,
  ExternalLink,
  LifeBuoy,
  Search,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type OpenSourceProject = Database["public"]["Tables"]["OpenSourceProjects"]["Row"];
type OSSContributionType = Database["public"]["Tables"]["OSSContributionTypes"]["Row"];
type OSSContribution = Database["public"]["Tables"]["OSSContributions"]["Row"];
type ContributionWithRelations = Omit<OSSContribution, "project_id"> & {
  project: OpenSourceProject;
};

const PAGE_SIZE = 10;

export default function OSSContributionsPage() {
  const [contributions, setContributions] = useState<ContributionWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [contributionTypes, setContributionTypes] = useState<OSSContributionType[]>([]);

  useEffect(() => {
    const fetchContributionTypes = async () => {
      const { data } = await supabase.from("OSSContributionTypes").select("*");
      if (data) setContributionTypes(data);
    };
    fetchContributionTypes();
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from("OSSContributions")
          .select("id, date, title, link, type, project:OpenSourceProjects(*)", { count: "exact" });

        if (search) {
          const { data: projects } = await supabase
            .from("OpenSourceProjects")
            .select("id")
            .ilike("project_name", `%${search}%`);

          const projectIds = projects?.map((p) => p.id) || [];
          const searchConditions = [
            `title.ilike.%${search}%`,
            ...(projectIds.length > 0 ? [`project_id.in.(${projectIds.join(",")})`] : []),
          ];
          query = query.or(searchConditions.join(","));
        }

        if (typeFilter && typeFilter !== "all") {
          query = query.eq("type", typeFilter);
        }

        const { data, count, error } = await query
          .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1)
          .order("date", { ascending: false });

        if (error) throw error;

        const transformedData = (data || []).map((item) => ({
          ...item,
          project: Array.isArray(item.project) ? item.project[0] : item.project,
        }));

        setContributions(transformedData);
        setTotalCount(count || 0);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchContributions, 500);
    return () => clearTimeout(debounceTimer);
  }, [search, typeFilter, pageIndex]);

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "Merged PR":
        return {
          icon: GitMerge,
          className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/20",
        };
      case "Submitted Issue":
        return {
          icon: CircleDot,
          className:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/20",
        };
      case "Reviewed PR":
        return {
          icon: GitPullRequest,
          className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/20",
        };
      case "Triage":
        return {
          icon: LifeBuoy,
          className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/20",
        };
      default:
        return { icon: Code2, className: "bg-muted text-muted-foreground border-border" };
    }
  };

  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    if (pageCount <= maxVisible) {
      for (let i = 0; i < pageCount; i++) items.push(i);
    } else {
      if (pageIndex < 3) {
        for (let i = 0; i < 3; i++) items.push(i);
        items.push("ellipsis");
        items.push(pageCount - 1);
      } else if (pageIndex > pageCount - 4) {
        items.push(0);
        items.push("ellipsis");
        for (let i = pageCount - 3; i < pageCount; i++) items.push(i);
      } else {
        items.push(0);
        items.push("ellipsis");
        items.push(pageIndex - 1);
        items.push(pageIndex);
        items.push(pageIndex + 1);
        items.push("ellipsis");
        items.push(pageCount - 1);
      }
    }
    return items;
  };

  return (
    <PageShell
      title="Open Source"
      description="Contributions to the ecosystem. Tracking PRs, issues, and reviews across various projects."
    >
      <div className="flex min-h-[600px] flex-col gap-6">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative w-full sm:w-72">
            <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="text"
              placeholder="Search history..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageIndex(0);
              }}
              className="bg-muted/30 border-border/50 focus:bg-background h-9 pl-9 transition-all"
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              value={typeFilter}
              onValueChange={(value) => {
                setTypeFilter(value);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="bg-muted/30 border-border/50 focus:bg-background h-9 w-full transition-all">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="text-foreground text-sm">
                    <SelectValue placeholder="All Types" />
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {contributionTypes.map((type) => (
                  <SelectItem key={type.type} value={type.type}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="relative min-h-[400px] flex-1">
          {loading && (
            <div className="bg-background/50 absolute inset-0 z-20 flex items-start justify-center pt-20 backdrop-blur-[1px]">
              <div className="border-accent h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          )}

          {/* Desktop View: Commit Log Style Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-border/50 bg-card/40 hidden overflow-hidden rounded-xl border backdrop-blur-sm md:block"
          >
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground/70 w-[120px] font-mono text-xs tracking-wider uppercase">
                    Date
                  </TableHead>
                  <TableHead className="text-muted-foreground/70 w-[180px] font-mono text-xs tracking-wider uppercase">
                    Project
                  </TableHead>
                  <TableHead className="text-muted-foreground/70 font-mono text-xs tracking-wider uppercase">
                    Description
                  </TableHead>
                  <TableHead className="text-muted-foreground/70 w-[150px] text-right font-mono text-xs tracking-wider uppercase">
                    Type
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-muted-foreground py-24 text-center text-sm"
                    >
                      No contributions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  contributions.map((contribution) => {
                    const { icon: Icon, className: badgeClass } = getTypeStyle(contribution.type);
                    return (
                      <TableRow
                        key={contribution.id}
                        className="group hover:bg-muted/30 border-border/30 transition-colors"
                      >
                        <TableCell className="text-muted-foreground font-mono text-xs">
                          {formatDate(contribution.date)}
                        </TableCell>
                        <TableCell>
                          <a
                            href={contribution.project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-accent text-sm font-medium transition-colors"
                          >
                            {contribution.project.project_name}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={contribution.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link text-muted-foreground hover:text-foreground flex max-w-lg items-center gap-2 truncate text-sm transition-colors"
                          >
                            <span className="truncate">{contribution.title}</span>
                            <ExternalLink className="text-muted-foreground h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[12px] font-medium",
                              badgeClass,
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            {contribution.type}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </motion.div>

          {/* Mobile View: Cards */}
          <div className="flex flex-col gap-3 md:hidden">
            <AnimatePresence mode="popLayout">
              {contributions.map((contribution, index) => {
                const { icon: Icon, className: badgeClass } = getTypeStyle(contribution.type);
                return (
                  <motion.div
                    key={contribution.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-border/50 bg-card/40 relative overflow-hidden rounded-lg border p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            badgeClass,
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          {contribution.type}
                        </span>
                        <time className="text-muted-foreground font-mono text-[10px]">
                          {formatDate(contribution.date)}
                        </time>
                      </div>

                      <div className="mt-1">
                        <a
                          href={contribution.project.repo_url}
                          className="text-foreground/80 mb-0.5 block text-xs font-semibold"
                        >
                          {contribution.project.project_name}
                        </a>
                        <a
                          href={contribution.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground block text-sm leading-tight font-medium"
                        >
                          {contribution.title}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                    className={
                      pageIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPaginationItems().map((item, i) => (
                  <PaginationItem key={i}>
                    {item === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={pageIndex === item}
                        onClick={() => setPageIndex(item as number)}
                        className="cursor-pointer"
                      >
                        {(item as number) + 1}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPageIndex(Math.min(pageCount - 1, pageIndex + 1))}
                    className={
                      pageIndex === pageCount - 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </PageShell>
  );
}
