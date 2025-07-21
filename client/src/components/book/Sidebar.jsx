import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-48 p-4 border-r">
      <ul className="space-y-2">
        <li><a href="#">All Books</a></li>
        <li><a href="#">Categories</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
