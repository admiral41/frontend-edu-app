"use client";

import { useState } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Calendar,
  Wallet,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { format } from "date-fns";

// Mock data
const paymentsData = [
  {
    id: "TXN001",
    user: { id: 1, name: "Aarav Sharma", email: "aarav@email.com" },
    course: { id: 1, title: "Complete Web Development Bootcamp" },
    amount: 1999,
    platformFee: 600,
    instructorShare: 1399,
    method: "eSewa",
    status: "completed",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "TXN002",
    user: { id: 2, name: "Priya Thapa", email: "priya@email.com" },
    course: { id: 2, title: "React.js Masterclass" },
    amount: 1499,
    platformFee: 450,
    instructorShare: 1049,
    method: "Khalti",
    status: "completed",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "TXN003",
    user: { id: 3, name: "Bikash Gurung", email: "bikash@email.com" },
    course: { id: 3, title: "Python for Data Science" },
    amount: 2499,
    platformFee: 750,
    instructorShare: 1749,
    method: "eSewa",
    status: "completed",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "TXN004",
    user: { id: 4, name: "Sita Rai", email: "sita@email.com" },
    course: { id: 1, title: "Complete Web Development Bootcamp" },
    amount: 1999,
    platformFee: 600,
    instructorShare: 1399,
    method: "Bank Transfer",
    status: "pending",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "TXN005",
    user: { id: 5, name: "Rajan Shrestha", email: "rajan@email.com" },
    course: { id: 4, title: "Machine Learning Fundamentals" },
    amount: 3499,
    platformFee: 1050,
    instructorShare: 2449,
    method: "Khalti",
    status: "completed",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "TXN006",
    user: { id: 6, name: "Maya Tamang", email: "maya@email.com" },
    course: { id: 2, title: "React.js Masterclass" },
    amount: 1499,
    platformFee: 450,
    instructorShare: 1049,
    method: "eSewa",
    status: "failed",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
];

const revenueData = [
  { day: "Mon", amount: 12500 },
  { day: "Tue", amount: 18200 },
  { day: "Wed", amount: 15800 },
  { day: "Thu", amount: 22000 },
  { day: "Fri", amount: 19500 },
  { day: "Sat", amount: 25000 },
  { day: "Sun", amount: 21000 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.amount));

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7days");

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = paymentsData
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const platformEarnings = paymentsData
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.platformFee, 0);
  const pendingAmount = paymentsData
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return <Badge variant="outline">Refunded</Badge>;
      default:
        return null;
    }
  };

  const getMethodBadge = (method) => {
    const colors = {
      eSewa: "bg-green-100 text-green-800",
      Khalti: "bg-purple-100 text-purple-800",
      "Bank Transfer": "bg-blue-100 text-blue-800",
    };
    return (
      <Badge variant="outline" className={colors[method] || ""}>
        {method}
      </Badge>
    );
  };

  const handleExport = () => {
    // Export logic would go here
    console.log("Exporting payments...");
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Payments</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track all platform transactions and revenue
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin-dashboard/payments/payouts">
              <Button variant="outline">
                <Wallet className="h-4 w-4 mr-2" />
                Payouts
              </Button>
            </Link>
            <Link href="/admin-dashboard/payments/refunds">
              <Button variant="outline">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Refunds
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <IndianRupee className="h-5 w-5 text-green-600" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +18%
                </div>
              </div>
              <p className="text-2xl font-bold">
                Rs. {(totalRevenue / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </div>
              </div>
              <p className="text-2xl font-bold">
                Rs. {(platformEarnings / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Platform Earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-2xl font-bold">
                Rs. {(pendingAmount / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">
                {paymentsData.filter((p) => p.status === "completed").length}
              </p>
              <p className="text-sm text-muted-foreground">Transactions (7d)</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Revenue Overview (Last 7 Days)
              </CardTitle>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {revenueData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary rounded-t relative group cursor-pointer hover:bg-primary/80 transition-colors"
                    style={{
                      height: `${(item.amount / maxRevenue) * 100}%`,
                      minHeight: "20px",
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Rs. {(item.amount / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Breakdown */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {["eSewa", "Khalti", "Bank Transfer"].map((method) => {
            const count = paymentsData.filter(
              (p) => p.method === method && p.status === "completed"
            ).length;
            const amount = paymentsData
              .filter((p) => p.method === method && p.status === "completed")
              .reduce((sum, p) => sum + p.amount, 0);
            return (
              <Card key={method}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getMethodBadge(method)}
                    <span className="text-sm text-muted-foreground">
                      {count} transactions
                    </span>
                  </div>
                  <p className="text-xl font-bold">
                    Rs. {amount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or transaction ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="eSewa">eSewa</SelectItem>
                  <SelectItem value="Khalti">Khalti</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead className="hidden md:table-cell">Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm truncate max-w-[200px]">
                        {payment.course.title}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          Rs. {payment.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fee: Rs. {payment.platformFee}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {getMethodBadge(payment.method)}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {format(payment.date, "MMM d, yyyy h:mm a")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No transactions found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
