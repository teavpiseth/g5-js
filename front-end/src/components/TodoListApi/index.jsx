import React from "react";
import useTodoList from "./useTodoListApi";

const TodoListApi = () => {
  const {
    handleStatusChange,
    handleSave,
    handleDelete,
    handleKeyPress,
    todos,
    newTodoText,
    setNewTodoText,
    handleCreateTodo,
    editing,
    setEditing,
    getStatusInfo,
    handlePriorityChange,
  } = useTodoList();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        My Static Todo List
      </h2>

      {/* Create Todo Section */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleCreateTodo}
          className="px-6 py-2 !bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add Todo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {todos.map((obj, index) => {
              return (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${getStatusInfo(obj.status).bgTrColor} `}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editing.id === obj.id ? (
                      <input
                        autoFocus
                        value={editing.newText}
                        onChange={(e) => {
                          setEditing({ ...editing, newText: e.target.value });
                        }}
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      obj.text
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(obj.status).bgColor} ${getStatusInfo(obj.status).textColor}`}
                    >
                      ⏳ {obj.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={obj.priority}
                      onChange={(e) => {
                        const value = e.target.value;
                        handlePriorityChange({ ...obj, priority: value });
                      }}
                      className="px-3 py-1 rounded-md text-sm font-medium border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                    >
                      <option value="H">High</option>
                      <option value="M">Medium</option>
                      <option value="L">Low</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      <select
                        value={obj.status}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleStatusChange(obj.id, value);
                        }}
                        className="px-3 py-1 rounded-md text-sm font-medium border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="progress">🔄 In Progress</option>
                        <option value="complete">✓ Complete</option>
                      </select>
                      {obj.id != editing.id && (
                        <div>
                          <button
                            onClick={() => {
                              setEditing({
                                ...editing,
                                id: obj.id,
                                text: obj.text,
                                newText: obj.text,
                                status: obj.status,
                              });
                            }}
                            className="px-3 py-1 !bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                            title="Edit todo"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(obj.id)}
                            className="px-3 py-1 !bg-red-400 cursor-pointer text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                            title="Delete todo"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {obj.id == editing.id && (
                        <>
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                            title="Save changes"
                          >
                            ✓ Save
                          </button>
                          <button
                            onClick={() =>
                              setEditing({
                                id: null,
                                text: null,
                                newText: null,
                              })
                            }
                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                            title="Cancel editing"
                          >
                            ✕ Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(TodoListApi);
