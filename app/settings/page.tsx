"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Settings, Palette, Download, Upload, Trash2, Plus, Bell, Shield, Database } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  currency: string
  timezone: string
  monthlyIncomeGoal: number
  monthlyExpenseBudget: number
}

interface NotificationSettings {
  budgetAlerts: boolean
  tradingReminders: boolean
  monthlyReports: boolean
  emailNotifications: boolean
}

interface Category {
  id: string
  name: string
  type: "expense" | "asset" | "liability"
  color: string
}

const mockProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  currency: "USD",
  timezone: "America/New_York",
  monthlyIncomeGoal: 5400,
  monthlyExpenseBudget: 3500,
}

const mockNotifications: NotificationSettings = {
  budgetAlerts: true,
  tradingReminders: false,
  monthlyReports: true,
  emailNotifications: true,
}

const mockCategories: Category[] = [
  { id: "1", name: "Food", type: "expense", color: "#10b981" },
  { id: "2", name: "Transport", type: "expense", color: "#3b82f6" },
  { id: "3", name: "Bills", type: "expense", color: "#f59e0b" },
  { id: "4", name: "Entertainment", type: "expense", color: "#8b5cf6" },
  { id: "5", name: "Stocks", type: "asset", color: "#ef4444" },
  { id: "6", name: "Real Estate", type: "asset", color: "#06b6d4" },
  { id: "7", name: "Credit Card", type: "liability", color: "#f97316" },
  { id: "8", name: "Loan", type: "liability", color: "#84cc16" },
]

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [notifications, setNotifications] = useState<NotificationSettings>(mockNotifications)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "expense" as Category["type"],
    color: "#10b981",
  })

  const handleProfileUpdate = () => {
    // In a real app, this would save to backend
    console.log("Profile updated:", profile)
  }

  const handleNotificationUpdate = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications({ ...notifications, [key]: value })
  }

  const handleAddCategory = () => {
    if (newCategory.name) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        type: newCategory.type,
        color: newCategory.color,
      }
      setCategories([...categories, category])
      setNewCategory({ name: "", type: "expense", color: "#10b981" })
      setIsAddCategoryOpen(false)
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleExportData = () => {
    // In a real app, this would export user data
    const data = {
      profile,
      categories,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "finance-tracker-backup.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={profile.currency}
                      onValueChange={(value) => setProfile({ ...profile, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={profile.timezone}
                      onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Financial Goals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incomeGoal">Monthly Income Goal ($)</Label>
                      <Input
                        id="incomeGoal"
                        type="number"
                        value={profile.monthlyIncomeGoal}
                        onChange={(e) =>
                          setProfile({ ...profile, monthlyIncomeGoal: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expenseBudget">Monthly Expense Budget ($)</Label>
                      <Input
                        id="expenseBudget"
                        type="number"
                        value={profile.monthlyExpenseBudget}
                        onChange={(e) =>
                          setProfile({ ...profile, monthlyExpenseBudget: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleProfileUpdate} className="w-full">
                  Save Profile Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you're close to budget limits</p>
                  </div>
                  <Switch
                    checked={notifications.budgetAlerts}
                    onCheckedChange={(checked) => handleNotificationUpdate("budgetAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Trading Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders to review and update your trades</p>
                  </div>
                  <Switch
                    checked={notifications.tradingReminders}
                    onCheckedChange={(checked) => handleNotificationUpdate("tradingReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Monthly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive monthly financial summary reports</p>
                  </div>
                  <Switch
                    checked={notifications.monthlyReports}
                    onCheckedChange={(checked) => handleNotificationUpdate("monthlyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate("emailNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manage Categories
                </CardTitle>
                <CardDescription>Customize categories for expenses, assets, and liabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Your Categories</h3>
                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>Create a new category for organizing your financial data.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="categoryName">Category Name</Label>
                          <Input
                            id="categoryName"
                            placeholder="e.g., Groceries, Investments"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="categoryType">Category Type</Label>
                          <Select
                            value={newCategory.type}
                            onValueChange={(value: Category["type"]) => setNewCategory({ ...newCategory, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">Expense</SelectItem>
                              <SelectItem value="asset">Asset</SelectItem>
                              <SelectItem value="liability">Liability</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="categoryColor">Color</Label>
                          <Input
                            id="categoryColor"
                            type="color"
                            value={newCategory.color}
                            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleAddCategory} className="w-full">
                          Add Category
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {["expense", "asset", "liability"].map((type) => (
                    <div key={type}>
                      <h4 className="font-medium mb-2 capitalize">{type} Categories</h4>
                      <div className="grid gap-2">
                        {categories
                          .filter((cat) => cat.type === type)
                          .map((category) => (
                            <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                                <span className="font-medium">{category.name}</span>
                                <Badge variant="secondary" className="capitalize">
                                  {category.type}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of your finance tracker</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Theme switching is available in the top navigation bar
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Light Theme</Badge>
                    <Badge variant="outline">Dark Theme</Badge>
                    <Badge variant="outline">System</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <p className="text-sm text-muted-foreground">
                    Your app uses an orange-accented color scheme for a modern, professional look
                  </p>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary" />
                    <div className="w-8 h-8 rounded-full bg-secondary" />
                    <div className="w-8 h-8 rounded-full bg-accent" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Layout</Label>
                  <p className="text-sm text-muted-foreground">
                    Clean grid layout with minimalist design for optimal data visualization
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Backup, restore, and manage your financial data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Data Backup</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Export your financial data for backup or migration purposes
                    </p>
                    <Button onClick={handleExportData} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Data Import</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Import previously exported data or migrate from another system
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete all your financial data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Your data privacy and security information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Storage</Label>
                  <p className="text-sm text-muted-foreground">
                    Currently using local storage. Your data stays on your device and is not sent to external servers.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">
                    For enhanced security, consider using browser-level encryption or migrating to a secure cloud
                    solution.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Backup Recommendations</Label>
                  <p className="text-sm text-muted-foreground">
                    Regular data exports are recommended to prevent data loss. Consider setting up automated backups.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
