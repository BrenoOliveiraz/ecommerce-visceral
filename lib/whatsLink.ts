// utils/whatsappLink.ts
export const phoneNumber = '558596987927';
export const message = 'Olá, gostaria de saber mais!';
export const encodedMessage = encodeURIComponent(message);
export const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
