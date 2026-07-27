function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        🚁 SASR
      </h1>

      <ul className="flex gap-6">
        <li className="cursor-pointer hover:text-blue-400">Home</li>
        <li className="cursor-pointer hover:text-blue-400">Mission</li>
        <li className="cursor-pointer hover:text-blue-400">Reports</li>
        <li className="cursor-pointer hover:text-blue-400">About</li>
      </ul>
    </nav>
  );
}

export default Navbar;