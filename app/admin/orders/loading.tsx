import React from "react";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
function loading() {
  return (
    <>
      <div className="rounded-md border">
        <div className="flex items-center justify-center py-4 space-x-4 px-4">
          <Input placeholder="Filter Status" className="max-w-sm" />
          <Input placeholder="Filter City" className="max-w-sm" />
          <Input placeholder="Filter State" className="max-w-sm" />
          <Input placeholder="Filter TrID" className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto space-x-2">
                Columns <ChevronDown className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem className="capitalize"></DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableHeader className="bg-[#b57c32] ">
            <TableRow className="hover:bg-[#b88139]">
              <TableHead className="text-white text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="h-24 text-center">No results.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default loading;
