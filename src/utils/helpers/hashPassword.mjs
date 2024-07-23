import bcrypt from "bcrypt";

const saltRounds = 10;
const hashPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePassword = (plainPassword, hashedPassword) =>
  bcrypt.compareSync(plainPassword, hashedPassword);

export { comparePassword, hashPassword };
