import Dashboard from "./dashboard/Dashboard";

const Home = () => {
  return (
    <div>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );

  // return <Dashboard />;
};

export default Home;
