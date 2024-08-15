import bcrypt from 'bcrypt';

// Hash password
export const createHash = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

// validate password
export const isValidPassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
}