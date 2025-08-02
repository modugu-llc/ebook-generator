import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">📚 E-book Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Login</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Create Your Dream Book
            <span className="text-blue-600"> with AI</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Transform simple prompts into beautiful, personalized e-books. 
            Generate children&apos;s stories, family cookbooks, adventure tales, and more with our AI-powered platform.
          </p>
          <div className="mt-10">
            <Link 
              href="/create"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Start Creating
            </Link>
          </div>
        </div>

        {/* Book Categories */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Choose Your Book Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Children's Stories",
                description: "Create magical tales with custom characters and themes",
                icon: "🧚‍♀️",
                color: "bg-pink-100 border-pink-200"
              },
              {
                title: "Family Cookbooks",
                description: "Preserve family recipes with stories and photos",
                icon: "👨‍🍳",
                color: "bg-orange-100 border-orange-200"
              },
              {
                title: "Adventure Books",
                description: "Document your travels and exciting experiences",
                icon: "🗺️",
                color: "bg-green-100 border-green-200"
              },
              {
                title: "Funny Quote Books",
                description: "Capture hilarious moments and memorable sayings",
                icon: "😂",
                color: "bg-yellow-100 border-yellow-200"
              },
              {
                title: "Custom Prompts",
                description: "Create any book from your unique ideas",
                icon: "✨",
                color: "bg-purple-100 border-purple-200"
              },
              {
                title: "Poetry Collections",
                description: "Compile beautiful verses and lyrical works",
                icon: "📝",
                color: "bg-blue-100 border-blue-200"
              }
            ].map((category, index) => (
              <Link
                key={index}
                href="/create"
                className={`${category.color} border-2 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer block`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h4>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Powerful Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600">Advanced AI generates engaging content tailored to your prompts</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h4>
              <p className="text-gray-600">Download your books as PDF or EPUB for any device</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Customizable</h4>
              <p className="text-gray-600">Choose from various templates, fonts, and layouts</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 E-book Generator. Create amazing books with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}