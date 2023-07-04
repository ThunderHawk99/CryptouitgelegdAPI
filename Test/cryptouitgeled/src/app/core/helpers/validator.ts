import { Validators } from '@angular/forms';

const emailValidator = [
    Validators.maxLength(250),
    Validators.required,
    Validators.pattern(/.+@.+\..+/)
];

const passwordValidator = [
    Validators.minLength(6),
    Validators.required
];

const websiteValidator = [
    Validators.pattern(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
]

export { emailValidator, passwordValidator, websiteValidator};