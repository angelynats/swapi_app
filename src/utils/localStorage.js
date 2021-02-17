// USER

export const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    if (parsedUser === null) {
      return undefined;
    }
    return parsedUser;
  } catch (err) {
    return undefined;
  }
};

export const saveUser = user => {
  try {
    const stringifyUser = JSON.stringify(user);
    localStorage.setItem('user', stringifyUser);
  } catch (err) {
    return undefined;
  }
};

export const removeUser = () => {
  try {
    localStorage.removeItem('user');
  } catch (err) {
    return undefined;
  }
};

// ITEMS

export const getItems = () => {
  try {
    const items = localStorage.getItem('items');
    if (items === null) {
      return undefined;
    }
    const parsedItems = JSON.parse(items);
    return parsedItems;
  } catch (err) {
    return undefined;
  }
};

export const setItems = items => {
  try {
    const stringifyItems = JSON.stringify(items);
    localStorage.setItem('items', stringifyItems);
  } catch (err) {
    return undefined;
  }
};

export const removeItems = () => {
  try {
    localStorage.removeItem('items');
  } catch (err) {
    return undefined;
  }
};

// USERS

export const saveCurrentUser = (currentUserId, items) => {
  if (!items) return;
  try {
    const stringifyItems = JSON.stringify(items);
    const userWithData = { [currentUserId]: stringifyItems };
    const stringifyUserWithData = JSON.stringify(userWithData);

    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', stringifyUserWithData);
    } else {
      localStorage.setItem('users', {
        ...stringifyUserWithData,
        ...users,
      });
    }
    localStorage.setItem('users', stringifyUserWithData);
  } catch (err) {
    return undefined;
  }
};

export const getUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('users');
    if (!users) {
      return undefined;
    }
    const parsedUsers = JSON.parse(users);
    return parsedUsers;
  } catch (err) {
    return undefined;
  }
};

export const getItemsFromStorageByCurrentUser = (
  currentUser,
  UsersFromStorage,
) => {
  const keys = Object.keys(UsersFromStorage);
  const userId = keys.find(key => currentUser.id === key);
  if (!userId) {
    return null;
  } else {
    return JSON.parse(UsersFromStorage[userId]);
  }
};
