// pages/index.js
import {
  BarChart2,
  Users,
  MessageSquare,
  Check,
  UserPlus,
  UploadCloud,
  Calendar,
  FileText,
  Bell,
  Feather,
  Paperclip,
  PieChart,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton
} from '@clerk/nextjs'

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Jost', sans-serif" }} className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-200 to-purple-200 relative overflow-x-hidden">
      {/* Glassmorphic Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-gradient-to-br from-indigo-400/30 via-purple-300/20 to-blue-200/20 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-400/30 via-blue-200/20 to-indigo-200/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] bg-gradient-to-tr from-indigo-200/40 via-purple-200/20 to-blue-400/20 rounded-full blur-3xl z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="bg-indigo-600/80 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
            <BarChart2 size={24} color="#fff" />
          </div>
          <span className="ml-3 text-2xl font-bold text-indigo-900 drop-shadow-sm">Taskify</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="px-5 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"><SignInButton /></span>
          <span className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow"><SignUpButton /></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight drop-shadow-sm">
              Manage Projects Like a Pro,{" "}
              <span className="text-indigo-600 bg-white/60 px-2 rounded-lg shadow-sm">Freelance Like a Boss</span>
            </h1>
            <p className="mt-6 text-xl text-gray-700">
              Taskify gives freelancers and self-employed professionals the tools to manage projects, collaborate with clients, and grow their business—all in one place.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <span className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-lg shadow">
                <SignInButton />
              </span>
              <span className="px-8 py-3 bg-white/70 text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-lg shadow">
                <SignUpButton />
              </span>
            </div>
          </div>
          {/* Glassmorphic Dashboard Mockup */}
          <div className="relative flex justify-center items-center">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-indigo-100 w-full max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-sm font-medium text-gray-500">Taskify Dashboard</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-indigo-50/60 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <PieChart size={22} color="#4f46e5" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Client Project</p>
                      <p className="text-sm text-gray-500">Design Refresh</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-500">In Progress</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50/60 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FileText size={22} color="#4f46e5" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Invoice</p>
                      <p className="text-sm text-gray-500">Due in 3 days</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 font-medium hover:underline">View</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50/60 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Bell size={22} color="#4f46e5" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Daily News</p>
                      <p className="text-sm text-gray-500">Market updates</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 font-medium hover:underline">Read</button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-yellow-100/80 backdrop-blur-lg rounded-xl p-4 shadow-lg flex items-center space-x-3">
              <div className="bg-yellow-200 p-2 rounded-lg">
                <Feather size={22} color="#f59e42" />
              </div>
              <div>
                <p className="font-medium text-gray-900">AI Suggestions</p>
                <p className="text-sm text-gray-700">Task breakdown ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 bg-white/80 backdrop-blur-lg px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm">
              Everything You Need to Succeed as a Freelancer
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Taskify combines project management with business tools tailored for the self-employed professional.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/90 to-indigo-50/80 p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-lg transition-shadow duration-200 hover:scale-[1.03] cursor-pointer"
              >
                <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center shadow">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm">
            Streamline Your Freelance Workflow
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            From prospect to payment, Taskify helps you manage every step of your freelance journey.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto shadow">
                {step.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
            Ready to Transform Your Freelance Business?
          </h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
            Join thousands of freelancers who use Taskify to manage projects, impress clients, and get paid faster.
          </p>
          <div className="mt-10">
            
            <a href="https://linkedin.com/in/ehsan-saleem-web3" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg text-lg shadow-lg hover:bg-indigo-50 transition-colors">
                Connect With Developer
            </a>
            <p className="mt-4 text-indigo-200 top-[15px]">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-gray-900/90 text-white backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <div className="flex items-center">
                <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <BarChart2 size={24} color="#fff" />
                </div>
                <span className="ml-3 text-2xl font-bold">Taskify</span>
              </div>
              <p className="mt-4 text-gray-400 max-w-md">
                Project management reimagined for the self-employed professional.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-lg font-medium">Developed by Ehsan Saleem</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://linkedin.com/in/ehsan-saleem-web3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/CodeFusionEhsan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Taskify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Users size={28} color="#4f46e5" />,
    title: "Drag & Drop Project Management",
    description:
      "Organize tasks visually with our intuitive drag-and-drop interface. Prioritize work and track progress effortlessly.",
  },
  {
    icon: <MessageSquare size={28} color="#4f46e5" />,
    title: "Project Comments & Collaboration",
    description:
      "Discuss tasks directly within projects. Tag team members and keep all communication in context.",
  },
  {
    icon: <Check size={28} color="#4f46e5" />,
    title: "Task Breakdown",
    description:
      "Divide complex projects into manageable tasks. Set deadlines and assign responsibilities with ease.",
  },
  {
    icon: <UserPlus size={28} color="#4f46e5" />,
    title: "Team Invitations",
    description:
      "Add clients or collaborators to projects with secure invitation links. Control access levels for each member.",
  },
  {
    icon: <UploadCloud size={28} color="#4f46e5" />,
    title: "File Uploads",
    description:
      "Attach documents, images, and assets directly to tasks. All project files organized in one place.",
  },
  {
    icon: <Calendar size={28} color="#4f46e5" />,
    title: "Project Tracking",
    description:
      "Monitor project timelines, track billable hours, and visualize progress with intuitive dashboards.",
  },
  {
    icon: <FileText size={28} color="#4f46e5" />,
    title: "Auto Invoice Generator",
    description:
      "Create professional PDF invoices in seconds. Track payments and send reminders automatically.",
  },
  {
    icon: <Bell size={28} color="#4f46e5" />,
    title: "Daily Market News",
    description:
      "Stay updated with curated industry news tailored to your freelance niche.",
  },
  {
    icon: <Feather size={28} color="#4f46e5" />,
    title: "AI Project Assistant",
    description:
      "Get intelligent suggestions for task breakdowns, time estimates, and project planning.",
  },
  {
    icon: <Paperclip size={28} color="#4f46e5" />,
    title: "Prospect Management",
    description:
      "Track potential clients, store contact details, and manage follow-ups in your dedicated prospect hub.",
  },
];

const workflowSteps = [
  {
    icon: <UserPlus size={28} color="#4f46e5" />,
    title: "Add Prospects",
    description:
      "Build your potential client list with detailed contact info and notes",
  },
  {
    icon: <Check size={28} color="#4f46e5" />,
    title: "Create Projects",
    description:
      "Set up new projects with tasks, deadlines, and assigned team members",
  },
  {
    icon: <PieChart size={28} color="#4f46e5" />,
    title: "Track Progress",
    description:
      "Monitor project status with visual dashboards and time tracking",
  },
  {
    icon: <FileText size={28} color="#4f46e5" />,
    title: "Invoice & Get Paid",
    description:
      "Generate professional invoices and track payments automatically",
  },
];
