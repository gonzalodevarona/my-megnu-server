import bcrypt from 'bcrypt';

function encrypt (secretString : string) {
    return bcrypt.hash(secretString, 10);
}

function comparePassword (password : string, hash : string) {
    return bcrypt.compare(password, hash);
}

export { encrypt, comparePassword };