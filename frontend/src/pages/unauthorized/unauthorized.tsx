const Unauthorized = () => {
  return (
    <div>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-gradient-to-r from-purple-300 to-blue-200 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">
              401 Unauthorized
            </h2>
            <p className="text-gray-600">
              You do not have permission to access this page. Please log in or
              contact the administrator for assistance.
            </p>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Unauthorized;
