"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import { format } from "date-fns";
import {categoryColors} from "@/data/categories";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";
import {ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { useState} from "react";
import {cn} from "@/lib/utils";
import {BarLoader} from "react-spinners";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({transactions}) => {

    const router = useRouter();

    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [recurringFilter, setRecurringFilter] = useState("");

    const filteredAndSortedTransactions = transactions;

    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction:
                current.field === field && current.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSelect = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedIds((current) =>
            current.length === paginatedTransactions.length
                ? []
                : paginatedTransactions.map((t) => t.id)
        );
    };




    return (
        <div className="space-y-4">

            {/*    Filters*/}
                {deleteLoading && (
                    <BarLoader className="mt-4" width={"100%"} color="#9333ea"/>
                )}
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-8"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select
                            value={typeFilter}
                            onValueChange={(value) => {
                                setTypeFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="All Types"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INCOME">Income</SelectItem>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={recurringFilter}
                            onValueChange={(value) => {
                                setRecurringFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="All Transactions"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recurring">Recurring Only</SelectItem>
                                <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Bulk Actions */}
                        {selectedIds.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBulkDelete}
                                >
                                    <Trash className="h-4 w-4 mr-2"/>
                                    Delete Selected ({selectedIds.length})
                                </Button>
                            </div>
                        )}

                        {(searchTerm || typeFilter || recurringFilter) && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleClearFilters}
                                title="Clear filters"
                            >
                                <X className="h-4 w-5"/>
                            </Button>
                        )}
                    </div>
                </div>

                {/*    Transactions*/}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={
                                            selectedIds.length === paginatedTransactions.length &&
                                            paginatedTransactions.length > 0
                                        }
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("date")}
                                >
                                    <div className="flex items-center">
                                        Date
                                        {sortConfig.field === "date" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4"/>
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4"/>
                                            ))}
                                    </div>
                                </TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("category")}
                                >
                                    <div className="flex items-center">
                                        Category
                                        {sortConfig.field === "category" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4"/>
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4"/>
                                            ))}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer text-right"
                                    onClick={() => handleSort("amount")}
                                >
                                    <div className="flex items-center justify-end">
                                        Amount
                                        {sortConfig.field === "amount" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4"/>
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4"/>
                                            ))}
                                    </div>
                                </TableHead>
                                <TableHead>Recurring</TableHead>
                                <TableHead className="w-[50px]"/>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedTransactions.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground"
                                    >
                                        No transactions found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedIds.includes(transaction.id)}
                                                onCheckedChange={() => handleSelect(transaction.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(transaction.date), "PP")}
                                        </TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell className="capitalize">
                    <span
                        style={{
                            background: categoryColors[transaction.category],
                        }}
                        className="px-2 py-1 rounded text-white text-sm"
                    >
                      {transaction.category}
                    </span>
                                        </TableCell>
                                        <TableCell
                                            className={cn(
                                                "text-right font-medium",
                                                transaction.type === "EXPENSE"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            )}
                                        >
                                            {transaction.type === "EXPENSE" ? "-" : "+"}$
                                            {transaction.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.isRecurring ? (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Badge
                                                                variant="secondary"
                                                                className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                            >
                                                                <RefreshCw className="h-3 w-3"/>
                                                                {
                                                                    RECURRING_INTERVALS[
                                                                        transaction.recurringInterval
                                                                        ]
                                                                }
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <div className="text-sm">
                                                                <div className="font-medium">Next Date:</div>
                                                                <div>
                                                                    {format(
                                                                        new Date(transaction.nextRecurringDate),
                                                                        "PPP"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ) : (
                                                <Badge variant="outline" className="gap-1">
                                                    <Clock className="h-3 w-3"/>
                                                    One-time
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            router.push(
                                                                `/transaction/create?edit=${transaction.id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => deleteFn([transaction.id])}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

            </div>
            )
            }
            export default TransactionTable
