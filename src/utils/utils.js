import { dirname, join } from "path";
import { fileURLToPath } from "url";
export const __dirname = join(dirname(fileURLToPath(import.meta.url)),'..');

export const numberFormat = (number) => {
    return number.toFixed(2);
}

/* Bcrypt */
import bcrypt from 'bcrypt';

export const hashearPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
};

export const verifyPassHasheada = (password, passwordHasheada) => {
    return bcrypt.compareSync(password, passwordHasheada);
};
//
