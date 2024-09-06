//Third party imports
import { createTransport } from "nodemailer";

//Local imports
import { EMAILSEND, PASSEMAILSEND, PORT } from '../config/config.js';

const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: EMAILSEND,
        pass: PASSEMAILSEND
    }
})

const  createMessageRegister = (first_name) => {
  return `<h1>Bienvenido ${first_name} a nuestra web!!</h1>`;
};

const createMessageResetPass = (first_name) => {
  return `<p>Hola ${first_name}! Haz click <a href="http://localhost:${PORT}/users/update-pass"><b>aquí</b></a> para reestablecer tu contraseña.</p>`
};

/**
 * @param {*} user
 * @param {*} service register | resetPass
 * @param {*} token
 * @returns
 */
export const sendEMailToUser = async(user, service, token = null) => {
  try {
    const { first_name, email } = user;
    let msg = '';
    service === 'register' ? msg = createMessageRegister(first_name) :
    service === 'resetPass' ? msg = createMessageResetPass(first_name) :
    msg = "";
    
    let subj = ''
    service === 'register' ? subj = "Bienvenido/a" : 
    service === 'resetPass' ? subj = "Reestablecer contraseña" : 
    subj = "";

    const gmailOptions = {
      from: EMAILSEND,
      to: email,
      subject: subj,
      html: msg
    };

    const respEmail = await transporter.sendMail(gmailOptions);
    if(token) return token;
    console.log("Email enviado", respEmail);
  } catch (error) {
    throw new Error(error);
  }
}
