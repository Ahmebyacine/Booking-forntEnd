import { Link } from 'react-router-dom';

export default function SettingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <nav className="w-full md:w-64 space-y-2">
          <Link
            to="/settings/account"
            className="block w-full py-2 px-4 text-left text-firstColor hover:bg-secondColor rounded transition duration-200"
          >
            Account Settings
          </Link>
          <Link
            to="/settings/privacy"
            className="block w-full py-2 px-4 text-left text-firstColor hover:bg-secondColor rounded transition duration-200"
          >
            Privacy Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}