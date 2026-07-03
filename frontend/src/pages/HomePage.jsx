import UsersList from "../components/UsersList";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700">
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">
            DP Chat 💬
          </h1>
        </div>

        <UsersList />
      </div>

      {/* Chat Area */}
      <ChatContainer />
    </div>
  );
}

export default HomePage;