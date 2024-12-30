"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";

const TransactionTable = ({transactions}) => {

    const handleSort = () => {}

    return (
        <div  className="space-y-4">

        {/*    Filters*/}

        {/*    Transactions*/}
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox/>
                        </TableHead>

                        <TableHead className="cursor-pointer" onClicl={() => handleSort("date")}>
                            <div className="flex items-center">Date</div>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="cursor-pointer" onClicl={() => handleSort("category")}>
                            <div className="flex items-center">Category</div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClicl={() => handleSort("amount")}>
                            <div className="flex items-center">Amount</div>
                        </TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            </div>

        </div>
    )
}
export default TransactionTable
