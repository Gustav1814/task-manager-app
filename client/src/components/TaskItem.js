import React from 'react';

function TaskItem({ task, onEdit, onDelete, onUpdate }) {
  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  const getPriorityClass = (priority) => {
    return `priority-badge ${priority}`;
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await onUpdate(task._id, { ...task, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-badges">
          <span className={getPriorityClass(task.priority)}>
            {task.priority}
          </span>
          <span className={getStatusClass(task.status)}>
            {task.status}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="task-meta">
          <span className="due-date">
            📅 {formatDate(task.dueDate)}
          </span>
          <span className="created-date">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="task-actions">
          <select 
            value={task.status} 
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-select"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => onEdit(task)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;