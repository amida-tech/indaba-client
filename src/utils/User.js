const renderName = user => `${user.firstName} ${user.lastName}`;
const renderInitials = user => `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`;

export {
    renderName, renderInitials,
};
