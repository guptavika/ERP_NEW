import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  BuildingOffice2Icon, 
  UsersIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  BellAlertIcon,
  WrenchScrewdriverIcon,
  InboxIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  // Sample data for ERP metrics
  const metrics = [
    { title: 'Total Revenue', value: '$124,580', change: '+12.5%', icon: CurrencyDollarIcon, color: 'text-green-600 bg-green-50' },
    { title: 'Pending Orders', value: '24', change: '-3.2%', icon: ShoppingCartIcon, color: 'text-blue-600 bg-blue-50' },
    { title: 'Active Projects', value: '18', change: '+5.1%', icon: ClipboardDocumentListIcon, color: 'text-purple-600 bg-purple-50' },
    { title: 'Inventory Alert', value: '7 items', change: 'Low stock', icon: BellAlertIcon, color: 'text-red-600 bg-red-50' },
  ];

  const modules = [
    { name: 'CRM', icon: UsersIcon, description: 'Customer Management', href: '/crm', count: '42', color: 'bg-blue-500' },
    { name: 'Inventory', icon: BuildingOffice2Icon, description: 'Stock Management', href: '/inventory', count: '1,248', color: 'bg-green-500' },
    { name: 'Accounting', icon: CreditCardIcon, description: 'Financial Records', href: '/accounting', count: '234', color: 'bg-purple-500' },
    { name: 'HRM', icon: UserGroupIcon, description: 'Human Resources', href: '/hrm', count: '87', color: 'bg-pink-500' },
    { name: 'Procurement', icon: ShoppingCartIcon, description: 'Purchase Orders', href: '/procurement', count: '56', color: 'bg-orange-500' },
    { name: 'Manufacturing', icon: WrenchScrewdriverIcon, description: 'Production', href: '/manufacturing', count: '18', color: 'bg-indigo-500' },
    { name: 'Logistics', icon: TruckIcon, description: 'Shipping & Delivery', href: '/logistics', count: '32', color: 'bg-teal-500' },
    { name: 'Reports', icon: ChartBarIcon, description: 'Analytics', href: '/reports', count: '24', color: 'bg-red-500' },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'created new invoice', time: '2 min ago', module: 'Accounting' },
    { user: 'Sarah Smith', action: 'updated inventory', time: '15 min ago', module: 'Inventory' },
    { user: 'Mike Johnson', action: 'approved leave request', time: '1 hour ago', module: 'HRM' },
    { user: 'Lisa Wang', action: 'placed new order', time: '2 hours ago', module: 'Procurement' },
  ];

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-tight text-gray-800">
            ERP Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              Today: {new Date().toLocaleDateString()}
            </button>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Cog6ToothIcon className="w-5 h-5 mr-2" />
              Settings
            </Link>
          </div>
        </div>
      }
    >
      <Head title="ERP Dashboard" />

      {/* Quick Access Bar */}
      <div className="px-6 py-4 mb-6 bg-white border-b">
        <div className="flex items-center space-x-4">
          <Link
            href="/tasks"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
            Tasks ({/* Add task count here */})
          </Link>

          <Link
            href="/admin/inbox"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <InboxIcon className="w-5 h-5 mr-2" />
            Inbox
          </Link>
          <Link
            href="/reports"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <DocumentChartBarIcon className="w-5 h-5 mr-2" />
            Generate Report
          </Link>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
                    <p className={`mt-1 text-sm ${metric.change.includes('+') ? 'text-green-600' : metric.change.includes('Low') ? 'text-red-600' : 'text-yellow-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ERP Modules */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">ERP Modules</h3>
                <Link href="/modules" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <Link
                      key={index}
                      href={module.href}
                      className="group p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 border border-gray-100"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`p-3 rounded-full ${module.color} mb-3`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{module.name}</h4>
                        <p className="mt-1 text-sm text-gray-500">{module.description}</p>
                        <span className="mt-2 text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {module.count} items
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UsersIcon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} <span className="font-normal text-gray-600">{activity.action}</span>
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {activity.module}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/activity"
                className="flex items-center justify-center w-full px-4 py-3 mt-6 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                View All Activity
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats & Charts Section */}
        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Processing</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipped Today</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href="/orders"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View All Orders →
                </Link>
              </div>
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Inventory Alerts</h3>
            <div className="space-y-3">
              {['Laptop Pro X1', 'Wireless Mouse', 'USB-C Cables', 'Monitor 27"'].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{item}</span>
                  <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                    Low Stock
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/inventory/alerts"
              className="flex items-center justify-center w-full px-4 py-3 mt-4 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
            >
              View All Alerts
            </Link>
          </div>

          {/* Upcoming Deadlines */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Q1 Financial Report</p>
                <p className="text-xs text-gray-500 mt-1">Due: Tomorrow, 5:00 PM</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Team Meeting</p>
                <p className="text-xs text-gray-500 mt-1">Today, 3:00 PM</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Client Presentation</p>
                <p className="text-xs text-gray-500 mt-1">In 2 days, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-6 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Need Help?</h3>
              <p className="mt-1 text-blue-100">
                Contact ERP Support Team for any assistance
              </p>
            </div>
            <Link
              href="/support"
              className="px-6 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}