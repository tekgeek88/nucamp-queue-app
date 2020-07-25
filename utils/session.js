export const sessionizeUser = user => {
  return {
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role
  };
};
