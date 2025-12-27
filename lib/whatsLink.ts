// utils/whatsappLink.ts
export const phoneNumber = '5588996916280';
export const message = 'Olá, gostaria de saber mais!';
export const encodedMessage = encodeURIComponent(message);
export const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
