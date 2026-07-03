import useGetUsers from "../hooks/useGetUsers";
import { useChat } from "../context/ChatContext";
import { useSocket } from "../context/SocketContext";

function UsersList() {
  const users = useGetUsers();

  const { selectedUser, setSelectedUser } = useChat();

  const { onlineUsers } = useSocket();

  return (
    <div className="overflow-y-auto h-[calc(100vh-80px)]">
      {users.map((user) => {
        const isOnline = onlineUsers.includes(user._id);

        return (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-4 border-b border-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
              selectedUser?._id === user._id
                ? "bg-gray-700"
                : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                {user.fullName.charAt(0).toUpperCase()}
              </div>

              {/* Online Dot */}
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-gray-800 rounded-full"></span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-white font-semibold">
                {user.fullName}
              </h2>

              <p
                className={`text-sm ${
                  isOnline
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;